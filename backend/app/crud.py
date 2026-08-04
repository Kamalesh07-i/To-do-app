from sqlalchemy.orm import Session

from .models import Todo
from .schemas import TodoCreate, TodoUpdate


# READ ALL
def get_todos(db: Session):

    return db.query(Todo).all()


# READ ONE
def get_todo(
    db: Session,
    todo_id: int
):

    return db.query(Todo).filter(
        Todo.id == todo_id
    ).first()


# CREATE
def create_todo(
    db: Session,
    todo: TodoCreate
):

    new_todo = Todo(
        title=todo.title,
        description=todo.description,
        completed=False
    )

    db.add(new_todo)

    db.commit()

    db.refresh(new_todo)

    return new_todo


# UPDATE
def update_todo(
    db: Session,
    todo_id: int,
    todo: TodoUpdate
):

    existing_todo = get_todo(
        db,
        todo_id
    )

    if existing_todo is None:
        return None


    existing_todo.title = todo.title

    existing_todo.description = todo.description

    existing_todo.completed = todo.completed


    db.commit()

    db.refresh(existing_todo)

    return existing_todo


# DELETE
def delete_todo(
    db: Session,
    todo_id: int
):

    existing_todo = get_todo(
        db,
        todo_id
    )

    if existing_todo is None:
        return None


    db.delete(existing_todo)

    db.commit()

    return existing_todo