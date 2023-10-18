import Task from '../task'

import React from 'react'
import PropTypes from 'prop-types'

// eslint-disable-next-line react/prefer-stateless-function
export default class TaskList extends React.Component {
  render() {
    const { todos, onDeleted, onToggleCompleted, onToggleEditing, onChangeLabel } = this.props
    const elements = todos.map((item) => (
      <Task
        key={item.id}
        todo={item}
        onDeleted={() => onDeleted(item.id)}
        onToggleCompleted={() => onToggleCompleted(item.id)}
        onToggleEditing={() => onToggleEditing(item.id)}
        onChangeLabel={onChangeLabel}
      />
    ))

    return <ul className="todo-list">{elements}</ul>
  }
}

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
