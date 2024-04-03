from typing import Optional
from sqlmodel import Field, SQLModel

class Workout(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str 
    exercices: str
    password = str
    age: Optional[int] = Field(default=None, index=True)
