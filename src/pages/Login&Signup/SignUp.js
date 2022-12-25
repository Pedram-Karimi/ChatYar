import { useState } from "react"; // react

import { Link, useNavigate } from "react-router-dom"; // react-router

import Typesense from "typesense"; // search service

// firebase

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import { db } from "../../FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";

import "./login&Signup.css"; // styles

function SignUp() {
  //
  // variables ---

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerFirstName, setRegisterFirstName] = useState("");
  let navigate = useNavigate();

  // signing up a new account ---

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // creating a new account in firebase auth ---

      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );

      // saving users name in the db ---

      const userRef = doc(db, "users", user.user.uid);
      setDoc(
        userRef,
        {
          userName: registerFirstName,
          bio: "",
        },
        { merge: true }
      );

      // saving user id to the search service servers ---

      let client = new Typesense.Client({
        nodes: [
          {
            host: "ojn84fea210mrhdvp-1.a1.typesense.net", // where xxx is the ClusterID of your Typesense Cloud cluster
            port: "443",
            protocol: "https",
          },
        ],
        apiKey: "YT6m6EQvAINv0EfHt75qymW2xtkAMdBg",
        connectionTimeoutSeconds: 2,
      });
      const myCollection = {
        name: "users",
        fields: [
          { name: "id", type: "string" },
          { name: "userName", type: "string" },
        ],
      };
      client.collections().create(myCollection);
      const document = {
        id: user.user.uid,
        userName: registerFirstName,
      };

      // clearing inputs ---

      setRegisterEmail("");
      setRegisterPassword("");
      setRegisterFirstName("");

      // going to the home page ---

      navigate("/chatyar/");

      // submiting user to the search service srevers ---

      return client.collections("users").documents().create(document);
      //
    } catch (err) {
      console.log(err.message);
    }
  };
  //---
  return (
    <div className="signUp">
      <div className="container">
        <p>Sign up here</p>
        <div className="input_box">
          <form onSubmit={handleSubmit}>
            <input
              value={registerFirstName}
              placeholder="First name"
              required
              onChange={(e) => {
                setRegisterFirstName(e.target.value);
              }}
            />
            <input
              value={registerEmail}
              placeholder="Email"
              required
              onChange={(e) => {
                setRegisterEmail(e.target.value);
              }}
            />
            <input
              placeholder="Password (contains numbers and letters)"
              value={registerPassword}
              required
              onChange={(e) => {
                setRegisterPassword(e.target.value);
              }}
            />
            <button className="signup_btn">Sign up</button>
          </form>
        </div>
        <div className="signUp-box">
          do you have account?
          <Link to="/chatyar/login" className="signup-link">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
