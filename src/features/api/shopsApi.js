import axios from "axios";

//-----------------------getCountriesApi------------------
export const getShopsApi = () => {
    return axios.get('http://127.0.0.1:8000/api/sales/get-shops',
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            }
        }
    )
}

//-----------------------addShopApi------------------
export const addShopApi = (name, governorate) => {
    return axios.post('http://127.0.0.1:8000/api/sales/add-shop', {
        name: name,
        governorate: governorate
    },
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            },
        }
    )
}


