import React from 'react'

const Log = props => (
  <div className="col-lg-4 log">
    {props.log.map((message, index) => (
      <div key={index}>{message}</div>
    ))}
  </div>
)

export default Log