import React from 'react';
import './App.css';
import Table from "./components/Table/Table";
import Controls from "./components/Controls/Controls";
import Profile from "./components/Profile/Profile";

const App = () => {
  return (
    <div className="App">
      <Controls/>
      <Table/>
      <Profile/>
    </div>
  );
}

export default App;
