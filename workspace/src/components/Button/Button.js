import styles from './Button.module.css';

export function Button({
    handleClick,
    text,
    children,
}) {
    return (
        <button onClick={handleClick} className={styles.button}>{text || children}</button>
    )
}