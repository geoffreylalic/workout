from typing import Optional
from sqlmodel import Field, SQLModel

class Exerice(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str 
    age: Optional[int] = Field(default=None, index=True)
    series: str
