import { useState, useRef, useEffect, useCallback } from "react";
import {
  Main,
  Promo,
  Adv,
  RoadMap,
  Partners,
  Team,
  Buttons,
  Footer,
} from "@sections";
import { FullPage, Slide } from "./fp";
import styles from "./App.module.css";
import "./animation.css";
import adv1 from "@sections/Adv/bg-1.jpg";
import adv2 from "@sections/Adv/dex.jpg";
import adv3 from "@sections/Adv/bg-2.jpg";
import styled from "@sections/Adv/Adv.module.css";
import { isMobile } from "react-device-detect";

function showAnimation() {
  const div = document.createElement("div");
  const div2 = document.createElement("div");
  const div3 = document.createElement("div");
  const div4 = document.createElement("div");
  div.appendChild(div2);
  div.appendChild(div3);
  div.appendChild(div4);
  div.classList.add("showPromo");
  document.body.append(div);
}

var height = window.innerHeight + "px";

export function App() {
  const ref = useRef();
  const [scrollMode, setScrollMode] = useState("full-page");
  const [scrollingParams, setScrollingParams] = useState({});
  // console.log("scrolling", scrollingParams);
  console.log("scrollMode", scrollMode);

  function handleHeightChange() {
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    height = window.innerHeight + "px";
  }

  useEffect(() => {
    // https://denis-creative.com/zadaem-razmer-100vh-bez-prokrutki-dlya-mobilnyh-ustrojstv/
    handleHeightChange();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (isMobile) {
            setScrollMode("full-page");
          }

          // document.body.classList.add('hidden');
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.01,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
  }, [ref, setScrollMode]);

  const [animateRoadmap, setAnimateRoadmap] = useState(false);
  const [animateRoadmapEnd, setAnimateRoadmapEnd] = useState(false);
  const [animateSecondStage, setAnimateSecondStage] = useState(false);
  const [animateSecondStageEnd, setAnimateSecondStageEnd] = useState(false);

  const handleBeforeChange = useCallback(
    (params) => {
      // console.log('before', params);
      setScrollingParams({
        ...params,
        isScrolling: true,
      });
      if (params.from === 0 && params.to === 1) {
        showAnimation();
      }
      if (params.to === 5) {
        if (animateRoadmap) {
          return;
        }
        setAnimateRoadmap(true);
        setTimeout(() => {
          setAnimateSecondStage(true);
          setAnimateRoadmapEnd(true);
          setTimeout(() => {
            setAnimateSecondStageEnd(true);
          }, 1700);
        }, 1700);
      }
    },
    [
      setScrollingParams,
      animateRoadmap,
      setAnimateRoadmap,
      setAnimateRoadmapEnd,
      setAnimateSecondStage,
      setAnimateSecondStageEnd,
    ]
  );

  const handleAfterChange = useCallback(
    (params) => {
      // console.log('after', params);
      setScrollingParams({
        ...params,
        isScrolling: false,
      });
      if (params.from === 0 && params.to === 1) {
        const div = document.querySelector(".showPromo");
        div.remove();
      }
      if (params.to === 5) {
        // document.body.classList.remove('hidden');
        setScrollMode("normal");
      }
    },
    [setScrollingParams]
  );

  // const isShowFixedText =
  //   (scrollingParams.to === 2 &&
  //     scrollingParams.from === 1 &&
  //     scrollingParams.isScrolling === false) ||
  //   (scrollingParams.to === 2 && scrollingParams.from === 3) ||
  //   scrollingParams.to === 3 ||
  //   (scrollingParams.to === 4 && scrollingParams.from === 3) ||
  //   (scrollingParams.from === 5 && scrollingParams.isScrolling === false);

  const isShowFixedText =
    scrollingParams.isScrolling === true &&
    ((scrollingParams.from === 2 && scrollingParams.to === 3) ||
      (scrollingParams.from === 3 && scrollingParams.to === 4) ||
      (scrollingParams.from === 4 && scrollingParams.to === 3) ||
      (scrollingParams.from === 3 && scrollingParams.to === 2));

  const isShowDefaultText =
    (scrollingParams.to === 2 &&
      scrollingParams.from === 1 &&
      scrollingParams.isScrolling === true) ||
    (scrollingParams.from === 2 && scrollingParams.to === 1) ||
    (scrollingParams.from === 4 &&
      scrollingParams.to === 5 &&
      scrollingParams.isScrolling === true) ||
    (scrollingParams.from === 5 &&
      scrollingParams.to === 4 &&
      scrollingParams.isScrolling === true) ||
    scrollingParams.isScrolling === false;

  // const isShowDefaultText =
  //   scrollingParams.isScrolling === false

  const slideShow =
    (scrollingParams.from === 0 && !scrollingParams.isScrolling) ||
    scrollingParams.from === 2 ||
    scrollingParams.from === 1 ||
    scrollingParams.to === 0;

  return (
    <div>
      <FullPage
        scrollMode={scrollMode}
        beforeChange={handleBeforeChange}
        afterChange={handleAfterChange}
        duration={600}
        animateRoadmapEnd={animateRoadmapEnd}
        setScrollMode={setScrollMode}
      >
        <Slide style={{ height }}>
          <div className={styles.slide}>
            <Main />
          </div>
        </Slide>
        <Slide style={{ height }}>
          <div
            className={`${styles.slide} ${styles.slidePromo} ${
              slideShow ? styles.slideShow : styles.slideHide
            }`}
          >
            <Promo />
          </div>
        </Slide>
        <Slide style={{ height }}>
          <div className={styles.slide}>
            <Adv
              image={adv1}
              title="Liquid Staking"
              description="Use your assets to earn a high & flexible yield"
              isShowDefaultText={isShowDefaultText}
            />
          </div>
        </Slide>
        <Slide style={{ height }}>
          <div className={styles.slide}>
            <Adv
              image={adv2}
              title="DEX"
              description="Decentralized Exchange with the lowest fees"
              right={true}
              isShowDefaultText={isShowDefaultText}
            />
          </div>
        </Slide>
        <Slide style={{ height }}>
          <div ref={ref} className={styles.slide}>
            <Adv
              image={adv3}
              title="PAWNSHOP"
              description="Borrow crypto using your NFT’s as collateral"
              isShowDefaultText={isShowDefaultText}
            />
          </div>
        </Slide>
        <Slide
          style={{ position: "relative", zIndex: 10 }}
          offHeightStyle={true}
        >
          <RoadMap
            animateRoadmap={animateRoadmap}
            animateSecondStage={animateSecondStage}
            animateRoadmapEnd={animateRoadmapEnd}
            animateSecondStageEnd={animateSecondStageEnd}
            style={{ minHeight: height }}
          />
          <Partners />
          <Team />
          <Buttons />
          <Footer />
        </Slide>
      </FullPage>

      {/* { && ( */}
      <div
        className={`${styled.fixedWrapper} ${
          isShowFixedText ? styled.shown : ""
        } `}
      >
        <div
          className={`${styled.scrollContainer} 
              ${scrollingParams.to === 2 ? styled.earn : ""} 
              ${scrollingParams.to === 3 ? styled.dex : ""} 
              ${scrollingParams.to === 4 ? styled.pawnshop : ""}`}
        >
          <div className={styled.fixedInner}>
            <p className={styled.title}>Liquid Staking</p>
            <p className={styled.description}>
              Use your assets to earn a high & flexible yield
            </p>
          </div>
          <div className={styled.fixedInner}>
            <p className={styled.title}>DEX</p>
            <p className={styled.description}>
              Decentralized Exchange with the lowest fees
            </p>
          </div>
          <div className={styled.fixedInner}>
            <p className={styled.title}>PAWNSHOP</p>
            <p className={styled.description}>Borrow crypto using your NFT’s as collateral</p>
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}
