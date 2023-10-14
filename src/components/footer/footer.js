import React from 'react'
import PropTypes from "prop-types"

import TasksFilter from "../tasks-filter";
const Footer = (props)=>{
  const {filterTask, activeCount, onFilterChange, onClearAllCompleted} = props
  return(
    <footer className="footer">
      <span className="todo-count">{activeCount} items left</span>
      <TasksFilter filterTask = {filterTask} onFilterChange={onFilterChange}/>
      <button className="clear-completed"
              onClick={onClearAllCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  filterTask: PropTypes.string,
  activeCount: PropTypes.number,
  onFilterChange: PropTypes.func.isRequired,
  onClearAllCompleted: PropTypes.func.isRequired
};

Footer.defaultProps = {
  activeCount: 0,
  filterTask: 'All',
};
export default Footer