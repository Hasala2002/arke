import React from 'react'
import Linkify from "react-linkify";
import * as styles from "./styles/SettingsComponent.module.scss"

const Help = () => {

  const hrefDecorator = (href, text, key) => (
    <a href={href} key={key} target="_blank" className={styles.urlDecor}>
      {text}
    </a>);

  return (
    <div className={styles.SettingsContainer}>
      <h2>Help</h2>

      <h3>Information</h3>
      <span><Linkify componentDecorator={hrefDecorator}>Visit https://arkechat.live to learn more about Arke Chat</Linkify></span>

      <h3 style={{ marginTop: 20 }}>Development and Contribution</h3>
      <span><Linkify componentDecorator={hrefDecorator}>• https://github.com/Hasala2002/arke</Linkify></span><br />
      <span><Linkify componentDecorator={hrefDecorator}>• https://github.com/Hasala2002/arke-backend</Linkify></span><br />
      <span><Linkify componentDecorator={hrefDecorator}>• https://github.com/Hasala2002/arke-landing</Linkify></span>
    </div>
  )
}

export default Help