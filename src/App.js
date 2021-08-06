import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Tasks from "./Components/Tasks";
import AddTask from "./Components/AddTask";
import About from "./Components/About";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";


function App() {
  const [showAddTasks, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  // returns all tasks located in db.json
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };

  // retrieves a single task for toggling reminder
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  const displayAddTasks = () => {
    setShowAddTask(!showAddTasks);
  };

  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    setTasks([...tasks, await res.json()]);
    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    // send PUT request to update database
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    const data = await res.json();
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <Router>
      <div className="container">
        <Header onDisplay={displayAddTasks} />

        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddTasks && <AddTask onAdd={addTask} />}
              {tasks.length === 0 ? (
                "No tasks to display"
              ) : (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  toggleReminder={toggleReminder}
                />
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
