import axios from "axios";

export function uploadSalesFileApi(formData) {
    console.log("api"+ formData);
    return axios.post('http://127.0.0.1:8000/api/sales/import-sales', formData, 
    {
        headers: {
            'Content-Type': 'multipart/form-data'
        }, 
    }
    ).then(response => (response)).catch(error =>(error.response.data.message) )
}