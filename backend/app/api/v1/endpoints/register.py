from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.user import RegisterUser


router = APIRouter(prefix="/register", tags=["v1"])


@router.post("/", status_code=status.HTTP_201_CREATED)
async def register_user(user: RegisterUser, db: Session = Depends(get_db)):
    """
    Endpoint to register a new user.
    """
    from app.models.user import User  # Importing here to avoid circular imports
    from app.models.rejectedUsers import RejectedUser  # Importing here to avoid circular imports

    # Check if the user already exists in the users table
    existing_user = db.query(User).filter(
        (User.email == user.email) |
        (User.adhaar_number == user.adhaar_number) |
        (User.mobile_number == user.mobile_number)
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={
                "status": "error",
                "message": "User is already registered. For further queries, please contact admin.",
            },
        )

    # Check if the user already exists in the rejectedusers table
    existing_rejected_user = db.query(RejectedUser).filter(
        (RejectedUser.email == user.email) |
        (RejectedUser.adhaar_number == user.adhaar_number) |
        (RejectedUser.mobile_number == user.mobile_number)
    ).first()

    if existing_rejected_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={
                "status": "error",
                "message": "User has been rejected previously. For further queries, please contact admin.",
            },
        )

    # Create a new user instance
    new_user = User(
        name=user.name,
        email=user.email,
        adhaar_number=user.adhaar_number,
        mobile_number=user.mobile_number,
        state=user.state,
        city=user.city,
        pincode=user.pincode,
        address=user.address,
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc),
        status="pending",
    )

    # Add the new user to the database
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"status": "success", "message": "User registered successfully.", "user_id": str(new_user.id)}


