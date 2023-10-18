import React from 'react'
import PropTypes from 'prop-types'

export default class NewTaskForm extends React.Component {
  state = {
    label: '',
  }

  onTaskChange = (event) => {
    this.setState(() => ({
      label: event.target.value,
    }))
  }

  onEnterValue = (event) => {
    if (event.key === 'Enter') {
      this.props.onAddItem(this.state.label)
      this.setState({
        label: '',
      })
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onTaskChange}
          onKeyDown={this.onEnterValue}
          value={this.state.label}
        />
      </header>
    )
  }
}

NewTaskForm.propTypes = {
  onAddItem: PropTypes.func.isRequired,
}
