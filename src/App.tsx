import React, {useEffect} from 'react';
import './App.css';
import Table from "./components/Table/Table";
import Controls from "./components/Controls/Controls";
import Profile from "./components/Profile/Profile";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./bll/store";
import {TableDataType} from "./dll/getTableData";
import {fetchTableDataTC} from "./bll/table-reducer";
import MainPage from "./components/MainPage/MainPage";

const App = () => {
    const table = useSelector<AppRootStateType, Array<TableDataType>>(state => state.table)
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
