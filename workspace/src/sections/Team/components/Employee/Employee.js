import styles from "./Employee.module.css";
import behance from "@assets/behance.svg";
import linkedin from "@assets/linkedin.svg";
import github from "@assets/github.svg";
import twitter from "@assets/twitter.svg";
import instagram from "@assets/instagram.svg";
import facebook from "@assets/facebook.svg";
import { BrowserView } from "react-device-detect";
import React from "react";

export const Employee = React.forwardRef((props, ref) => {
  const {
    name,
    position,
    image,
    imageBg,
    contacts,
    handleClick,
    id,
    active,
    index,
  } = props;

  return (
    <>
      <div
        className={styles.wrapper}
        
        id={`${id || name} person-wrapper-${index}`}
        ref={ref}
      >
        <div className={styles.imageWrapper} onClick={handleClick}>
          <img className={styles.img} src={image} />
          <img className={styles.imgBg} src={imageBg} />
        </div>

        <div className={styles.body} onClick={handleClick}>
          <p className={`${styles.title} ${active ? styles.titleActive : ""}`}>
            {name}
          </p>
          <p className={styles.position}>{position}</p>
          {contacts && (
            <BrowserView>
              <ul className={styles.contacts}>
                {contacts.map((contact, index) => (
                  <li className={styles.contact} key={index}>
                    {contact.type === "behance" && <a href={contact.link}><img src={behance} /></a>}
                    {contact.type === "linkedin" && <a href={contact.link}><img src={linkedin} /></a>}
                    {contact.type === "github" && <a href={contact.link}><img src={github} /></a>}
                    {contact.type === "facebook" && <a href={contact.link}><img src={facebook} /></a>}
                    {contact.type === "instagram" && <a href={contact.link}><img src={instagram} /></a>}
                    {contact.type === "twitter" && <a href={contact.link}><img src={twitter} /></a>}
                  </li>
                ))}
              </ul>
            </BrowserView>
          )}
        </div>
      </div>
    </>
  );
});
