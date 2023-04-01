import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdPerson, MdAddCircle } from "react-icons/md";
import "./peopleProfile.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
function PeopleProfile() {
  const [userProfileAccount, setUserProfileAccount] = useState();
  const { id } = useParams();
  useEffect(() => {
    const userRef = doc(db, "users", id);
    const getData = async () => {
      const userData = await getDoc(userRef);
      setUserProfileAccount(userData.data());
    };
    getData();
  }, []);
  return (
    <div className="peaple-profile">
      <div className="peaple-profile-body">
        <Link to="/" style={{ textDecoration: "none" }}>
          <p className="account-go-back">Go back</p>
        </Link>
        <div
          className="peaple-profile-pic"
          style={{
            background: `url(${
              userProfileAccount?.userProfile ||
              "https://www.gravatar.com/avatar/b3568450826559f6ce26b424b8283279.jpg?size=240&d=https%3A%2F%2Fwww.artstation.com%2Fassets%2Fdefault_avatar.jpg"
            })`,
          }}
        ></div>
        <p className="peaple-profile-username">
          {userProfileAccount?.userName}
        </p>
        <p className="peaple-profile-bio">
          <span>Bio: </span>
          {userProfileAccount?.bio}
        </p>
        <div className="account-data-wraper">
          <div className="account-data-item">
            <div>
              <MdPerson className="account-data-icon" />
              <p>name</p>
            </div>
            <p className="account-name">{userProfileAccount?.userName}</p>
          </div>
          <div className="account-data-item">
            {/* <p className="account-name">{userProfileAccount?.email}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default PeopleProfile;
{
}
