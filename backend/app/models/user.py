import uuid # this is for generating unique identifiers for our users
import sqlalchemy # this is for using the SQLAlchemy ORM to interact with our database
from datetime import datetime
from sqlalchemy import String, DateTime, Text, Integer # this is for the SQLAlchemy ORM it allows us to define the structure of our database tables and their columns   
from sqlalchemy.dialects.postgresql import UUID # this is for using the UUID data type in PostgreSQL
from app.db.database import Base # this is for importing the Base class from our database module which is used to define our models
from sqlalchemy.orm import mapped_column, Mapped # this is for defining mapped columns in our SQLAlchemy models

user_status_enum = sqlalchemy.Enum("pending", "accepted", name="user_status")


class User(Base):
    __tablename__ = "users" # this is the name of the table in the database

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4) # this is the primary key column for the user table it uses UUIDs for unique identifiers
    name: Mapped[str] = mapped_column(String(50), unique=False, nullable=False) # this is the name column it cannot be null
    email: Mapped[str] = mapped_column(String(100), unique=True, nullable=False) # this is the email column it must be unique and cannot be null
    adhaar_number: Mapped[str] = mapped_column(String(12), unique=True, nullable=False) # this is the adhaar number column it must be unique and cannot be null
    mobile_number: Mapped[str] = mapped_column(String(15), unique=True, nullable=False) # this is the mobile number column it must be unique and cannot be null
    state: Mapped[str] = mapped_column(String(50), nullable=False) # this is the state column it cannot be null
    city: Mapped[str] = mapped_column(String(50), nullable=False) # this is the city column it cannot be null
    pincode: Mapped[int] = mapped_column(Integer, nullable=False) # this is the pincode column it cannot be null
    address: Mapped[str] = mapped_column(Text, nullable=False) # this is the address column it cannot be null
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow) # this is the timestamp for when the user was created it defaults to the current UTC time
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow) # this is the timestamp for when the user was last updated it defaults to the current UTC time and updates on changes
    status: Mapped[str] = mapped_column(user_status_enum, default="pending", nullable=False) # this is the status column it can only be "pending" or "accepted" and defaults to "pending"