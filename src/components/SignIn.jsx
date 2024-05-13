import { IconAsterisk, IconBrandGithub, IconBrandGoogle, IconKey, IconMail, IconSpy } from '@tabler/icons-react'
import React from 'react'
import * as styles from "./styles/Auth.module.scss"
import Divider from './utilities/Divider'

const SignIn = () => {
    return (
        <div className={styles.Auth}>
            <div className={styles.Graphics}>
                <img src="/arke-hero.png" alt="Arke" />
            </div>
            <div className={styles.Form}>
                <form action="">
                    <div className={styles.Title}>
                        <div className={styles.Logo}>
                            <IconKey />
                        </div>
                        <span>Welcome Back!</span>
                    </div>
                    <span className={styles.Label}>Email</span>
                    <div className={styles.NameInput}>
                        <input type="email" placeholder={"john.smith@email.com"} />
                        <div className={styles.icon}>
                            <IconMail stroke={0.5} size={20} />
                        </div>
                    </div>
                    <span className={styles.Label}>Password</span>
                    <div className={styles.NameInput}>
                        <input type="password" placeholder={"****"} />
                        <div className={styles.icon}>
                            <IconAsterisk stroke={0.5} size={20} />
                        </div>
                    </div>
                    <a href="#" className={styles.forgot}>Forgot Password?</a>
                    <button className={styles.loginButton}>
                        {/* <IconX size={16} stroke={3} /> */}
                        <span>Login</span>
                    </button>
                    <Divider text={"or"} />
                    <div className={styles.BtnGroup}>
                        <button className={styles.loginAnonButton}>
                            <IconSpy size={20} stroke={2} />
                            <span>Incognito Login</span>
                        </button>
                        <button className={styles.loginSocialButton} style={{ background: "#db4437" }}>
                            <IconBrandGoogle size={20} stroke={3} />
                        </button>
                        <button className={styles.loginSocialButton} style={{ background: "#fff" }}>
                            <IconBrandGithub color="#010409" size={20} stroke={2} />
                        </button>
                    </div>
                    <a href="#" className={styles.TOS}>Terms Of Service</a>
                </form>
            </div>
        </div>
    )
}

export default SignIn