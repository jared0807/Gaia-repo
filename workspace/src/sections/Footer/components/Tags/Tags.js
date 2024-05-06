import styles from './Tags.module.css';

export function Tags() {
    return (
        <ul className={styles.tags}>
            <li><a href="https://nomics.com/assets/tetu-tetu-reward-token">Nomics</a></li>
            <li><a href="https://tin.network/en/home">Tin.</a></li>
            <li><a href="https://coinmarketcap.com/currencies/tetu/">Coinmarketcap</a></li>
            <li><a href="https://www.coingecko.com/en/coins/tetu">CoinGecko</a></li>
            <li><a href="https://dex.guru/token/0x255707b70bf90aa112006e1b07b9aea6de021424-polygon">DexGuru</a></li>
        </ul>
    )
}