import axios from "axios";

export function getDirectWorkApi() {
    return axios.get('http://127.0.0.1:8000/api/costs/getInitialMaterials',
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            }
        }
    )
}

export function addDirectWorkApi(directWorkCost,id) {
    return axios.post(`http://127.0.0.1:8000/api/costs/add-directWork/${id}`, {
        directWorkCost: directWorkCost,
       
    },
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            },
        }
    )
}

export function uploadDirectWorkFileApi(formData) {
    return axios.post('http://127.0.0.1:8000/api/costs/import-directWork', formData, 
    {
        headers: {
            'Content-Type': 'multipart/form-data'
        }, 
    }
    )
}


export function remveDirectWorkApi() {
    return axios.delete(`http://127.0.0.1:8000/api/costs/delete-directWork/${id}`, 
    {
        headers: {
            'Authorization': `Bearer ${''}`,
            'Content-Type': 'application/json'
        },
    }
    )
}



