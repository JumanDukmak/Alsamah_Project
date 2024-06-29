import axios from "axios";

export const getPurchasesPlanApi = (year, category) => {
    return axios.get(`http://127.0.0.1:8000/api/purchases/get-purchasesPlan`, {
        headers: {
            'Authorization': `Bearer ${''}`,
            'Content-Type': 'application/json'
        },
        params: {
            year:year,
            category: category,
        }
    })
}