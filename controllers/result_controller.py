import json
from http import HTTPStatus

from fastapi import APIRouter
from starlette.requests import Request
from starlette.responses import JSONResponse

result_router = APIRouter(prefix="/result")

@result_router.get("/get-result")
async def get_result(request: Request):
    print("[DEBUG] /result/get-result headers:", request.headers)
    print("[DEBUG] /result/get-result session:", dict(request.session))
    analysis_suggestions = request.session.get('analysis_suggestions')
    print("*" * 100)
    print("Retrieving analysis suggestions from session:")
    print(analysis_suggestions)
    if analysis_suggestions is None:
        return JSONResponse({"error": "'analysis_suggestions' not found in session."}, status_code=HTTPStatus.BAD_REQUEST)
    formatted_analysis_suggestions = analysis_suggestions.replace("```json", "").replace("```", "")
    json_data = json.loads(formatted_analysis_suggestions)
    return json_data
