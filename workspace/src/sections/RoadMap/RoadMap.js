import { useState, useEffect, useCallback } from "react";
import { Title, Three, SecondStage } from "./components";
import styles from "./RoadMap.module.css";

export function RoadMap({
  animateRoadmap,
  animateSecondStage,
  animateRoadmapEnd,
  animateSecondStageEnd,
  style,
}) {
  // three logic
  const [activeThree, setActiveThree] = useState(null);

  const handleClickThree = useCallback(
    (index, e) => {
      e.stopPropagation();
      if (activeThree === index) {
        setActiveThree(null);
      } else {
        setActiveThree(index);
      }
      
      setActiveSecondStage(null);
    },
    [setActiveThree, activeThree]
  );

  useEffect(() => {
    window.addEventListener("touchmove", handleCloseDescriptionThree);
    window.addEventListener("click", handleCloseDescriptionThree);

    return () => {
      window.removeEventListener("touchmove", handleCloseDescriptionThree);
      window.addEventListener("click", handleCloseDescriptionThree);
    };
  }, []);

  const handleCloseDescriptionThree = useCallback(() => {
    setActiveThree(null);
  }, [setActiveThree]);

  // second stage logic
  const [activeSecondStage, setActiveSecondStage] = useState(false);

  const handleClickSecondStage = (e) => {
    e.stopPropagation();
    if (activeSecondStage) {
      setActiveSecondStage(null);
    } else {
      setActiveSecondStage(true);
    }

    setActiveThree(null);
  };

  const handleCloseDescriptionSecondStage = () => {
    setActiveSecondStage(false);
  };

  useEffect(() => {
    window.addEventListener("touchmove", handleCloseDescriptionSecondStage);
    window.addEventListener("click", handleCloseDescriptionSecondStage);

    return () => {
      window.removeEventListener(
        "touchmove",
        handleCloseDescriptionSecondStage
      );
      window.addEventListener("click", handleCloseDescriptionSecondStage);
    };
  }, []);

  return (
    <div
      className={`${styles.wrapper} ${
        animateRoadmap ? styles.animateRoadmap : ""
      }`}
      style={style}
    >
      <div className="container" style={{ height: "100%" }}>
        <div className={styles.inner}>
          <Title animateRoadmap={animateRoadmap} />
          <Three
            animateRoadmap={animateRoadmap}
            animateSecondStage={animateSecondStage}
            animateRoadmapEnd={animateRoadmapEnd}
            animateSecondStageEnd={animateSecondStageEnd}

            active={activeThree}
            handleClick={handleClickThree}
            handleCloseDescription={handleCloseDescriptionThree}
          />
          <SecondStage
            active={activeSecondStage}
            handleClick={handleClickSecondStage}
            handleCloseDescription={handleCloseDescriptionSecondStage}
          />
        </div>
      </div>
    </div>
  );
}
