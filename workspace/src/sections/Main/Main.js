import { useState, useEffect } from "react";
import { Header, Bottom } from "./components";
import styles from "./Main.module.css";
import video from "./movie3.mp4";
import bg from "./bg.jpg";

export function Main() {
  const [showVideo, setShowVideo] = useState(false);

  function hadleLoaded() {
    setShowVideo(true);
    document.getElementById("mainVideo").play();
  }

  // useEffect(() => {
  //   setShowVideo(true);
  //   document.getElementById("mainVideo").play();
  // }, [])

  useEffect(() => {
    window.addEventListener("load", hadleLoaded);

    return () => {
      window.removeEventListener("load", hadleLoaded);
    }
    // window.onload = function() {
      // hadleLoaded()
    // }
  }, [hadleLoaded]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Header />
        <Bottom />
      </div>

      <video
        width="100%"
        height="100%"
        autoPlay
        loop
        muted
        playsInline={true}
        id="mainVideo"
        className={`${styles.video} ${showVideo ? styles.videoShown : ""}`}
        poster={bg}
      >
        <source src={video} type="video/mp4" />
      </video>

      <div className={styles.background} />
    </div>
  );
}
