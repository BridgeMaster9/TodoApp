import './App.css'
import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import Footer from '../footer'

import React from 'react'

export default class App extends React.Component {
  maxId = 100

  state = {
    todoData: [],
    filterTask: 'All',
  }

  creatTodoItem(label) {
    return {
      label,
      id: this.maxId++,
      completed: false,
      editing: false,
      date: new Date(),
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
      return {
        todoData: newArray,
      }
    })
  }

  clearAllCompleted = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((el) => !el.completed)
      return { todoData: newArray }
    })
  }

  addItem = (text) => {
    this.setState(({ todoData }) => {
      const newItem = this.creatTodoItem(text)

      const newArr = [...todoData, newItem]
      return {
        todoData: newArr,
      }
    })
  }

  toggleCompleted = (id) => {
    this.setState(({ todoData }) => ({ todoData: this.toggleProperty(todoData, id, 'completed') }))
  }

  toggleEditing = (id) => {
    this.setState(({ todoData }) => ({ todoData: this.toggleProperty(todoData, id, 'editing') }))
  }

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id)
    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  filterTasks(items, filterTask) {
    switch (filterTask) {
      case 'Active':
        return items.filter((item) => !item.completed)
      case 'Completed':
        return items.filter((item) => item.completed)
      default:
        return items
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filterTask: filter })
  }

  changeLabel = (id, value) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, label: value, editing: false }
      return { todoData: [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)] }
    })
  }

  render() {
    const { todoData, filterTask } = this.state
    const visibleItems = this.filterTasks(todoData, filterTask)

    const completedCount = todoData.filter((el) => el.completed).length
    const activeCount = todoData.length - completedCount

    return (
      <section className="todoapp">
        <NewTaskForm onAddItem={this.addItem} />
        <section className="main">
          <TaskList
            todos={visibleItems}
            onDeleted={this.deleteItem}
            onToggleCompleted={this.toggleCompleted}
            onToggleEditing={this.toggleEditing}
            onChangeLabel={this.changeLabel}
          />
          <Footer
            activeCount={activeCount}
            filterTask={filterTask}
            onFilterChange={this.onFilterChange}
            onClearAllCompleted={this.clearAllCompleted}
          />
        </section>
      </section>
    )
  }
}
