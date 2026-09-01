from fastapi import APIRouter
from app.api.v1.endpoints.register import router as register_router

router = APIRouter(prefix="/api/v1", tags=["v1"])
router.include_router(register_router)

