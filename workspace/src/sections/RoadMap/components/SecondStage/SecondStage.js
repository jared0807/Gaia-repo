import { useState, useEffect } from "react";
import { Portal } from "@components";
import { isMobile, MobileView } from "react-device-detect";
import styles from "./SecondStage.module.css";

export function SecondStage({ handleClick, handleCloseDescription, active }) {
  return (
    <div className={styles.relativeContainer}>
      <div className={styles.wrapper} onClick={handleClick}>
        <div className={styles.inner}>
          <p className={styles.title}>Second Stage</p>
        </div>
        {!isMobile && (
          <p className={styles.description}>
            <span>Second Stage - </span>
            <span>
              GAIA’s next goal is to combine DeFi with real-world assets. The
              GAIA investment fund is a very unique approach to combine DeFi
              with investments in real world assets like real estate or natural
              resources. The GAIA protocol structure is built in a way to
              provide exposure to the real world economy. Stay tuned!
            </span>
          </p>
        )}
        <MobileView>
          {active && (
            <Portal>
              <div
                className={styles.descriptionMobileOverlay}
                onClick={handleCloseDescription}
              >
                <p className={styles.descriptionMobile}>
                  <span>Second Stage - </span>
                  <span>
                    GAIA’s next goal is to combine DeFi with real-world assets.
                    The GAIA investment fund is a very unique approach to
                    combine DeFi with investments in real world assets like real
                    estate or natural resources. The GAIA protocol structure is
                    built in a way to provide exposure to the real world
                    economy. Stay tuned!
                  </span>
                </p>
              </div>
            </Portal>
          )}
        </MobileView>
      </div>
    </div>
  );
}
