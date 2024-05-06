import logo from './logo.svg';
import styles from './Logo.module.css';

export function Logo() {
    return <img src={logo} className={styles.logo} />
}