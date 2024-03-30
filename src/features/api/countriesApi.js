import axios from "axios";

//-----------------------getCountriesApi------------------
export const getCountriesApi = () => {
    return axios.get('http://127.0.0.1:8000/api/sales/get-countries',
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            }
        }
    )
}
//-----------------------addCountryApi------------------
export const addCountryApi = (name) => {
    return axios.post('http://127.0.0.1:8000/api/sales/add-country', {
        name: name,
    },
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            },
        }
    )
}

