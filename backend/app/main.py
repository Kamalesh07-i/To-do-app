from fastapi import (
    FastAPI,
    Depends,
    HTTPException
)

from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from .database import (
    engine,
    Base,
    get_db
)

from .schemas import (
    TodoCreate,
    TodoUpdate,
    TodoResponse
)

from . import crud


# Create tables
Base.metadata.create_all(
    bind=engine
)


app = FastAPI(
    title="Todo App API"
)


# CORS
app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]
)


# HOME
@app.get("/")
def home():

    return {
        "message": "Todo API is running"
    }


# GET ALL TODOS
@app.get(
    "/todos",
    response_model=list[TodoResponse]
)
def get_todos(
    db: Session = Depends(get_db)
):

    return crud.get_todos(db)


# GET ONE TODO
@app.get(
    "/todos/{todo_id}",
    response_model=TodoResponse
)
def get_todo(
    todo_id: int,

    db: Session = Depends(get_db)
):

    todo = crud.get_todo(
        db,
        todo_id
    )


    if todo is None:

        raise HTTPException(
            status_code=404,
            detail="Todo not found"
        )


    return todo


# CREATE TODO
@app.post(
    "/todos",
    response_model=TodoResponse
)
def create_todo(
    todo: TodoCreate,

    db: Session = Depends(get_db)
):

    return crud.create_todo(
        db,
        todo
    )


# UPDATE TODO
@app.put(
    "/todos/{todo_id}",
    response_model=TodoResponse
)
def update_todo(
    todo_id: int,

    todo: TodoUpdate,

    db: Session = Depends(get_db)
):

    updated_todo = crud.update_todo(
        db,
        todo_id,
        todo
    )


    if updated_todo is None:

        raise HTTPException(
            status_code=404,
            detail="Todo not found"
        )


    return updated_todo


# DELETE TODO
@app.delete(
    "/todos/{todo_id}"
)
def delete_todo(
    todo_id: int,

    db: Session = Depends(get_db)
):

    deleted_todo = crud.delete_todo(
        db,
        todo_id
    )


    if deleted_todo is None:

        raise HTTPException(
            status_code=404,
            detail="Todo not found"
        )


    return {
        "message": "Todo deleted successfully"
    }