import React, { useState } from 'react'

const NewTaskForm = function (props) {
  const [task, setTask] = useState({ label: '', sec: '', min: '' })

  const onSetLabel = (event) => {
    setTask({ ...task, label: event.target.value })
  }

  const onSetMinutes = (event) => {
    setTask({ ...task, min: event.target.value })
  }

  const onSetSeconds = (event) => {
    setTask({ ...task, sec: event.target.value })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    props.onAddItem(task.label, task.min, task.sec)
    setTask({ label: '', sec: '', min: '' })
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="Task"
          onChange={onSetLabel}
          value={task.label}
          autoFocus
          required
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
          onChange={onSetMinutes}
          value={task.min}
          required
          type="number"
          min="0"
          max="59"
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          onChange={onSetSeconds}
          value={task.sec}
          required
          type="number"
          min="0"
          max="59"
        />
        <button className="invisible-button" type="submit" />
      </form>
    </header>
  )
}

export default NewTaskForm
