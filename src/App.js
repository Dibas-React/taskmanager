import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data;
  };

  //Fetch Tasks  single data from server
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  //Delete Task only use in UI
  // const deleteTask = (id) =>{
  //   setTasks(tasks.filter((task) => task.id !== id))
  // }

  //Delete Task from server
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //Add Task use only in ui
  // const addTask = (task) =>{
  //   const id = Math.floor(Math.random()*10000)+1
  //   const newTask = {id, ...task}
  //   setTasks([...tasks, newTask])
  // }

  //Add Task To server
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json;

    setTasks([...tasks, data]);
  };

  //Toggle Reminder use for only ui
  // const toggleReminder = (id) =>{
  //   setTasks(tasks.map((task) =>
  //   task.id === id ? { ...task, reminder : !task.reminder} : task
  //      )
  //   )
  // }

  //Toggle Reminder for server
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !data.reminder } : task
      )
    );
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Tasks
              tasks={tasks}
              onDelete={deleteTask}
              onToggle={toggleReminder}
            />
          }
        />

        <Route path="/about" element={About} />
      </Routes>
    </Router>
  );
};

export default App;
