from fastapi import FastAPI

from controllers.agent_controller import agent_router
from controllers.pdf_controller import pdf_router
from controllers.users_controller import user_router
from controllers.result_controller import result_router
from starlette.middleware.sessions import SessionMiddleware
from starlette.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key="my-secret-key", same_site="none", https_only=False)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pdf_router)
app.include_router(user_router)
app.include_router(result_router)
app.include_router(agent_router)

@app.get("/")
async def root():
    return {"message": "Hello World"}
