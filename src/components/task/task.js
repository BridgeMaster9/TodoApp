import EditingTask from '../editing-task'
import changeTime from '../../function/change-time/change-time'
import { formatDistanceToNow } from 'date-fns'

import React from 'react'
import PropTypes from 'prop-types'

// eslint-disable-next-line react/prefer-stateless-function
export default class Task extends React.Component {
  state = {
    time: this.props.todo.timer,
    activeTimer: 'true',
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    if (this.state.activeTimer && this.state.time !== 'time is up') {
      const newTime = changeTime(this.state.time)
      this.setState({ time: newTime })
    }
  }

  stopTimer = () => {
    this.setState({ activeTimer: false })
  }

  startTimer = () => {
    this.setState({ activeTimer: true })
  }

  render() {
    const { todo, onToggleCompleted, onChangeLabel, onToggleEditing, onDeleted, filterTask } = this.props
    const { label, editing, completed, id, date } = todo
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
              <button className="icon icon-play" type="button" onClick={this.startTimer} />
              <button className="icon icon-pause" type="button" onClick={this.stopTimer} />
              <span className="timer">{this.state.time}</span>
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
