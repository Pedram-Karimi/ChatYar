import { useState } from "react"; // react

import { Link } from "react-router-dom"; // react-router

// icons
import { MdMoreVert } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";

import "./chatHeader.css"; // styles

// firebase

import { writeBatch, collection, getDocs, doc } from "firebase/firestore";
import { db } from "../../../../../FirebaseConfig";
import { useSelectedUser } from "../../../../../contexts/SelectedUserCtx";

function ChatHeader(props) {
  const [headerMenuStatus, setHeaderMenuStatus] = useState(false);
  const { changeSelected } = useSelectedUser();
  const toggleHeaderMenu = () => {
    setHeaderMenuStatus(!headerMenuStatus);
  };
  window.addEventListener("click", (e) => {
    if (
      !e.target.classList.contains("show") &&
      !e.target.classList.contains("header-menu-icon")
    ) {
      setHeaderMenuStatus(false);
    }
  });

  const deleteChat = async () => {
    const chatsRef = collection(db, "rooms", props.chatRoomId, "chats");
    const batch = writeBatch(db);
    const chatDocs = await getDocs(chatsRef);
    chatDocs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  };
  const deleteRoom = async () => {
    const chatRoomRef = doc(db, "rooms", props.chatRoomId);
    const batch = writeBatch(db);
    batch.delete(chatRoomRef);
    await batch.commit();
  };
  // console.log(props.chatRoomId);
  //
  return (
    <div className="chatHeader">
      <MdArrowBack
        className="chat-arrow-back"
        onClick={() => {
          changeSelected(null);
        }}
      />
      <Link to={`/chatyar/profile/${props.id}`} className="link">
        <p className="chat-header-username">{props.userName}</p>
      </Link>
      <MdMoreVert className="header-menu-icon" onClick={toggleHeaderMenu} />
      <div className={`chat-header-menu ${headerMenuStatus && "show"}`}>
        <p
          onClick={() => {
            deleteChat();
            deleteRoom();
          }}
        >
          Delete chat
        </p>
      </div>
    </div>
  );
}
export default ChatHeader;
