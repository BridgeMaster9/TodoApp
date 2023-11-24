import EditingTask from '../editing-task'
import changeTime from '../../function/change-time/change-time'
import useInterval from '../../function/useInterval'
import { formatDistanceToNow } from 'date-fns'

import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Task = function (props) {
  const { todo, onToggleCompleted, onChangeLabel, onToggleEditing, onDeleted, filterTask } = props
  const { label, editing, completed, id, date, timer } = todo

  const [time, setTime] = useState(timer)
  const [activeTimer, setActiveTime] = useState(true)

  useInterval(() => {
    if (activeTimer && time !== 'time is up') {
      const newTime = changeTime(time)
      setTime(newTime)
    }
  }, 1000)

  const stopTimer = function () {
    setActiveTime(false)
  }

  const startTimer = function () {
    setActiveTime(true)
  }

  let taskClassName = 'active'
  let displayTask = 'list-item'
  if (completed) {
    taskClassName = 'completed'
  }
  if (editing) {
    taskClassName = 'editing'
  }
  if (filterTask !== 'all' && filterTask !== taskClassName) displayTask = 'none'
  else displayTask = 'list-item'
  return (
    <li className={taskClassName} style={{ display: displayTask }}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onToggleCompleted} id={id} />
        <label htmlFor={id}>
          <span className="title">{label}</span>
          <span className="description">
            <button className="icon icon-play" type="button" onClick={startTimer} />
            <button className="icon icon-pause" type="button" onClick={stopTimer} />
            <span className="timer">{time}</span>
          </span>
          <span className="description">
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

export default Task

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
