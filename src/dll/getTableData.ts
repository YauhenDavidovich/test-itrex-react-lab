export type TableDataType = {
    row: TableRowType[],
    description: string
}
export type TableRowType = {
    id: number,
    firstName: string,
    "lastName": string,
    "email": string,
    "phone": string,
    adress: TableRowAdressType
}

export type TableRowAdressType = {
    streetAddress: string,
    city: string,
    state: string,
    zip: string
}


async function getTableData<TableDataType>() {
    try {
        let response = await fetch('https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json');
        let responseJson = await response.json();
        return responseJson.data;
    } catch (error) {
        console.error(error);
    }
}


export default getTableData
