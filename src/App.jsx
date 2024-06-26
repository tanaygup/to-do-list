import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (todo.trim().length > 0) {
      setTodos([...todos, { id: uuidv4(), text: todo.trim(), isCompleted: false }]);
      setTodo("");
    }
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((item) => item.id === id);
    setTodo(editTodo.text);
    handleDelete(id);
  };

  const handleCheckbox = (id) => {
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
  };

  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-violet-200 my-5 rounded-xl p-5 min-h-screen">
        <div className="addTodo my-5">
          <h2 className="text-3xl font-bold text-center mb-4">Task Manager</h2>
          <div className="flex justify-center">
            <input
              type="text"
              className="w-2/3 p-2 border-2 border-violet-700 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-700"
              onChange={(e) => setTodo(e.target.value)}
              value={todo}
              placeholder="Enter your task here"
            />
            <button
              onClick={handleAdd}
              disabled={todo.trim().length < 2}
              className="bg-violet-700 hover:bg-violet-900 p-2 ml-4 rounded-md text-white transition duration-200"
            >
              Add Task
            </button>
          </div>
        </div>
        <div className="my-5 flex items-center justify-center">
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={toggleShowCompleted}
            className="mr-2"
          />
          <label className="text-lg">Show Completed Tasks</label>
        </div>
        <div>
          <h1 className="text-xl font-bold text-center">Your Todos</h1>
          <div className="todos mt-4">
            {todos.length === 0 && (
              <div className="text-center text-gray-600">The task list is empty</div>
            )}
            {todos.map((item) =>
              (showCompleted || !item.isCompleted) && (
                <div
                  key={item.id}
                  className={`todo flex justify-between items-center bg-white p-4 my-2 mx-auto w-2/3 rounded-md shadow-md transition duration-200 ${
                    item.isCompleted ? "opacity-50" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={item.isCompleted}
                      onChange={() => handleCheckbox(item.id)}
                      className="mr-3"
                    />
                    <span className={`text-lg ${item.isCompleted ? "line-through" : ""}`}>
                      {item.text}
                    </span>
                  </div>
                  <div className="flex">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="bg-yellow-500 hover:bg-yellow-700 p-2 mx-1 rounded-md text-white transition duration-200"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 hover:bg-red-700 p-2 mx-1 rounded-md text-white transition duration-200"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
