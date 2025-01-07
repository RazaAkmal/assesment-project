import React from "react";
import AppLayout from "./AppLayout";
import { HashRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;
