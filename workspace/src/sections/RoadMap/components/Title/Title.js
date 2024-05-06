import styles from './Title.module.css';

export function Title({ animateRoadmap }) {
    return <p className={`${styles.title} ${animateRoadmap ? styles.activeAnimate : ''}`}>Roadmap</p>;
}
