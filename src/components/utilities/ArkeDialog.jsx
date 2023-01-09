import { IconX } from '@tabler/icons'
import React, { useState } from 'react'

const ArkeDialog = () => {

  const [state,setState] = useState(true)

  return (
    <div className="arke-clickable-wrapper" style={{display: state ? "grid" : "none"}}>
      <div className="arke-dialog" >
          <button className="close-dialog-btn" onClick={()=>{setState(false)}}>
                <IconX stroke={1} size={20} />
            </button>
        <h2>Ambiguous Title</h2>
        <p>Are you sure you want to do this? This will cause this type of issue to occur and you may be subjected to that type of issue.</p>
        <div className="btn-group">
          <button>Yes, I am sure</button>
          <button>No, cancel</button>
        </div>
      </div>
    </div>
  )
}

export default ArkeDialog