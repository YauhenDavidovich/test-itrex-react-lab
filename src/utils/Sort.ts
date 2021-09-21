import {useMemo, useState} from "react";
import {TableDataType} from "../dll/getTableData";

export  type TestType = "id"|"firstName"|"lastName"|"email"|"phone"|"adress"|"description"


export const useSortableData = (profiles: Array<TableDataType>) => {


    const [sortConfig, setSortConfig] = useState<{key: TestType,direction: string } | null>(null);

    const sortedItems = useMemo(() => {
        let sortableItems = [...profiles];
        if (sortConfig !== null) {
            if (sortConfig.key === 'adress'){
                sortableItems.sort((a, b) => {
                    if (a.adress.state < b.adress.state) {
                        return sortConfig.direction === 'ascending' ? -1 : 1;
                    }
                    if (a.adress.state > b.adress.state) {
                        return sortConfig.direction === 'ascending' ? 1 : -1;
                    }
                    return 0;
                });

            }
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [profiles, sortConfig]);

    const requestSort = (key:TestType) => {
        let direction = 'ascending';
        if (
            sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
};
