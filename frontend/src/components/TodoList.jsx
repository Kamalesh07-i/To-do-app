import TodoItem from "./TodoItem";

function TodoList({
    todos,
    onToggle,
    onUpdateClick,
    onDelete
}) {

    if (todos.length === 0) {

        return (
            <p>
                No todos found.
            </p>
        );
    }


    return (

        <div>

            {todos.map((todo) => (

                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onUpdateClick={onUpdateClick}
                    onDelete={onDelete}
                />

            ))}

        </div>
    );
}

export default TodoList;