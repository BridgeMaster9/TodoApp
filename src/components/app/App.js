import './App.css'
import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import Footer from '../footer'

import React, { useState } from 'react'

const App = function () {
  const [todoData, setTodoData] = useState([])
  const [filterTask, setFilterTask] = useState('all')
  const [maxId, setMaxId] = useState(99)

  const creatTodoItem = function (label, timer) {
    setMaxId(maxId + 1)
    return {
      label,
      id: maxId,
      completed: false,
      editing: false,
      date: new Date(),
      timer,
    }
  }

  const deleteItem = function (id) {
    const idx = todoData.findIndex((el) => el.id === id)
    const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
    setTodoData(newArray)
  }

  const clearAllCompleted = function () {
    const newArray = todoData.filter((el) => !el.completed)
    setTodoData(newArray)
  }

  const addItem = function (text, min, sec) {
    const newTimer = `${min}:${sec}`
    const newItem = creatTodoItem(text, newTimer)
    setTodoData([...todoData, newItem])
  }
  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id)
    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }
  const toggleCompleted = function (id) {
    setTodoData(toggleProperty(todoData, id, 'completed'))
  }

  const toggleEditing = function (id) {
    setTodoData(toggleProperty(todoData, id, 'editing'))
  }

  const onFilterChange = function (filter) {
    setFilterTask(filter)
  }

  const changeLabel = function (id, value) {
    const idx = todoData.findIndex((el) => el.id === id)
    const oldItem = todoData[idx]
    const newItem = { ...oldItem, label: value, editing: false }
    setTodoData([...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)])
  }

  const visibleItems = todoData
  const completedCount = todoData.filter((el) => el.completed).length
  const activeCount = todoData.length - completedCount

  return (
    <section className="todoapp">
      <NewTaskForm onAddItem={addItem} />
      <section className="main">
        <TaskList
          todos={visibleItems}
          filterTask={filterTask}
          onDeleted={deleteItem}
          onToggleCompleted={toggleCompleted}
          onToggleEditing={toggleEditing}
          onChangeLabel={changeLabel}
        />
        <Footer
          activeCount={activeCount}
          filterTask={filterTask}
          onFilterChange={onFilterChange}
          onClearAllCompleted={clearAllCompleted}
        />
      </section>
    </section>
  )
}

export default App
