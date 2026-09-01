from pydantic import BaseModel, EmailStr
from typing import Optional

class RegisterUser(BaseModel):
    name: str
    email: EmailStr
    adhaar_number: str
    mobile_number: str
    state: str
    city: str
    pincode: int
    address: str

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    status: str
    
    class Config:
        from_attributes = True