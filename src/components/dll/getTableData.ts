async function getTableData() {
    try {
        let response = await fetch('https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json');
        let responseJson = await response.json();
        return responseJson.data;
    } catch(error) {
        console.error(error);
    }
}

export default getTableData
