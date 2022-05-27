import Task from "./Task";
import Header from "./Header";
import Footer from "./Footer";
import React, { useState } from "react";

const Tasks = ({ tasks, onDelete, onToggle }) => {
  const [showAddTask, setShowAddTask] = useState(false);

  return (
    <>
      {/* header ra footer paxi layout component ma hala ani tesola routes hala */}
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
