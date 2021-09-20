import getTableData, {TableDataType} from "../../dll/getTableData";
import Table from "../Table/Table";
import {useEffect, useMemo, useState} from "react";
import Search from "../Controls/Search";
import Filter from "../Controls/Filter";
import {useUID} from "react-uid";
import {fetchTableDataTC} from "../../bll/table-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";

const MainPage = () => {
    const uid = useUID();
    const dispatch = useDispatch();
    const profiles = useSelector<AppRootStateType, Array<TableDataType>>(state => state.profiles)
    const [searchTerm, setSearchTerm] = useState("")

    let filteredProfiles = useMemo(() => {
        let filtered: Array<TableDataType> = [...profiles]
        filtered = searchTerm ? filtered.filter(item => item.firstName.toLowerCase().includes(searchTerm.toLowerCase())) : filtered
        return filtered
    }, [profiles, searchTerm])

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
                        <td>
                            {field.id === 'State' ? row.adress.state : row[field.id]}
                        </td>
                    ))}
            </tr>
        )
    };

    const header = (
        <tr>
            {headerOptions.map(header => (
                <th style={{
                    border: '1px solid #dddddd',
                    textAlign: 'center',
                    padding: 10
                }}>
                    {header.id}
                </th>
            ))}
        </tr>
    );


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <Filter/>
            <Search setSearchTerm={setSearchTerm}/>
            <Table
                renderRow={row => generateRow(row)}
                profiles={filteredProfiles}
                pageLimit={20}
                header={header}
            />
        </div>
    )
}

export default MainPage;
