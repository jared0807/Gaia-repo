import { Title, Staff } from "./components";
import styles from "./Team.module.css";

export function Team() {
  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.inner}>
          <Title />
          <Staff />
        </div>
      </div>
    </div>
  );
}
