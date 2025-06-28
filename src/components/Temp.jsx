export function Todos({ todos }) {
  const markAsCompleted = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/completed`)
, {
        method: "PUT",
        headers: {
          "Content-Type":"application/json" // ✅ no space after slash
        },
        body: JSON.stringify({
          id: id
        })
      });

      const data = await res.json();
      alert(data.msg || "Marked as completed");

      // Optional: update todos state without reload
      window.location.reload();
    } catch (err) {
      alert("Failed to update todo");
      console.error(err);
    }
  };

  return (
    <div id="todos-wrapper">
      {todos.map((todo) => (
        <div className="todo-card" key={todo._id}>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <p>Status: {todo.completed ? "✅ Completed" : "❌ Not completed"}</p>

          {!todo.completed && (
            <button
              className="complete-btn"
              onClick={() => markAsCompleted(todo._id)}
            >
              Mark as Completed
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
