import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Time from "./components/Time";
import Regression from "./components/Regression";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Time />} />
        <Route path="/regression" element={<Regression />} />
      </Routes>
    </Router>
  );
};

export default App;
