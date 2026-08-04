import {
    useEffect,
    useState
} from "react";

import TodoForm
    from "./components/TodoForm";

import TodoList
    from "./components/TodoList";

import {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
} from "./services/todoService";

import "./App.css";


function App() {

    const [todos, setTodos] = useState([]);

    const [editingTodo, setEditingTodo] =
        useState(null);


    // GET
    const loadTodos = async () => {

        try {

            const data = await getTodos();

            setTodos(data);

        } catch (error) {

            console.error(error);

        }
    };


    useEffect(() => {

        loadTodos();

    }, []);


    // CREATE
    const handleAdd = async (todo) => {

        try {

            const newTodo =
                await createTodo(todo);

            setTodos((previousTodos) => [
                ...previousTodos,
                newTodo
            ]);

        } catch (error) {

            console.error(error);

        }
    };


    // UPDATE
    const handleUpdate = async (
        id,
        todo
    ) => {

        try {

            const updatedTodo =
                await updateTodo(
                    id,
                    todo
                );


            setTodos((previousTodos) =>

                previousTodos.map((item) =>

                    item.id === updatedTodo.id
                        ? updatedTodo
                        : item

                )
            );


            // Close edit mode
            setEditingTodo(null);

        } catch (error) {

            console.error(error);

        }
    };


    // COMPLETE / UNDO
    const handleToggle = async (todo) => {

        try {

            const updatedTodo =
                await updateTodo(
                    todo.id,
                    {
                        title: todo.title,
                        description: todo.description,
                        completed: !todo.completed
                    }
                );


            setTodos((previousTodos) =>

                previousTodos.map((item) =>

                    item.id === updatedTodo.id
                        ? updatedTodo
                        : item

                )
            );

        } catch (error) {

            console.error(error);

        }
    };


    // DELETE
    const handleDelete = async (id) => {

        try {

            await deleteTodo(id);


            setTodos((previousTodos) =>

                previousTodos.filter(
                    (todo) =>
                        todo.id !== id
                )

            );

        } catch (error) {

            console.error(error);

        }
    };


    return (

        <div className="container">

            <h1>
                📝 My Todo App
            </h1>


            <TodoForm
                onAdd={handleAdd}
                onUpdate={handleUpdate}
                editingTodo={editingTodo}
                onCancel={() =>
                    setEditingTodo(null)
                }
            />


            <TodoList
                todos={todos}
                onToggle={handleToggle}
                onUpdateClick={setEditingTodo}
                onDelete={handleDelete}
            />

        </div>
    );
}

export default App;