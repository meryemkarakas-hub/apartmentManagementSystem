import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Activation from "./pages/Activation";
import ForgotPasswordActivation from "./pages/ForgotPasswordActivation.js";
import Profile from "./pages/Profile";
import NestedList from "./pages/NestedList";

function App() {
  return (
    <div>
     <Profile/>
      {/* <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/user/activation/:activationCode"
            element={<Activation />}
          />
          <Route
            path="/forgot-password"
            element={<ForgotPasswordActivation />}
          />
        </Routes>
      </Router> */}
    </div>
  );
}

export default App;
