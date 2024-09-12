import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Create from "./component/Create";
import Navbar from "./component/Navbar";
import Read from "./component/Read";
import Update from "./component/Update";
const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Create />} />
          <Route exact path="/all" element={<Read />} />
          <Route exact path="/:id" element={<Update />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
