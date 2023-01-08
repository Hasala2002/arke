import { IconAlignRight, IconChecks, IconSettings, IconUserCircle, IconX } from '@tabler/icons'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import * as styles from "./styles/NavBar.module.scss"

const NavBar = () => {

  const [ open, setOpen ] = useState(true)

  return ( 
    <div
    className={styles.NavBar}>
        <a href="https://arkechat.live" className={styles.Title}>
            <img src="/arke.svg" alt="Arke Logo" />
            <span>Arkē</span>
        </a>
        {/* <div className={styles.NavLinks}>
            <a href="#home">Home</a>
            <a href="#highlights">Hightlights</a>
            <a href="#showcase">Showcase</a>
            <a href="#community        <div className={styles.NavAuth}>
            <a href="#">Log in</a>
            <a className={styles.Btn} href="#">
              <IconSettings size={20} />
              <span>Settings</span>
            </a>
        </div>">Community</a>
        </div> */}

        <div className={styles.AccountStatus}>
          <IconUserCircle stroke={2} size={22} />
          {/* <span>S</span> */}
          <div className={styles.Chip}>
            <IconChecks stroke={2} size={16} />
            <span>{`Not e2e Encrypted Yet`}</span>
          </div>
        </div>
        <div className={styles.NavAuth}>
            {/* <a href="#">Log in</a> */}
            <Link to="/settings/theme" className={styles.Btn}>
              <IconSettings size={20} />
              <span>Settings</span>
            </Link>
        </div>
    </div>
  )
}

export default NavBar