import axios from "axios";

//-----------------------getIndirect_IndustrialExpeseApi------------------
export const getGeneralDataApi = () => {
    return axios.get('http://127.0.0.1:8000/api/costs/getGeneralData',
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            }
        }
    )
}

//-----------------------getIndirect_IndustrialExpeseApi------------------
export const addGeneralDataApi = (name,value) => {
    return axios.post('http://127.0.0.1:8000/api/costs/storeGeneralData', {
        name: name,
        value:value
    },
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            },
        }
    )
}

export const updateGeneralDataApi = (name,value,id) => {
    return axios.post('http://127.0.0.1:8000/api/costs/updateGeneralData', {
        name: name,
        value:value,
        id:id
    },
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            },
        }
    )
}


