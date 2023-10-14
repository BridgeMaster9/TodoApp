import React from "react";
import PropTypes from "prop-types";
export default class TasksFilter extends React.Component{
  buttons = [
    {name: 'All', selected: false},
    {name: 'Active', selected: false},
    {name: 'Completed', selected: false}
  ]
  render(){
    const {filterTask, onFilterChange} = this.props

    const buttons = this.buttons.map(({name, selected})=>{
      const isActive = filterTask === name
      const clazz = isActive? 'selected' : undefined
      return <li key={name}>
        <button className={clazz} onClick={()=>onFilterChange(name)}>{name}</button>
      </li>
    })
    return (
      <ul className="filters">
        {buttons}
      </ul>
    )
  }
}

TasksFilter.propTypes = {
  filterTask: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired
};

TasksFilter.defaultProps = {
  filter: 'All',
};
