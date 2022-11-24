import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../FirebaseConfig";
import { MdPerson, MdAddCircle } from "react-icons/md";
import { doc, setDoc } from "firebase/firestore";
import "./account.css";
import { useUserAuth } from "../../contexts/UserAuthCtx";
function Account() {
  //
  const [imageUpload, setImageUpload] = useState();
  const [profileImage, setProfileImage] = useState(null);
  const [updateCheck, setUpdateCheck] = useState(false);
  const { userDataState } = useUserAuth();
  const [bio, setBio] = useState("");
  const [currBio, setCurrBio] = useState(userDataState.bio);

  // uploading proflie pic -----

  useEffect(() => {
    if (imageUpload && userDataState.user) {
      const imageRef = ref(
        storage,
        `${userDataState.user?.uid + "_profilePic"}/img`
      );
      uploadBytes(imageRef, imageUpload).then(() => {
        setUpdateCheck(true);
      });
    }
  }, [imageUpload, userDataState.user]);

  // downloading profile pic -----

  useEffect(() => {
    if (userDataState.user && !userDataState?.userProfile) {
      const imgListRef = ref(
        storage,
        `${userDataState.user.uid + "_profilePic"}/`
      );
      listAll(imgListRef).then((response) => {
        getDownloadURL(response.items[0]).then((url) => {
          setProfileImage(url);
          setUpdateCheck(false);
        });
      });
    }
  }, [updateCheck, userDataState.user]);

  // updating user profile pic -----

  useEffect(() => {
    if (userDataState.user && profileImage) {
      const userRef = doc(db, "users", userDataState.user.uid);
      const setProfilePic = async () => {
        await setDoc(
          userRef,
          {
            userProfile: profileImage,
          },
          { merge: true }
        );
      };
      setProfilePic();
    }
  }, [profileImage, userDataState.user, updateCheck]);

  // set current bio -----

  useEffect(() => {
    if (userDataState) setBio(userDataState.bio);
  }, [userDataState]);

  // submit bio change to db -----

  const handleBioChange = async () => {
    const userRef = doc(db, "users", userDataState.user.uid);
    await setDoc(
      userRef,
      {
        bio: bio,
      },
      { merge: true }
    );
    setCurrBio(bio);
  };

  //
  return (
    <div className="account">
      <div className="account-body">
        <Link to="/" style={{ textDecoration: "none" }}>
          <p className="account-go-back">Go back</p>
        </Link>
        <div
          className="change-profile-pic-div"
          style={{ background: `url(${userDataState?.userProfile})` }}
        >
          <label htmlFor="inputTag-avatar" className="inputTag-avatar">
            <input
              type="file"
              id="inputTag-avatar"
              className="choose-file"
              onChange={(e) => {
                setImageUpload(e.target.files[0]);
              }}
            />
          </label>
        </div>
        <div className="account-header-info-container">
          <p className="account-header-name">{userDataState?.userName}</p>
          <div>
            <input
              className="bio-input"
              placeholder="Bio"
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
            <span>70</span>
          </div>
          {bio !== currBio && (
            <button onClick={handleBioChange}>Submit changes</button>
          )}
        </div>
        <div className="account-data-wraper">
          <div className="account-data-item">
            <div>
              <MdPerson className="account-data-icon" />
              <p>name</p>
            </div>
            <p className="account-name">{userDataState?.userName}</p>
          </div>
          <div className="account-data-item">
            <div>
              <MdAddCircle className="account-data-icon" />
              <p>Email</p>
            </div>
            <p className="account-name">{userDataState?.user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
