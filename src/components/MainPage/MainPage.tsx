import getTableData, {TableDataType} from "../../dll/getTableData";
import Table from "../Table/Table";
import {useEffect, useState} from "react";

const MainPage = () => {
    const [profiles, setProfiles] = useState([]);


    useEffect(() => {
        getTableData().then(data => {
            setProfiles(data)
        });
    }, []);

    const headerOptions = [
        {
            id: "id"
        },
        {
            id: "First name"
        },
        {
            id: "Last name",
        },
        {
            id: "Email"
        },
        {
            id: "State"
        }];





    const generateRow = (row: TableDataType) => {
        return (
            <tr key={row.id}>
                {headerOptions.map(row => (
                    <td >
                        {row.id}
                    </td>

                ))}
            </tr>
        )
    };

    const header = (
        <tr>
            {headerOptions.map(header => (
                <th>
                    {header.id}
                </th>
            ))}
        </tr>
    );

    return (
        <div>
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
