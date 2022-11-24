import { useContext } from "react"; // react
import { FaBars } from "react-icons/fa";
// context
import { SideMenuContext } from "../../../../../contexts/SideMenuContext";

function SMToggleBtn() {
  const { changeSideMenuStatus } = useContext(SideMenuContext);

  return (
    <FaBars
      className="bars-icon"
      onClick={() => {
        changeSideMenuStatus(true);
      }}
    />
  );
}

export default SMToggleBtn;
