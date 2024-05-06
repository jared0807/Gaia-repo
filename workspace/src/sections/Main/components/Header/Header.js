import { useEffect, useState, useRef } from "react";
import { Logo, Menu, Button } from "@components";
import { MobileMenu } from "../../../../components/MobileMenu/MobileMenu";
import styles from "./Header.module.css";

export function Header() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const ref = useRef()

  function preventScroll(e){
    console.log('e', e);
    e.preventDefault();
    e.stopPropagation();

    return false;
  }

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    console.log('ref', ref.current);
    ref.current.addEventListener('wheel', preventScroll);
    ref.current.addEventListener('touchmove', preventScroll);

    return () => {
      if (!ref.current) {
        return;
      }

      ref.current.addEventListener('wheel', preventScroll);
      ref.current.addEventListener('touchmove', preventScroll);
    }
  }, [ref, isMenuVisible])

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div className="container">
      <div className={styles.headline}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <Menu />
        <a className={styles.button} href="https://app.tetu.io/">
          <Button text="Enter App" onClick={() => null} />
        </a>
        <div
          className={`${styles.menuButton} ${
            isMenuVisible ? styles.menuButtonActive : ""
          }`}
          onClick={toggleMenu}
          onTouchStart={preventScroll}
        >
          <span></span>
        </div>
      </div>
      {isMenuVisible && <MobileMenu ref={ref} />}
    </div>
  );
}
