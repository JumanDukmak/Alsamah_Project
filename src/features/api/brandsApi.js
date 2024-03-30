import axios from "axios";

//-----------------------getBrandsApi------------------
export const getBrandsApi = () => {
    return axios.get('http://127.0.0.1:8000/api/sales/get-brands',
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            }
        }
    )
}

//-----------------------addBrandApi------------------
export const addBrandApi = (name) => {
    return axios.post('http://127.0.0.1:8000/api/sales/add-brand', {
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

