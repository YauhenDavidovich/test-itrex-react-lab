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


// function toFlatPropertyMap(obj: object, keySeparator = '.') {
//     const flattenRecursive = (obj: object, parentProperty?: string, propertyMap: Record<string, unknown> = {}) => {
//         for(const [key, value] of Object.entries(obj)){
//             const property = parentProperty ? `${parentProperty}${keySeparator}${key}` : key;
//             if(value && typeof value === 'object'){
//                 flattenRecursive(value, property, propertyMap);
//             } else {
//                 propertyMap[property] = value;
//             }
//         }
//         return propertyMap;
//     };
//     return flattenRecursive(obj);
// }

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
