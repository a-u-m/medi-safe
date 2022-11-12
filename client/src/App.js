import React, { useState, useEffect } from "react";
import { Routes, Route, redirect, Navigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import { LoginProvider } from "./components/contexts/LoginContext";
import LoginContext from "./components/contexts/LoginContext";

const App = () => {
  const ctx = useContext(LoginContext);

  return (
    <LoginProvider>
      {/* {!dashDisplay && <Login loginDataHandler={loginDataHandler} />}
      {dashDisplay && <Dashboard basicDetails={verifiedLoginDetails} />}
      <div></div> */}
      <Routes>
        <Route path="/" exact element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </LoginProvider>
  );
};

export default App;
