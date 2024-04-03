from datetime import time
from typing import Annotated, Optional
from sqlmodel import Field, SQLModel

class Serie(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    repetition: int = 0 
    rest: time = None
