import { useContext } from "react"; // react-hooks

import "./sideMenu.css"; // styles

import { Link } from "react-router-dom"; // react-router

// contexts

import { SideMenuContext } from "../../contexts/SideMenuContext";

// icons

import { MdGroup } from "react-icons/md";
import { MdCampaign } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { MdMenuBook } from "react-icons/md";
import { MdCall } from "react-icons/md";
import { MdBookmark } from "react-icons/md";
import { useUserAuth } from "../../contexts/UserAuthCtx";

function SideMenu() {
  // variables ---

  // contexts ---

  const { sideMenuStatus, changeSideMenuStatus } = useContext(SideMenuContext);
  const { userDataState, logOut } = useUserAuth();

  // logout ---

  const logOutAccount = async () => {
    await logOut();
  };

  // close side menu ---

  const disableSideMenu = () => {
    changeSideMenuStatus(false);
  };
  //
  return (
    <>
      <div
        className="pageWrapper"
        onClick={disableSideMenu}
        style={{ display: `${!sideMenuStatus ? "none" : ""}` }}
      ></div>
      <div className={sideMenuStatus ? "sideMenu" : "sideMenu sideMenu-leave"}>
        <div className="sideMenu-header">
          <img src={userDataState?.userProfile || "../images/avatar.jpg"} />
          <div>
            <p>{userDataState?.userName}</p>
            <button onClick={logOutAccount}>log out</button>
          </div>
        </div>
        <div className="side-menu-content">
          {/* profile */}
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <div className="side-menu-item">
              <span>
                <MdPerson size={"25px"} />
              </span>
              <p>Account</p>
            </div>
          </Link>
          {/* new group */}
          <div className="side-menu-item">
            <span>
              <MdGroup size={"25px"} />
            </span>
            <p>New group</p>
          </div>
          {/* new channel */}
          <div className="side-menu-item">
            <span>
              <MdCampaign size={"25px"} />
            </span>
            <p>New channel</p>
          </div>
          {/* new contact */}
          <div className="side-menu-item">
            <span>
              <MdMenuBook size={"25px"} />
            </span>
            <p>Marked peaple</p>
          </div>
          {/* new contact */}
          <div className="side-menu-item">
            <span>
              <MdCall size={"25px"} />
            </span>
            <p>Calls</p>
          </div>
          {/* saved messages */}
          <div className="side-menu-item">
            <span>
              <MdBookmark size={"25px"} />
            </span>
            <p>Saved messages</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideMenu;
