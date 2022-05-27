import Task from "./Task";
import Header from "./Header";
import Footer from "./Footer";
import React, { useState } from "react";

const Tasks = ({ tasks, onDelete, onToggle }) => {
  const [showAddTask, setShowAddTask] = useState(false);

  return (
    <>
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />

      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}

      <Footer />
    </>
  );
};

export default Tasks;
