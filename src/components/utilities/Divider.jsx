import React from 'react'

const Divider = ({text}) => {
  return (
    <div className="divider-container">
        <div className="line"></div>
        {text ? <span>{text}</span> : null}
        {text ? <div className="line"></div> : null}
    </div>
  )
}

export default Divider