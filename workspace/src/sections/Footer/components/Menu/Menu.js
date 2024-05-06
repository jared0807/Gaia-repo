import styles from './Menu.module.css';
import { menuGroups } from './data';

export function Menu() {
    return (
        <div className={styles.wrapper}>
            {menuGroups.map((menu, index) => (
                <div key={menu.title} className={`${styles.group}`}>
                    <p className={styles.title}>{menu.title}</p>
                    <ul className={styles.menu}>
                        {Object.keys(menu.items).map(key => (
                            <li key={key} className={styles.menuItem}>
                                <a href={menu.items[key]}>{key}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}