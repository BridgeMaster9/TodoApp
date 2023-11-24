import Task from '../task'

import React from 'react'
import PropTypes from 'prop-types'

const TaskList = function (props) {
  const { todos, onDeleted, onToggleCompleted, onToggleEditing, onChangeLabel, filterTask } = props
  const elements = todos.map((item) => (
    <Task
      key={item.id}
      todo={item}
      onDeleted={() => onDeleted(item.id)}
      onToggleCompleted={() => onToggleCompleted(item.id)}
      onToggleEditing={() => onToggleEditing(item.id)}
      onChangeLabel={onChangeLabel}
      filterTask={filterTask}
    />
  ))
  return <ul className="todo-list">{elements}</ul>
}

export default TaskList

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onToggleEditing: PropTypes.func.isRequired,
  onChangeLabel: PropTypes.func.isRequired,
}

TaskList.defaultProps = {
  todos: [],
}
