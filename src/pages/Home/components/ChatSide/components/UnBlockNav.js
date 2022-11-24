import React from "react";
import { doc, arrayUnion, setDoc, arrayRemove } from "firebase/firestore";
import { db } from "../../../Firebase/FirebaseConfig";
import { useUserAuth } from "../../../contexts/UserAuthContext";
import { useSelectedUser } from "../../../contexts/SelectedUserContext";
function UnBlockNav() {
  const { selected } = useSelectedUser();
  const { user, blockedUser } = useUserAuth();
  const unBlock = () => {
    if (selected && user) {
      const blocksRef = doc(db, "blocked-users", user.uid);
      setDoc(
        blocksRef,
        {
          blockedPeaple: blockedUser.includes(selected.id)
            ? arrayRemove(selected.id)
            : arrayUnion(selected.id),
        },
        { merge: true }
      );
    }
  };
  return (
    <div className="un-block-nav" onClick={unBlock}>
      Un block user
    </div>
  );
}

export default UnBlockNav;
