import { useState, useEffect } from 'react';

import './App.css';
import { CreateTodo } from './components/CreateTodo';
import { Todos } from './components/Temp';

function App() {
  const [todos, setTodos] = useState([]);
  const [showTodos, setShowTodos] = useState(false); // toggle state

  const fetchTodos = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/todos`)

      .then(async (res) => {
        const json = await res.json();
        setTodos(json.todos);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container" id="main-app">
      <h1 id="app-title">Todo Manager</h1>

      <div id="create-todo-section">
        <CreateTodo onTodoCreated={fetchTodos} />
      </div>

      <button
        className="show-btn"
        id="toggle-todo-btn"
        onClick={() => setShowTodos(!showTodos)}
      >
        {showTodos ? "Hide Todos" : "Show Todos"}
      </button>

      {showTodos && (
        <div id="todo-list-section">
          <Todos todos={todos} onTodoUpdated={fetchTodos} />
        </div>
      )}
    </div>
  );
}

export default App;
