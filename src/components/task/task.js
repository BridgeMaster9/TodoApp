import React from 'react'
import PropTypes from "prop-types";

import { formatDistanceToNow } from 'date-fns';

import EditingTask from "../editing-task";


export default class Task extends React.Component {

  render(){
    const {todo, onToggleCompleted, onChangeLabel, onToggleEditing, onDeleted} = this.props
    const {label, editing, completed, id, date} = todo
    let taskClassName = undefined
    if(completed){
      taskClassName = "completed"
    }
    if(editing){
      taskClassName = "editing"
    }

    return(
      <li className = {taskClassName} >
        <div className="view" >
          <input className="toggle" type="checkbox" onClick={onToggleCompleted} id={id}/>
          <label htmlFor={id}>
            <span className="description" >{label}</span>
            <span className="created">
              {`created ${formatDistanceToNow(date, {
                includeSeconds: true,
                addSuffix: true,
              })}`}
            </span>
          </label>
          <button className="icon icon-edit" onClick={onToggleEditing}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <EditingTask editing={editing} label={label} id={id} onChangeLabel={onChangeLabel}/>
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
  onDeleted: PropTypes.func.isRequired
};

Task.defaultProps = {
  todo: {},
};

