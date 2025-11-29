import requests
from fastapi import APIRouter
from starlette.requests import Request
from starlette.responses import RedirectResponse
user_router = APIRouter(prefix="/users")


@user_router.post("/info")
async def get_user_background_info(request: Request, role: str, report: str):
    data = {"role": role, "report": report}
    request.session["user_info"] = data
    return {"message": "User information received successfully."}


@user_router.get('/get_info')
async def get_user_background_info(request: Request):
    user_info = request.session.get("user_info")
    return user_info
