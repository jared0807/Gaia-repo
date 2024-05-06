import { Headline } from '../';
import { ScrollDown } from '@components';
import styles from './Bottom.module.css';

export function Bottom() {
    return (
        <div className={styles.wrapper}>
            <div className="container">
                <div className={styles.row}>
                    <Headline />
                    <ScrollDown />
                </div>
            </div>
        </div>
    )
}