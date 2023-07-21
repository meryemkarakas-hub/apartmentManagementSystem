import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Activation from "./pages/Activation";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<Login/>}
          />
           <Route
            path="/register"
            element={<Register/>}
          />
          <Route
            path="/user/activation/:activationCode"
            element={<Activation/>}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
