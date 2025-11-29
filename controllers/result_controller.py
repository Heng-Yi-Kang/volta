import json
from http import HTTPStatus

from fastapi import APIRouter
from starlette.requests import Request
from starlette.responses import JSONResponse

result_router = APIRouter(prefix="/result")

@result_router.get("/get-result")
async def get_result(request: Request):
    analysis_suggestions:str = request.session["analysis_suggestions"]
    formatted_analysis_suggetions = analysis_suggestions.replace("```json", "").replace("```", "")
    json_data = json.loads(formatted_analysis_suggetions)
    return json_data
