import {useMemo, useState} from "react";

export const useSortableData = (profiles: any, config = null) => {
    const [sortConfig, setSortConfig] = useState(config);

    const sortedItems = useMemo(() => {
        let sortableItems = [...profiles];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                // @ts-ignore
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    // @ts-ignore
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                // @ts-ignore
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    // @ts-ignore
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [profiles, sortConfig]);

    const requestSort = (key: any) => {
        let direction = 'ascending';
        if (

            sortConfig &&
            // @ts-ignore
            sortConfig.key === key &&
            // @ts-ignore
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        // @ts-ignore
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
};
