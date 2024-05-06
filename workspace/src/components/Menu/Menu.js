import styles from "./Menu.module.css";

export function Menu() {
  return (
    <div className={styles.wrapper}>
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
    </div>
  );
}
