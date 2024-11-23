import React, {useState, useEffect} from 'react'

function TaskTracker() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    // Load tasks from local storage on component mount
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])

  useEffect(() => {
    // Save tasks to local storage whenever they change
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const handleAddTask = (title, description, dueDate, status) => {
    const newTask = {
      id: Date.now(),
      title,
      description,
      dueDate,
      status,
    }
    setTasks([...tasks, newTask])
  }

  const handleDeleteTask = id => {
    const updatedTasks = tasks.filter(task => task.id !== id)
    setTasks(updatedTasks)
  }

  const handleEditTask = (id, updatedTask) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? {...task, ...updatedTask} : task,
    )
    setTasks(updatedTasks)
  }

  return (
    <div>
      {/* Add Task Form */}
      <form onSubmit={e => e.preventDefault()}>
        {/* ... input fields for title, description, due date, status ... */}
        <button
          type="submit"
          onClick={() => handleAddTask(/* ... input values ... */)}
        >
          Add Task
        </button>
      </form>

      {/* Task List */}
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <p>Due Date: {task.dueDate}</p>
            <p>Status: {task.status}</p>
            <button
              onClick={() =>
                handleEditTask(task.id /* ... updated task data ... */)
              }
            >
              Edit
            </button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskTracker
