import React, { useState } from 'react'

const EditingTask = function (props) {
  const [label, setLabel] = useState('')

  const onTaskChange = (event) => {
    setLabel(event.target.value)
  }

  const onEnterValue = (event) => {
    if (event.key === 'Enter') {
      props.onChangeLabel(props.id, label)
    }
  }

  if (props.editing) {
    return (
      <input
        type="text"
        className="edit"
        onChange={onTaskChange}
        onKeyDown={onEnterValue}
        value={label || props.label}
      />
    )
  }
  return null
}

export default EditingTask
