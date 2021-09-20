import React, {useMemo, useState} from 'react';
import {TableDataType} from "../../dll/getTableData";
import TablePagination from "../Controls/TablePagination";

type PropsType = {
    profiles: Array<TableDataType>
    renderRow: (row: TableDataType) => void
    pageLimit: number
    header: any
}


export const Table = (props: PropsType) => {
    const [page, setPage] = useState(0);
    const getPaginatedProfiles = (profiles: Array<TableDataType>) => {
        const offset = page * props.pageLimit;
        return profiles.slice(offset, offset + props.pageLimit);
    }
    const renderRowData = () => {
        return getPaginatedProfiles(props.profiles);
    }

    return (
        <>
            <table>
                {props.header}
                {renderRowData().map(row => props.renderRow(row))}
            </table>
            <TablePagination
                pageLimit={props.pageLimit}
                pages={props.profiles.length}
                currentPage={page}
                setPage={setPage}
            />
        </>

)
}

export default Table;
