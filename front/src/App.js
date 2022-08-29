import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LoginSuccess from "./pages/LoginSuccess";
import MainPage from "./pages/MainPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/loginSuccess" element={<LoginSuccess />} />
      <Route path="/mainPage" element={<MainPage />} />
    </Routes>
  );
}

export default App;
