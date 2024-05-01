import axios from "axios";

//-----------------------getIndirect_IndustrialExpeseApi------------------
export const getIndustrialExpenseApi = () => {
    return axios.get('http://127.0.0.1:8000/api/costs/getIndustrialExpense',
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            }
        }
    )
}

//-----------------------getIndirect_IndustrialExpeseApi------------------
export const addIndustrialExpenseApi = (name,monthlyD) => {
    return axios.post('http://127.0.0.1:8000/api/costs/storeIndustrialExpense', {
        name: name,
        monthlyD:monthlyD
    },
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            },
        }
    )
}


