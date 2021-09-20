import getTableData, {TableDataType} from "../../dll/getTableData";
import Table from "../Table/Table";
import {useEffect, useState} from "react";
import Search from "../Controls/Search";
import TablePagination from "../Controls/TablePagination";
import Filter from "../Controls/Filter";
import {useUID} from "react-uid";

const MainPage = () => {
    const uid = useUID();
    const [profiles, setProfiles] = useState([]);


    useEffect(() => {
        getTableData().then(data => {

            // @ts-ignore
            setProfiles(data)
        });
    }, []);


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
        <div>
            <Filter/>
            <Search/>
            <Table
                renderRow={row => generateRow(row)}
                profiles={profiles}
                pageLimit={20}
                header={header}
            />
        </div>
    )
}

export default MainPage;
