import React, { useRef } from 'react'

const LogoBox = ({ children }) => {


    const logoBox = useRef(0);


    return (
        <div className="logo-box"
            ref={logoBox}
        >
            {children}
        </div>
    )
}

export default LogoBox