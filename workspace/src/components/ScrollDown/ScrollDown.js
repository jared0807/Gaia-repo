import mouse from './mouse.png';
import styles from './ScrollDown.module.css';

export function ScrollDown() {
    return (
        <div className={styles.wrapper}>
            <span>Scroll down</span>
            <img src={mouse} />
        </div>
    )
}
