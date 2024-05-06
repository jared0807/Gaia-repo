import { useState } from "react";
import { Portal } from "@components";
import styles from "./Node.module.css";
import { CLASSES } from "./Three";
import { isDesktop, isMobile, MobileView } from "react-device-detect";

const Dot = ({ classes, className }) => {
  const classesString = (classes || []).join(" ");

  return (
    <span className={`${styles[className]} ${styles.dot} ${classesString}`} />
  );
};

const DotsByValue = ({ value }) => {
  switch (value) {
    case "GAIA": {
      return <Dot className={"tetuDot"} classes={[CLASSES.GAIA.start]} />;
    }
    case "Pawnshop": {
      return <Dot className={"pawnshopDot"} classes={[CLASSES.GAIA.end]} />;
    }
    case "DEX": {
      return (
        <>
          <Dot className={"dexIntoDot"} classes={[CLASSES.GAIA.end]} />
          <Dot className={"dexOutDot"} classes={[CLASSES.DEX.start]} />
        </>
      );
    }
    case "Multi-Asset DEX": {
      return <Dot className={"multiDexDot"} classes={[CLASSES.DEX.end]} />;
    }
    case "DEX LAUNCH(Q3)": {
      return (
        <>
          <Dot className={"yieldFarmingInDot"} classes={[CLASSES.GAIA.end]} />
          <Dot
            className={"yieldFarmingOutDot"}
            classes={[CLASSES.YIELD_FARMING.start]}
          />
        </>
      );
    }
    case "Testing Functions": {
      return (
        <Dot className={"foldingDot"} classes={[CLASSES.YIELD_FARMING.end]} />
      );
    }
    case "Multi Strategy": {
      return (
        <Dot
          className={"multiStrategyDot"}
          classes={[CLASSES.YIELD_FARMING.end]}
        />
      );
    }
    case "Meta Vault": {
      return (
        <Dot className={"metaVaultDot"} classes={[CLASSES.YIELD_FARMING.end]} />
      );
    }
    case "Cross-chain Strategy": {
      return (
        <Dot
          className={"crossChainDot"}
          classes={[CLASSES.YIELD_FARMING.end]}
        />
      );
    }
    case "Zap": {
      return (
        <>
          <Dot className={"zapDotIn"} classes={[CLASSES.GAIA.end]} />
          <Dot className={"zapDotOut"} classes={[CLASSES.ZAP.start]} />
        </>
      );
    }
    case "Multi-Zap": {
      return <Dot className={"multiZapDot"} classes={[CLASSES.ZAP.end]} />;
    }
    case "Lending": {
      return <Dot className={"lendingDot"} classes={[CLASSES.GAIA.end]} />;
    }
    default: {
      return null;
    }
  }
};

export function Node({
  active,
  value,
  description,
  handleClick,
  clicked,
  focused,
  isOneOfClicked,
  handleCloseDescription,
  onMouseEnter,
  onMouseLeave
}) {
  // const [isShownBg, setIsShownBg] = useState(false);

  // const onMouseEnter = () => {
  //   setIsShownBg(true);
  // };

  // const onMouseLeave = () => {
  //   setIsShownBg(false);
  // };
  // && ((!clicked && isMobile) || !c) 
  return (
    <div
      className={`${styles.bg} ${
        isOneOfClicked && ((!focused && isDesktop) || (!clicked && isMobile)) ? styles.opacity : ""
      }`}
    >
      <div className={styles.wrapper} onClick={(e) => handleClick(value, e)}>
        <div
          className={`${styles.circle} ${active ? styles.circleActive : ""}`}
          onMouseEnter={
            isDesktop &&
            function () {
              onMouseEnter(value);
            }
          }
          onMouseLeave={
            isDesktop &&
            function () {
              onMouseLeave(value);
            }
          }
        >
          <DotsByValue value={value} />
          <div className={styles.waves}></div>
        </div>
        <p className={styles.title}>{value}</p>
        {!isMobile && (
          <p className={`${styles.description}`}>
            <span>{value} -</span> <span>{description}</span>
          </p>
        )}

        <MobileView>
          {clicked && (
            <Portal onClick={(e) => e.stopPropagation()}>
              <div className={styles.descriptionMobileOverlay}>
                <p className={styles.descriptionMobile}>
                  <span>{value} -</span> <span>{description}</span>
                </p>
              </div>
            </Portal>
          )}
        </MobileView>
      </div>
    </div>
  );
}
