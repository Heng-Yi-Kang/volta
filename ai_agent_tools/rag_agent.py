from langchain_community.document_loaders import PyPDFLoader, FileSystemBlobLoader
from langchain_community.document_loaders.generic import GenericLoader
from langchain_community.document_loaders.parsers import PyPDFParser
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
import os
from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from google.genai import Client, types
from langchain_community.docstore.in_memory import InMemoryDocstore
from langchain_community.vectorstores import FAISS

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
client = Client(api_key=api_key)

system_instruction = ("You are a professional energy consultant that provides accurate and concise information. "
                      "You are limited to 100 words per response."
                      "You need to identify the problems based on the information provided, do not make up any information. "
                      "If you don't know, just say so."
                      "You are allow to give your own suggestions on how to tackle the problems. However, it is the best"
                      "to provide the solutions based on the documents provided.")
embeddings = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-001", google_api_key=api_key)


def load_pdf(file_path: str):
    path = file_path
    print(f"Looking for customer PDFs in: {os.path.abspath(path)}")
    loader = GenericLoader(
        blob_loader=FileSystemBlobLoader(
            path=os.path.abspath(path),
            glob="*.pdf",
        ),
        blob_parser=PyPDFParser(),
    )
    print("PDF loaded successfully.")
    return loader.load()

def vector_store_file(file_path: str):
    docs = load_pdf(file_path)
    print("*" * 100)
    print("splitting text")
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000, chunk_overlap=200
    )

    vector_store = FAISS.from_documents(
        documents=docs,
        embedding=embeddings,
    )
    try:
        vector_store.save_local("./db")
        print("Vector store created and saved locally.")
        print(f"vector store length: {len(vector_store)}")
    except Exception as e:
        print(f"Error saving vector store: {e}")
    return vector_store


def retrieve_similar_documents(k: int = 5, user_info: str = ""):
    db_dir = "./db"
    index_file = os.path.join(db_dir, "index.faiss")
    if not os.path.exists(index_file):
        raise FileNotFoundError(f"FAISS index file not found at {index_file}. Please run vector_store_file() first.")
    if user_info == "":
        raise Exception("Please provide user_info when retrieving similar documents.")

    vector_store = FAISS.load_local(db_dir, embeddings=embeddings, allow_dangerous_deserialization=True)
    query = f"""
    This is the users info provided:
    {user_info}
    Search for this user monthly energy consumption bills 
"""
    result = vector_store.similarity_search(query=query, k=k)
    return result


def analyze_user_problem(user_info, documents: list[Document]):
    combined_content = "\n".join([doc.page_content for doc in documents])
    print("*" * 100)
    print(f"combined content: {combined_content}")
    user_prompt = f"""
    Given the following user information: {user_info}
    and the retrieved documents: {combined_content}
    Analyze the user's problem and provide insights or solutions on the ways to save energy consumption.
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        config=types.GenerateContentConfig(
            system_instruction=system_instruction
        ),
        contents=user_prompt
    )
    return response.text


def problem_analysis_suggestion(problem: str):
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        config=types.GenerateContentConfig(
            system_instruction=system_instruction
        ),
        contents=f"""
        Provide suggestions to solve the following energy problem: {problem}.
        Your need to response in JSON format with the following structure:
        {
        {
              "problem": "problem",
            "campaigns": [
    {
      "title": "HVAC optimization sprint",
      "tasks": [
        {
          "id": "t1",
          "text": "check air filters",
          "points": 15,
          "completed": "false"
        }
      ]
    }
  ]
        }
        }
        
the title should be a campaign name related to energy saving.
the text should be the task assigned to the user related to the campaign. 
The points is the reward points that is given to the user upon the completion of the task. 
You must at least provide 5 campaigns. The total points should be 100.
"""
    )
    return response.text
