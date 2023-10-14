import React from 'react'
import PropTypes from "prop-types"

import Task from "../task"
export default class TaskList extends React.Component {

  render(){
    const {todos, onDeleted, onToggleCompleted, onToggleEditing, onChangeLabel} = this.props
    const elements = todos.map((item)=>{
      return (
        <Task key = {item.id}
              todo = {item}
              onDeleted = {()=>onDeleted(item.id)}
              onToggleCompleted = {()=>onToggleCompleted(item.id)}
              onToggleEditing = {()=>onToggleEditing(item.id)}
              onChangeLabel={onChangeLabel}/>
      )
    })

    return(
      <ul className="todo-list">
        {elements}
      </ul>
    )
  }
}

TaskList.propTypes = {
  todos: PropTypes.any,
  onDeleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onToggleEditing: PropTypes.func.isRequired,
  onChangeLabel: PropTypes.func.isRequired
};

TaskList.defaultProps = {
  todos: {},
};

