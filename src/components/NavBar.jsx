import { IconAlignRight, IconChecks, IconSettings, IconUserCircle, IconX } from '@tabler/icons'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useMatch } from 'react-router-dom'
import Swal from 'sweetalert2'
import * as styles from "./styles/NavBar.module.scss"
import { useArke } from './utilities/Arke.Context'
import AnimatedLogo from './utilities/AnimatedLogo'

const NavBar = () => {

  const [open, setOpen] = useState(true)

  const { customSWClass } = useArke()

  const chatMatch = useMatch('/chat/:id');

  const handleLogin = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      // icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: customSWClass
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  return (
    <div
      className={styles.NavBar}>
      <a href="https://arkechat.live" className={styles.Title}>
        {/* <img src="/arke.svg" alt="Arke Logo" /> */}
        <AnimatedLogo />
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
        {/* <IconUserCircle stroke={2} size={22} /> */}
        {/* <span>S</span> */}
        <div className={styles.Chip}>
          <IconChecks stroke={2} size={16} />
          <span>{`HTTPS Encrypted`}</span>
        </div>
      </div>
      <div className={styles.NavAuth}>
        {/* <a href="#" onClick={handleLogin}>Log in</a> */}

        {/* {chatMatch ? null : */}
        <Link to="/settings/theme" className={styles.Btn}>
          <IconSettings size={20} />
          <span>Settings</span>
        </Link>
        {/* } */}
      </div>
    </div>
  )
}

export default NavBar