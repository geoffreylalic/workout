from datetime import time
from typing import Annotated, Optional
from sqlmodel import Field, SQLModel, Relationship
from exercices import Exerice

class Serie(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    repetition: int = 0 
    rest: time = None
    exercice_id: int | None = Field(default=None,  foreign_key='exercice.id')
    exercice: Exercice | None = Relationship(back_populates='series')
