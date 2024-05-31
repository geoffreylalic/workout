from typing import Optional
from sqlmodel import Field, SQLModel, Relationship
from workouts import Workout

class Exerice(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str 
    series: list["Serie"] = Relationship(back_populates='exercice')
    workout_id : int | None = Field(default=None, foreign_key='workout.id')
    workout: Workout | None = Relationship(back_populates='exercices')