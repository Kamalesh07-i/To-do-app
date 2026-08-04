function TodoItem({
    todo,
    onToggle,
    onUpdateClick,
    onDelete
}) {

    return (

        <div className="todo-item">

            <div>

                <h3
                    className={
                        todo.completed
                            ? "completed"
                            : ""
                    }
                >
                    {todo.title}
                </h3>

                <p>
                    {todo.description}
                </p>

            </div>


            <div>

                <button
                    onClick={() =>
                        onToggle(todo)
                    }
                >
                    {todo.completed
                        ? "Undo"
                        : "Complete"
                    }
                </button>


                <button
                    onClick={() =>
                        onUpdateClick(todo)
                    }
                >
                    Update ✏️
                </button>


                <button
                    onClick={() =>
                        onDelete(todo.id)
                    }
                >
                    Delete 🗑️
                </button>

            </div>

        </div>
    );
}

export default TodoItem;