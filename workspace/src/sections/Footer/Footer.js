import { Logo } from "@components";
import { Menu, Tags } from "./components";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.row}>
          <div className={styles.left}>
            <Logo />
            <p className={styles.description}>All Rights Reserved ⓒ 2024</p>
          </div>

          <div className={styles.middle}>
            <Menu />
          </div>

          <div className={styles.right}>
            <Tags />
          </div>
        </div>
      </div>
    </div>
  );
}
