import { Button } from "@components";
import { Logo } from "@components";
import styles from "./MobileMenu.module.css";
import React from 'react';

export const MobileMenu = React.forwardRef((props, ref) => {
  return (
    <div className={styles.wrapper} id="test1" ref={ref}>

      <div className={styles.logo}>
        <Logo />
      </div>

      <ul className={styles.menu}>
        <li>
          <a href="https://docs.tetu.io/">Docs</a>
        </li>
        <li>
          <a href="https://discord.gg/xs8VESN4yz">Discord</a>
        </li>
        <li>
          <a href="https://github.com/tetu-io">GitHub</a>
        </li>
        <li>
          <a href="https://twitter.com/tetu_io">Twitter</a>
        </li>
        <li>
          <a href="https://medium.com/@tetu.finance">Medium</a>
        </li>
      </ul>

      <div>
        <div className={styles.controls}>
          <a href="https://swap.tetu.io/#/swap?inputCurrency=0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174&outputCurrency=0x255707B70BF90aa112006E1b07B9AeA6De021424" className={styles.control}>
            Buy GAIA
          </a>
          <a href="https://app.tetu.io/" className={styles.control}>
            Enter App
          </a>
        </div>
      </div>
    </div>
  );
})
