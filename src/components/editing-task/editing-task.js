import React from 'react'

export default class EditingTask extends React.Component {
  state = { label: '' }

  onTaskChange = (event) => {
    this.setState(() => ({
      label: event.target.value,
    }))
  }

  onEnterValue = (event) => {
    if (event.key === 'Enter') {
      this.props.onChangeLabel(this.props.id, this.state.label)
    }
  }

  render() {
    const { editing, label } = this.props
    if (editing) {
      return (
        <input
          type="text"
          className="edit"
          onChange={this.onTaskChange}
          onKeyDown={this.onEnterValue}
          value={this.state.label ? this.state.label : label}
        />
      )
    }

    return null
  }
}
