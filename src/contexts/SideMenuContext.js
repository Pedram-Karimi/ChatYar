import { createContext, useState } from "react";

export const SideMenuContext = createContext();

export function SideMenuProvider({ children }) {
  const [sideMenuStatus, setSideMenuStatus] = useState(false);
  function changeSideMenuStatus(prop) {
    setSideMenuStatus(prop);
  }
  return (
    <SideMenuContext.Provider value={{ sideMenuStatus, changeSideMenuStatus }}>
      {children}
    </SideMenuContext.Provider>
  );
}
