import styles from "./Partners.module.css";
import { partners } from "./data";

export function Partners() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        {Object.keys(partners).map((partner, index) => (
          <div className={styles.column} key={index}>
            <img src={partners[partner]} />
            <p>{partner}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
