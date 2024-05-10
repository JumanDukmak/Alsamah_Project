import axios from "axios";

//-----------------------getPigmentCostsApi------------------
export const getPigmentCostsApi = () => {
    return axios.get('http://127.0.0.1:8000/api/costs/materialCosts',
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            }
        }
    )
}

//-----------------------getPigmentCostsApi------------------
export const addPigmentCostsApi = (measure,value) => {
    return axios.post('http://127.0.0.1:8000/api/costs/add-materialCost', {
        measure: measure,
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
//-----------------------updateIndustrialExpenseApi------------------

export const updatePigmentCostsApi = (measure,value,id) => {
    return axios.put(`http://127.0.0.1:8000/api/costs/update-materialCost/${id}`, {
        measure: measure,
        value:value,
    
    },
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            },
        }
    )
}


