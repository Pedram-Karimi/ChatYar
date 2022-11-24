import { createContext, useContext, useState } from "react";
const SelectedUserCtx = createContext();

export const SelectedUserProvider = ({ children }) => {
  const [selected, setSelected] = useState();
  function changeSelected(user) {
    setSelected(user);
  }
  return (
    <SelectedUserCtx.Provider value={{ selected, changeSelected }}>
      {children}
    </SelectedUserCtx.Provider>
  );
};

export function useSelectedUser() {
  return useContext(SelectedUserCtx);
}
