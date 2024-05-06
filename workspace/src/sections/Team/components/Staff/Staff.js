import { useState, useEffect, useRef } from "react";
import { Employee } from "../Employee";
import { staff } from "./data";
import styles from "./Staff.module.css";
import { MobileView } from "react-device-detect";
import behance from "@assets/behance.svg";
import linkedin from "@assets/linkedin.svg";
import github from "@assets/github.svg";
import twitter from "@assets/twitter.svg";
import instagram from "@assets/instagram.svg";
import facebook from "@assets/facebook.svg";

export function Staff() {
  const [active, setActive] = useState(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, staff.length);
  }, [staff]);

  useEffect(() => {
    window.addEventListener("touchmove", handleCloseDescription);
    window.addEventListener("click", handleCloseDescription);

    return () => {
      window.removeEventListener("touchmove", handleCloseDescription);
      window.addEventListener("click", handleCloseDescription);
    };
  }, []);

  const handleClick = (index, e) => {
    e.stopPropagation();
    const rect = itemsRef.current[index].getBoundingClientRect();
    const topHeight = rect.top + rect.height;

    if (index === active) {
      setActive(null);
      return;
    }

    setActive(index);
    if (window.outerHeight - topHeight < 207) {
      const needToScrollTop = 207 - (window.outerHeight - topHeight);
      window.scrollTo({
        left: 0,
        top: window.pageYOffset + needToScrollTop,
        behavior: "smooth",
      });
    }
  };

  const handleCloseDescription = () => {
    setActive(null);
  };

  return (
    <div className={styles.wrapper}>
      {staff.map((employee, index) => (
        <div className={styles.employeeWrapper} key={employee.name}>
          <Employee
            key={employee.name}
            {...employee}
            handleClick={(e) => handleClick(index, e)}
            active={active === index}
            index={index}
            ref={(el) => (itemsRef.current[index] = el)}
          />
        </div>
      ))}
      {staff.map((employee, index) => {
        if (active !== index) {
          return null;
        }
        return (
          <MobileView>
            <div onClick={(e) => e.stopPropagation()}>
              <div className={styles.contactsMobile}>
                <p className={styles.mobileTitle}>{employee.name}</p>
                <p className={styles.mobilePosition}>{employee.position}</p>
                {employee.contacts && (
                  <ul className={styles.mobileContacts}>
                    {employee.contacts &&
                      employee.contacts.map((contact, index) => (
                        <li className={styles.mobileContact} key={index}>
                          {contact.type === "behance" && <a href={contact.link}><img src={behance} /></a>}
                          {contact.type === "linkedin" && (
                            <a href={contact.link}><img src={linkedin} /></a>
                          )}
                          {contact.type === "facebook" && (
                            <a href={contact.link}><img src={facebook} /></a>
                          )}
                          {contact.type === "github" && <img src={github} />}
                          {contact.type === "instagram" && (
                            <a href={contact.link}><img src={instagram} /></a>
                          )}
                          {contact.type === "twitter" && <a href={contact.link}><img src={twitter} /></a>}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>
          </MobileView>
        );
      })}
    </div>
  );
}
