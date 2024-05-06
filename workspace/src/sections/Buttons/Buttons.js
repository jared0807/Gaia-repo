import styles from "./Buttons.module.css";

export function Buttons() {
  return (
    <div className={styles.wrapper}>
      <div className="container">
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
}
