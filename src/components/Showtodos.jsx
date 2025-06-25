import React, { useState } from "react";

export function ShowTodos() {
  const [todos, setTodos] = useState([]);
  const [visible, setVisible] = useState(false);

  const handleShowTodos = () => {
    if (!visible) {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/todos`)

        .then(async (res) => {
          const json = await res.json();
          setTodos(json.todos);
          setVisible(true);
        })
        .catch((err) => {
          console.error("Error fetching todos:", err);
        });
    } else {
      setVisible(false); // Toggle off
    }
  };

  return (
    <div className="container">
      <button
        className="show-btn"
        onClick={handleShowTodos}
      >
        {visible ? "Hide Todos" : "Show Todos"}
      </button>

      {visible && todos.length > 0 && (
        <div id="todos-wrapper">
          {todos.map((todo) => (
            <div className="todo-card" key={todo._id}>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
              <p>Status: {todo.completed ? "✅ Completed" : "❌ Not completed"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
