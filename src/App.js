import Header from "./Components/Header";
import { useState } from "react";
import Tasks from "./Components/Tasks";
import AddTask from "./Components/AddTask";


function App() {
  const [showAddTasks, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Doctors Appointment",
      day: "2/5 @ 2:30pm",
      reminder: true,
    },
    {
      id: 2,
      text: "Photography Appointment",
      day: "2/7 @ 3:30pm",
      reminder: true,
    },
    {
      id: 3,
      text: "Coffee Date with Max",
      day: "2/9 @ 10:30am",
      reminder: false,
    },
    {
      id: 4,
      text: "Dentist Appointment",
      day: "2/13 @ 4:00pm",
      reminder: false,
    },
  ]);

  const displayAddTasks = () => {
    setShowAddTask(!showAddTasks)
  }

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, reminder: !task.reminder }
          : task
      )
    );
  };

  return (
    <div className="container">
      <Header onDisplay={displayAddTasks} />
      {showAddTasks && <AddTask onAdd={addTask} />}
      { tasks.length === 0 ? 'No tasks to display' : <Tasks
        tasks={tasks}
        onDelete={deleteTask}
        toggleReminder={toggleReminder}
        
      />}
    </div>
  );
}

export default App;
