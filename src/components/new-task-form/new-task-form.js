import React from 'react'
import PropTypes from 'prop-types'

export default class NewTaskForm extends React.Component {
  state = {
    label: '',
    sec: '',
    min: '',
  }

  onSetLabel = (event) => {
    this.setState(() => ({
      label: event.target.value,
    }))
  }

  onSetMinutes = (event) => {
    this.setState(() => ({
      min: event.target.value,
    }))
  }

  onSetSeconds = (event) => {
    this.setState(() => ({
      sec: event.target.value,
    }))
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.onAddItem(this.state.label, this.state.min, this.state.sec)
    this.setState({ label: '', sec: '', min: '' })
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="Task"
            onChange={this.onSetLabel}
            value={this.state.label}
            autoFocus
            required
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            autoFocus
            onChange={this.onSetMinutes}
            value={this.state.min}
            required
            type="number"
            min="0"
            max="59"
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            autoFocus
            onChange={this.onSetSeconds}
            value={this.state.sec}
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
}

NewTaskForm.propTypes = {
  onAddItem: PropTypes.func.isRequired,
}
