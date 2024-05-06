import styled from "./Promo.module.css";

export function Promo() {
  return (
    <div className={styled.wrapper}>
      <div className="container">
        <p><span>GAIA is audited</span> by DefiYield, PeckShield and CertiK</p>
      </div>
      <div className="container">
        <p className={styled.subtitle}>
          According to DeFi Safety, GAIA is one the <span style={{ marginRight: 5 }}>top 5 safest dApps</span> 
          on Polygon and one of the top 20 safest dApps in all of DeFi
        </p>
      </div>
    </div>
  );
}
