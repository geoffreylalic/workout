from typing import Optional
from sqlmodel import Field, SQLModel, Relationship
from users import User

class Workout(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str 
    exercices : list['Exercice'] = Relationship(back_populates='workout') 
    user_id : int | None = Field(default=None, foreign_key='user.id')
    user : User | None = Relationship(back_populates='workouts')