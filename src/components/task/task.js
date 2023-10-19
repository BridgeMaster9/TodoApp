import EditingTask from '../editing-task'
import { formatDistanceToNow } from 'date-fns'

import React from 'react'
import PropTypes from 'prop-types'

// eslint-disable-next-line react/prefer-stateless-function
export default class Task extends React.Component {
  render() {
    const { todo, onToggleCompleted, onChangeLabel, onToggleEditing, onDeleted } = this.props
    const { label, editing, completed, id, date } = todo
    let taskClassName = ''
    if (completed) {
      taskClassName = 'completed'
    }
    if (editing) {
      taskClassName = 'editing'
    }

    return (
      <li className={taskClassName}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleCompleted} id={id} />
          <label htmlFor={id}>
            <span className="description">{label}</span>
            <span className="created">
              {`created ${formatDistanceToNow(date, {
                includeSeconds: true,
                addSuffix: true,
              })}`}
            </span>
          </label>
          <button className="icon icon-edit" type="button" onClick={onToggleEditing} />
          <button className="icon icon-destroy" type="button" onClick={onDeleted} />
        </div>
        <EditingTask editing={editing} label={label} id={id} onChangeLabel={onChangeLabel} />
      </li>
    )
  }
}

Task.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    completed: PropTypes.bool,
    editing: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
  }),
  onToggleCompleted: PropTypes.func.isRequired,
  onChangeLabel: PropTypes.func.isRequired,
  onToggleEditing: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
}

Task.defaultProps = {
  todo: {},
}
