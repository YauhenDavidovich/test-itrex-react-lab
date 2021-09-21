import {TableDataType} from "../../dll/getTableData";
import Table from "../Table/Table";
import {useCallback, useEffect, useMemo, useState} from "react";
import Search from "../Controls/Search";
import Filter from "../Controls/Filter";
import {useUID} from "react-uid";
import {fetchTableDataTC} from "../../bll/table-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import Profile from "../Profile/Profile";
import {useSortableData} from "../../utils/Sort";

const MainPage = () => {
    const uid = useUID();
    const dispatch = useDispatch();
    const profiles = useSelector<AppRootStateType, Array<TableDataType>>(state => state.profiles)
    const [searchTerm, setSearchTerm] = useState("")
    const [currentProfile, setCurrenProfile] = useState<TableDataType>()
    const [filter, handleFilterChange] = useState("")

    const { items, requestSort, sortConfig } = useSortableData(profiles);

    let filteredProfilesBySearch = useMemo(() => {
        let searched: Array<TableDataType> = [...items]
        searched = searchTerm ? searched.filter(item => item.firstName.toLowerCase().includes(searchTerm.toLowerCase())) : searched
        return searched
    }, [items, searchTerm, handleFilterChange])

    let filteredProfilesByState = useMemo(() => {
        let filtered: Array<TableDataType> = [...filteredProfilesBySearch]
        filtered = filter.length > 0 ? filtered.filter(item => item.adress.state.includes(filter)) : filtered
        return filtered
    }, [filteredProfilesBySearch, filter, handleFilterChange])

    const handlerShowProfile = useCallback((row: TableDataType) => {
        setCurrenProfile(row);
    }, [])

    useEffect(() => {
        dispatch(fetchTableDataTC());
    }, [])

    const headerOptions = [
        {
            id: "id"
        },
        {
            id: "firstName"
        },
        {
            id: "lastName",
        },
        {
            id: "email"
        },
        {
            id: 'State'
        }];

    const generateRow = (row: any) => {
        return (
            <tr key={uid}>
                {headerOptions.map(
                    field => (
                        <td onClick={() => handlerShowProfile(row)}>
                            {field.id === 'State' ? row.adress.state : row[field.id]}
                        </td>
                    ))}
            </tr>
        )
    };

    const getClassNamesForHeaders = (name: string) => {
        if (!sortConfig) {
            return;
        }
        // @ts-ignore
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    const header = (
        <thead>
        <tr>
            {headerOptions.map(header => (
                <th style={{
                    border: '1px solid #dddddd',
                    textAlign: 'center',
                    padding: 10
                }}>
                    {header.id}
                    <button type="button" onClick={() => requestSort(header.id)}
                            className={getClassNamesForHeaders(header.id)}
                    />

                </th>
            ))}
        </tr>

        </thead>
    );

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <Filter handleFilterChange={handleFilterChange}/>
            <Search setSearchTerm={setSearchTerm}/>
            <Table
                renderRow={row => generateRow(row)}
                profiles={filteredProfilesByState}
                pageLimit={20}
                header={header}
            />
            <Profile row={currentProfile}/>
        </div>
    )
}

export default MainPage;
