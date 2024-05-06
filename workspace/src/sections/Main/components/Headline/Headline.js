import styles from "./Headline.module.css";

export function Headline() {
  return (
    <div className={styles.headline}>
      <h1 className={styles.h1}>
        <span>
          <span>ASSET</span>
        </span>
        <span>
          <span>management</span>
        </span>
        <span>
          <span>system</span>
        </span>
      </h1>
      <p className={styles.description}>
        <span>GAIA is the money lego asset management </span>
        <span>that provides automated DeFi solutions. </span>
        <span>With GAIA, users can unlock the web3 finance</span>
      </p>
    </div>
  );
}
