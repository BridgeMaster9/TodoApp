import React from 'react'
import PropTypes from 'prop-types'

const TasksFilter = function (props) {
  const filters = [
    { name: 'all', selected: false },
    { name: 'active', selected: false },
    { name: 'completed', selected: false },
  ]

  const { filterTask, onFilterChange } = props

  const buttons = filters.map(({ name }) => {
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

export default TasksFilter

TasksFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
}
