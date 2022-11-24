import { createContext, useContext, useEffect, useState } from "react";

// firebase

import { db } from "../FirebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  doc,
  serverTimestamp,
  getDoc,
  arrayUnion,
  setDoc,
  getDocs,
} from "firebase/firestore";

// contexts
import { useSelectedUser } from "./SelectedUserCtx";
import { useUserAuth } from "./UserAuthCtx";

const AddTextCtx = createContext();

export const AddTextProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [messSent, setMessSent] = useState(false);

  // contexts
  const { selected } = useSelectedUser();
  const { userDataState } = useUserAuth();

  const changeMessage = (text) => {
    setMessSent(!messSent);
    setMessage(text);
  };

  useEffect(() => {
    if (selected && message.length !== "") {
      const roomsRef = collection(db, "rooms");
      const q = query(
        roomsRef,
        where("messengers", "in", [
          `${selected?.id}%${userDataState.user.uid}`,
          `${userDataState.user.uid}%${selected?.id}`,
        ])
      );
      const postMessage = async () => {
        const getRooms = await getDocs(q).then(async (coll) => {
          if (coll.docs[0]?.id) {
            const messDoc = await addDoc(
              collection(db, "rooms", coll.docs[0].id, "chats"),
              {
                mess: message,
                messInfo: arrayUnion(userDataState.user.uid, selected.id),
                createdAt: serverTimestamp(),
              }
            );
          } else {
            const messColl = await addDoc(collection(db, "rooms"), {
              messengers: `${userDataState.user.uid}%${selected?.id}`,
              messengersArr: arrayUnion(userDataState.user.uid, selected.id),
            }).then(async (doc) => {
              const messDoc = await addDoc(
                collection(db, "rooms", doc.id, "chats"),
                {
                  mess: message,
                  messInfo: arrayUnion(userDataState.user.uid, selected.id),
                  createdAt: serverTimestamp(),
                }
              );
            });
          }
        });
      };
      postMessage();
    }
  }, [messSent]);
  return (
    <AddTextCtx.Provider value={{ message, changeMessage, messSent }}>
      {children}
    </AddTextCtx.Provider>
  );
};

export function useAddText() {
  return useContext(AddTextCtx);
}
