import os
from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse
from ai_agent_tools.rag_agent import *

agent_router = APIRouter(prefix="/agent")

@agent_router.get("/vector_store")
async def vector_store(file_path: str):
    # Store the file in the vector store
    vector_store_file(file_path)
    print("file processed and stored successfully.")
    # Redirect back to /process with a flag indicating vector store is done
    return RedirectResponse(url="/agent/process?vector_store_done=true")

@agent_router.get("/process")
async def process_agent(request: Request, vector_store_done: bool = False):
    # If vector store not done, redirect to vector_store
    # if not vector_store_done:
    #     # You can change the file_path as needed
    #     return RedirectResponse(url="/agent/vector_store?file_path=./uploads")
    # vector store is done, continue with the rest of the logic
    user_info = request.session.get("user_info") if hasattr(request, 'session') else None
    print(f"user_info: {user_info}")
    files = os.listdir("./uploads")
    print(f"Processing file: ")
    vector_store_file(os.path.abspath("./uploads"))
    # retrieve documents
    result = retrieve_similar_documents(k=5, user_info=user_info)
    print(f"retrieved_document: {result}")
    # analyse the problems with user info together with the retrieved documents
    user_problem = analyze_user_problem(user_info, documents=result)
    print(f"user_problem: {user_problem}")
    # google search on the problems
    # return solutions in json format
    suggestions = problem_analysis_suggestion(user_problem)
    print(suggestions)
    request.session['analysis_suggestions'] = suggestions
    print("*" *100)
    print("suggestions stored: ")
    print("suggestions stored")
    return {"message":"result evaluated"}