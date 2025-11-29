import os.path
from typing import List
from fastapi import APIRouter, File, UploadFile
from starlette.responses import RedirectResponse

from ai_agent_tools.rag_agent import vector_store_file
from controllers.agent_controller import vector_store
from utils.file_ops import upload_pdf
pdf_router = APIRouter(prefix="/pdf")

@pdf_router.post("/upload")
async def upload_pdf_endpoint(pdf_files: List[UploadFile] = File(...)):
    result = upload_pdf(pdf_files)
    return {"message": "Files uploaded successfully.", "files": result}

