from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# this will allow the frontend to make requests to the backend without any CORS issues
app.add_middleware(
    CORSMiddleware,# here adding this middleware to the app make sure that the frontend can make requests to the backend without any CORS issues
    allow_origins = ["https://localhost:3000", "https://127.0.0.1:3000"], # adding both localhost because localhost and 127.0.0.1 are different origins and the frontend can be running on either of them
    allow_credentials = True, # making it true so that the frontend can send cookies to the backend
    allow_methods = ["*"], # allowing all HTTP methods
    allow_headers = ["*"], # allowing all headers
)

@app.get("/api/v1/health")
def check_health():
    return {"status": "ok", "message": "Connected to FastAPI backend successfully!"}