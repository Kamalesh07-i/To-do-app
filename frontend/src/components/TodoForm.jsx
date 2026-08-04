import { useEffect, useState } from "react";

function TodoForm({ onAdd, onUpdate, editingTodo, onCancel }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {

        if (editingTodo) {
            setTitle(editingTodo.title);
            setDescription(editingTodo.description || "");
        }

    }, [editingTodo]);


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!title.trim()) {
            return;
        }

        if (editingTodo) {

            await onUpdate(editingTodo.id, {
                title: title,
                description: description,
                completed: editingTodo.completed
            });

        } else {

            await onAdd({
                title: title,
                description: description
            });
        }

        setTitle("");
        setDescription("");
    };


    return (

        <form onSubmit={handleSubmit}>

            <input
                type="text"
                placeholder="Todo title"
                value={title}
                onChange={(e) =>
                    setTitle(e.target.value)
                }
            />

            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) =>
                    setDescription(e.target.value)
                }
            />

            <button type="submit">

                {editingTodo
                    ? "Update Todo"
                    : "Add Todo"
                }

            </button>


            {editingTodo && (

                <button
                    type="button"
                    onClick={onCancel}
                >
                    Cancel
                </button>

            )}

        </form>
    );
}

export default TodoForm;