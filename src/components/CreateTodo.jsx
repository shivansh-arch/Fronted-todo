import React, { useState } from "react";

export function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateTodo = () => {
    if (!title || !description) {
      alert("Title and description are required");
      return;
    }

 fetch(`${import.meta.env.VITE_BACKEND_URL}/todo`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ title, description }),
})
      .then(async (res) => {
        const json = await res.json();
        alert("✅ Todo created!");
        setTitle(""); // Reset field
        setDescription(""); // Reset field
        console.log(json);
      })
      .catch((err) => {
        console.error("❌ Error while creating todo:", err);
        alert("Something went wrong");
      });
  };

  return (
    <div className="container">
      <input
        className="todo-input"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <input
        className="todo-input"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <button className="complete-btn" onClick={handleCreateTodo}>
        ➕ Add a Todo
      </button>
    </div>
  );
}
