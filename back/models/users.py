from typing import Optional
from sqlmodel import Field, SQLModel, Relationship
from datetime import date

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    first_name: str 
    last_name: str
    email = str 
    password = str
    birth_date : date | None = None
    workouts : list['Workout']= Relationship(back_populates='user')