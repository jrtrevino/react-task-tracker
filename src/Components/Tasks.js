import Task from './Task'
import React from 'react'

const Tasks = ({ tasks, onDelete, toggleReminder, onAdd }) => {
    return (
        <>
          {tasks.map((task) => (
              <Task key={task.id} task={task} onDelete={onDelete}
              toggleReminder={toggleReminder}
              onAdd={onAdd}/>
          ))}  
        </>
    )
}

export default Tasks
