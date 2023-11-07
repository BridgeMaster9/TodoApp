import React from 'react'
import PropTypes from 'prop-types'

export default class TasksFilter extends React.Component {
  buttons = [
    { name: 'all', selected: false },
    { name: 'active', selected: false },
    { name: 'completed', selected: false },
  ]

  render() {
    const { filterTask, onFilterChange } = this.props

    const buttons = this.buttons.map(({ name }) => {
      const isActive = filterTask === name
      const clazz = isActive ? 'selected' : undefined
      return (
        <li key={name}>
          <button type="button" className={clazz} onClick={() => onFilterChange(name)}>
            {name}
          </button>
        </li>
      )
    })
    return <ul className="filters">{buttons}</ul>
  }
}

TasksFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
}
