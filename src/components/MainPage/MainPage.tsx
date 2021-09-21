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
import {TestType, useSortableData} from "../../utils/Sort";

const MainPage = () => {
    const uid = useUID();
    const dispatch = useDispatch();
    const profiles = useSelector<AppRootStateType, Array<TableDataType>>(state => state.profiles)
    const [searchTerm, setSearchTerm] = useState("")
    const [currentProfile, setCurrenProfile] = useState<TableDataType>()
    const [filter, handleFilterChange] = useState("")

    const {items, requestSort, sortConfig} = useSortableData(profiles);

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

    const headerOptions : Array<{id:TestType, name: string}> = [
        {
            id: "id",
            name: "id"
        },
        {
            id: "firstName",
            name: "First Name"
        },
        {
            id: "lastName",
            name: "Last Name"
        },
        {
            id: "email",
            name: "Email"
        },
        {
            id: "adress",
            name: "State"
        }];

    const generateRow = (row: any) => {
        return (
            <tbody>
            <tr key={uid}>
                {headerOptions.map(
                    field => (
                        <td onClick={() => handlerShowProfile(row)}>
                            {field.id === 'adress' ? row.adress.state : row[field.id]}
                        </td>
                    ))}
            </tr>
            </tbody>

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
                <th>
                    {header.name}
                    <button type="button" onClick={() => requestSort(
                        header.id
                    )}
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
            height: '100vh',
            maxWidth: '1024px',
            width: '100%',
            margin: '0 auto',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%'
            }}>
                <Filter handleFilterChange={handleFilterChange}/>
                <Search setSearchTerm={setSearchTerm}/>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%'
            }}>
                <Table
                    renderRow={row => generateRow(row)}
                    profiles={filteredProfilesByState}
                    pageLimit={20}
                    header={header}
                />
                <Profile row={currentProfile}/>
            </div>
        </div>
    )
}

export default MainPage;
