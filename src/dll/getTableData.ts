export interface TableDataType {
    id:          number;
    firstName:   string;
    lastName:    string;
    email:       string;
    phone:       string;
    adress:      Adress;
    description: string;
}

export interface Adress {
    streetAddress: string;
    city:          string;
    state:         string;
    zip:           string;
}


async function getTableData<TableDataType>() {
    try {
        let response = await fetch('https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json');
        let responseJson = await response.json();
        console.error(responseJson);

        return responseJson;
    } catch (error) {
        console.error(error);
    }
}


export default getTableData
