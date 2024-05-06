import { useState, useCallback } from "react";
import { Node } from "./Node";
import styles from "./Three.module.css";
import stylesAnimation from "./Animation.module.css";
import "./canvas.css";
import { useEffect } from "react";

export const CLASSES = {
  GAIA: {
    start: "GAIA-start",
    end: "GAIA-end",
  },
  PAWNSHOP: {
    start: "PAWNSHOP-start",
    end: "PAWNSHOP-end",
  },
  DEX: {
    start: "Dex-start",
    end: "Dex-end",
  },
  YIELD_FARMING: {
    start: "Yield-farming-start",
    end: "Yield-farming-end",
  },
  ZAP: {
    start: "Zap-start",
    end: "Zap-end",
  },
  LENDING: {
    start: "Lending-start",
    end: "Lending-end",
  },
};

export const mapDotsCoords = {
  Tetan: {
    active: true,
    value: "GAIA",
    description:
      "is the money lego asset management that provides automated DeFi solutions.",
  },

  Pawnshop: {
    active: false,
    value: "Pawnshop",
    description:
      "collateralize NFT and digital assets and borrow loans against it",
  },

  DEX: {
    active: true,
    value: "DEX",
    description:
      "TetanSwap will enable users access high yield liquidity pools, earn, trade at incredibly low fees. Assets from LP positions are automatically deposited into yield farming vaults achieving even greater gains.",
  },
  "Multi-Asset DEX": {
    active: false,
    value: "Multi-Asset DEX",
    description:
      "Liquidity providers can create customized liquidity pools containing multiple assets which can automatically rebalance to help manage your portfolio.",
  },

  "DEX LAUNCH(Q3)": {
    active: true,
    value: "DEX LAUNCH(Q3)",
    description:
      "earn incredibly higher gains while they diversify their Portfolio by depositing into a pool.",
  },
  Testing Functions: {
    active: true,
    value: "Testing Functions",
    description:
      "Maximize your yield by using folding strategies; by repeatedly supplying the underlying asset and borrowing it from a lending platform in a loop, GAIA provides optimal returns",
  },
  "Multi Strategy": {
    active: true,
    value: "Multi Strategy",
    description:
      "is a strategy that achieves high effectiveness, either through increased results, reduced risks or a combination of both through the integration of many different protocols.",
  },
  "Meta Vault": {
    active: false,
    value: "Meta Vault",
    description:
      "provide diversification, automatic rebalancing and great user convenience by combining the exposure of many vaults to a single deposited asset type.",
  },
  "Cross-chain Strategy": {
    active: false,
    value: "Cross-chain Strategy",
    description:
      "Gain exposure to different sources of earnings; GAIA automatically bridges and converts assets for you from the network that you started in.",
  },

  Zap: {
    active: true,
    value: "Zap",
    description:
      "a feature that allows you to automatically route funds to deposit or withdraw complex assets, like Tokens-pairs or multi-hopping transactions",
  },
  "Multi-Zap": {
    active: false,
    value: "Multi-Zap",
    description:
      "allows the user greater efficiency through a bridge integrated with zapping, making it easier to convert, deposit, or withdraw assets even in target vaults that are on different networks.",
  },

  Lending: {
    active: false,
    value: "Lending",
    description:
      "the lending platform will allow users to be remunerated for supply liquidity, and borrowers the possibility to obtain assets by depositing collateral.",
  },
};

