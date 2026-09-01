from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import Base, engine
from app.models.user import User
from app.models.rejectedUsers import RejectedUser
from app.api.v1.routers import router as api_router 


app = FastAPI()

# this will allow the frontend to make requests to the backend without any CORS issues
app.add_middleware(
    CORSMiddleware,# here adding this middleware to the app make sure that the frontend can make requests to the backend without any CORS issues
    allow_origins = ["http://localhost:3000", "http://127.0.0.1:3000"], # adding both localhost because localhost and 127.0.0.1 are different origins and the frontend can be running on either of them
    allow_credentials = True, # making it true so that the frontend can send cookies to the backend
    allow_methods = ["*"], # allowing all HTTP methods
    allow_headers = ["*"], # allowing all headers
)

app.include_router(api_router) # including the api router to the app so that all the endpoints defined in the api router can be accessed from the app

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

@app.get("/api/v1/health")
def check_health():
    return {"status": "ok", "message": "Connected to FastAPI backend successfully!"}