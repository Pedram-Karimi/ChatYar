import { useState } from "react"; // react hooks

import { Link, useNavigate } from "react-router-dom"; // react router

// contexts

import { useUserAuth } from "../../contexts/UserAuthCtx";

//
function Login() {
  // variables ---
  const [LoginEmail, setLoginEmail] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");
  let navigate = useNavigate();
  // signIn function ---

  const { signIn, userDataState } = useUserAuth();
  if (userDataState !== null) {
    navigate("/chatyar/");
  }
  // signing in the user ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(LoginEmail, LoginPassword);
      return navigate("/chatyar/");
    } catch (err) {
      console.log(err.message);
    }
  };
  //
  return (
    <div className="signUp">
      <div className="container">
        <p>Login here</p>
        <div className="input_box">
          <form onSubmit={handleSubmit}>
            <input
              value={LoginEmail}
              placeholder="Email"
              required
              onChange={(e) => {
                setLoginEmail(e.target.value);
              }}
            />
            <input
              placeholder="Password"
              value={LoginPassword}
              required
              onChange={(e) => {
                setLoginPassword(e.target.value);
              }}
            />
            <button className="signup_btn">Login</button>
          </form>
        </div>
        <div className="signUp-box">
          do not have account?
          <Link to="/chatyar/sign-up" className="signup-link">
            sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
