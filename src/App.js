import { BrowserRouter, Routes, Route } from "react-router-dom";

// contexts ---

import { UserAuthProvider, useUserAuth } from "./contexts/UserAuthCtx";

// components
import Home from "./pages/Home/Home";
import ProtectedRouts from "./ProtectedRouts";
import Login from "./pages/Login&Signup/Login";
import SignUp from "./pages/Login&Signup/SignUp";
import Account from "./pages/Account/Account";
import PeopleProfile from "./pages/PeopleProfile/PeopleProfile";
function App() {
  return (
    <div className="App">
      <UserAuthProvider>
        <BrowserRouter basename={"/chatyar"}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRouts>
                  <Home />
                </ProtectedRouts>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRouts>
                  <Account />
                </ProtectedRouts>
              }
            />
            <Route path="/profile/:id" element={<PeopleProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </UserAuthProvider>
    </div>
  );
}

export default App;
