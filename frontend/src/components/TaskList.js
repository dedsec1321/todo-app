import React, { useEffect, useState } from "react";
import API from "../api";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div>
      <h2>To-Do List</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New Task" />
      <button onClick={addTask}>Add</button>

      {tasks.map((task) => (
        <div key={task._id}>
          <p>{task.title} - {task.status}</p>
          <button onClick={() => updateStatus(task._id, "Completed")}>Complete</button>
          <button onClick={() => deleteTask(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
