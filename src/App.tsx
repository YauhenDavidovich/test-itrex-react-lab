import React, {useEffect} from 'react';
import './App.css';
import {useDispatch} from "react-redux";
import {fetchTableDataTC} from "./bll/table-reducer";
import MainPage from "./components/MainPage/MainPage";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTableDataTC());
    }, [dispatch])


  return (
    <div className="App">
      <MainPage/>
    </div>
  );
}

export default App;
