import axios from "axios";

//-----------------------getCountriesApi------------------
export const getAreasApi = () => {
    return axios.get('http://127.0.0.1:8000/api/sales/get-areas',
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            }
        }
    )
}

//-----------------------addAreaApi------------------
export const addAreaApi = (name, governorate, salesperson_id) => {
    return axios.post('http://127.0.0.1:8000/api/sales/add-area', {
        name: name,
        governorate: governorate,
        salesperson_id: salesperson_id
    },
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            },
        }
    )
}