export function Three({
  animateRoadmap,
  animateSecondStage,
  animateRoadmapEnd,
  animateSecondStageEnd,

  active,
  handleClick,
  handleCloseDescription,
}) {
  const draw = () => {
    const canvas = document.getElementById("canvasID");
    const wrapper = document.getElementById("wrapper");

    const rect = wrapper.getBoundingClientRect();

    const ctx = canvas.getContext("2d");

    ctx.canvas.width = wrapper.offsetWidth;
    ctx.canvas.height = wrapper.offsetHeight;

    Object.keys(CLASSES).forEach((cl) => {
      const $start = document.querySelector(`.${CLASSES[cl].start}`);
      const $ends = document.querySelectorAll(`.${CLASSES[cl].end}`);

      if (!$start || !$ends) {
        return null;
      }

      const startRect = $start.getBoundingClientRect();
      const dotWidth = Math.floor(startRect.width / 2);
      console.log("dotWidth", dotWidth);

      [].forEach.call($ends, function (end) {
        const endRect = end.getBoundingClientRect();

        let xStart = startRect.x - rect.x;
        let yStart = startRect.y - rect.y;

        let xEnd = endRect.x - rect.x;
        let yEnd = endRect.y - rect.y;

        var grad = ctx.createLinearGradient(
          xStart + endRect.width / 2,
          yStart + endRect.width / 2,
          xEnd + endRect.width / 2,
          yEnd + endRect.width / 2
        );
        grad.addColorStop(0, "transparent");
        grad.addColorStop(1, "#3A6EE8");

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(xStart + dotWidth, yStart + dotWidth);
        ctx.lineTo(xEnd + dotWidth, yEnd + dotWidth);
        ctx.strokeStyle = "#3A6EE8";
        ctx.strokeStyle = grad;
        ctx.stroke();
      });
    });
  };

  useEffect(() => {
    window.addEventListener("load", draw);

    return () => {
      window.removeEventListener("load", draw);
    }
  }, [draw]);

  const handleResize = () => {
    draw();
  };

  const [focused, setFocused] = useState(false);

  const onMouseEnter = (value) => {
    setFocused(value);
  };

  const onMouseLeave = () => {
    setFocused(null);
  };

  useEffect(() => {
    draw();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [draw]);

  return (
    <div className={`${styles.three}`} id="wrapper">
      {/* add class only on first animation */}
      <div className={`${styles.node} ${styles.nodeRoot}`}>
        <Node
          {...mapDotsCoords["Tetan"]}
          clicked={active === mapDotsCoords["Tetan"].value}
          focused={focused === mapDotsCoords["Tetan"].value}
          isOneOfClicked={active || focused}
          handleClick={handleClick}
          handleCloseDescription={handleCloseDescription}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
        {animateRoadmap && (
          <>
            <div className={stylesAnimation.borderAnimation}></div>
            <div
              className={`${stylesAnimation.mainAnimation} ${
                animateRoadmapEnd ? stylesAnimation.mainAnimationEnd : ""
              }`}
            >
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div
              className={`${stylesAnimation.mainSecondAnimation} ${
                animateSecondStage ? stylesAnimation.activeSecondAnimation : ""
              } ${
                animateSecondStageEnd
                  ? stylesAnimation.mainSecondAnimationEnd
                  : ""
              }`}
            >
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </>
        )}
      </div>

      <div
        className={styles.row}
        style={animateSecondStageEnd ? { zIndex: 3 } : {}}
      >
        <div className={`${styles.node} ${styles.nodeLeft}`}>
          <Node
            {...mapDotsCoords["Pawnshop"]}
            clicked={active === mapDotsCoords["Pawnshop"].value}
            focused={focused === mapDotsCoords["Pawnshop"].value}
            isOneOfClicked={active || focused}
            handleClick={handleClick}
            handleCloseDescription={handleCloseDescription}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        </div>
        <div className={`${styles.node} pt-50 ${styles.dex}`}>
          <Node
            {...mapDotsCoords["DEX"]}
            clicked={active === mapDotsCoords["DEX"].value}
            focused={focused === mapDotsCoords["DEX"].value}
            isOneOfClicked={active || focused}
            handleClick={handleClick}
            handleCloseDescription={handleCloseDescription}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />

          <div className={styles.children}>
            <Node
              {...mapDotsCoords["Multi-Asset DEX"]}
              clicked={active === mapDotsCoords["Multi-Asset DEX"].value}
              focused={focused === mapDotsCoords["Multi-Asset DEX"].value}
              isOneOfClicked={active || focused}
              handleClick={handleClick}
              handleCloseDescription={handleCloseDescription}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            />
          </div>
        </div>

        <div className={`${styles.node} ${styles.nodeMiddle}`}>
          <Node
            {...mapDotsCoords["DEX LAUNCH(Q3)"]}
            clicked={active === mapDotsCoords["DEX LAUNCH(Q3)"].value}
            focused={focused === mapDotsCoords["DEX LAUNCH(Q3)"].value}
            isOneOfClicked={active || focused}
            handleClick={handleClick}
            handleCloseDescription={handleCloseDescription}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />

          <div className={`${styles.children} pt-30`}>
            <div className={styles.node}>
              <Node
                {...mapDotsCoords["Testing Functions"]}
                clicked={active === mapDotsCoords["Testing Functions"].value}
                focused={focused === mapDotsCoords["Testing Functions"].value}
                isOneOfClicked={active || focused}
                handleClick={handleClick}
                handleCloseDescription={handleCloseDescription}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              />
            </div>
            <div className={`${styles.node} pt-50`}>
              <Node
                {...mapDotsCoords["Multi Strategy"]}
                clicked={active === mapDotsCoords["Multi Strategy"].value}
                focused={focused === mapDotsCoords["Multi Strategy"].value}
                isOneOfClicked={active || focused}
                handleClick={handleClick}
                handleCloseDescription={handleCloseDescription}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              />
            </div>
            <div className={`${styles.node} pt-50`}>
              <Node
                {...mapDotsCoords["Meta Vault"]}
                clicked={active === mapDotsCoords["Meta Vault"].value}
                focused={focused === mapDotsCoords["Meta Vault"].value}
                isOneOfClicked={active || focused}
                handleClick={handleClick}
                handleCloseDescription={handleCloseDescription}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              />
            </div>
            <div className={styles.node}>
              <Node
                {...mapDotsCoords["Cross-chain Strategy"]}
                clicked={active === mapDotsCoords["Cross-chain Strategy"].value}
                focused={focused === mapDotsCoords["Cross-chain Strategy"].value}
                isOneOfClicked={active || focused}
                handleClick={handleClick}
                handleCloseDescription={handleCloseDescription}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              />
            </div>
          </div>
        </div>

        <div className={`${styles.node} pt-50 ${styles.zap}`}>
          <Node
            {...mapDotsCoords["Zap"]}
            clicked={active === mapDotsCoords["Zap"].value}
            focused={focused === mapDotsCoords["Zap"].value}
            isOneOfClicked={active || focused}
            handleClick={handleClick}
            handleCloseDescription={handleCloseDescription}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />

          <div className={styles.children}>
            <Node
              {...mapDotsCoords["Multi-Zap"]}
              clicked={active === mapDotsCoords["Multi-Zap"].value}
              focused={focused === mapDotsCoords["Multi-Zap"].value}
              isOneOfClicked={active || focused}
              handleClick={handleClick}
              handleCloseDescription={handleCloseDescription}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            />
          </div>
        </div>
        <div className={styles.node}>
          <Node
            {...mapDotsCoords["Lending"]}
            clicked={active === mapDotsCoords["Lending"].value}
            focused={focused === mapDotsCoords["Lending"].value}
            isOneOfClicked={active || focused}
            handleClick={handleClick}
            handleCloseDescription={handleCloseDescription}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        </div>
      </div>

      <canvas id="canvasID" style={active || focused ? {opacity: 0.5} : {}}/>
    </div>
  );
}
