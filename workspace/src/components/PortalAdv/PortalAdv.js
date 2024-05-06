import { useEffect } from "react";
import { createPortal } from "react-dom";

export const PortalAdv = ({ children }) => {
  const mount = document.getElementById("adv-portal");
  const el = document.createElement("div");

  useEffect(() => {
    mount.appendChild(el);
    return () => mount.removeChild(el);
  }, [el, mount]);

  return createPortal(children, el);
};
