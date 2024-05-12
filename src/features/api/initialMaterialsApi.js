import axios from "axios";

export function getInitialMaterialsApi() {
    return axios.get('http://127.0.0.1:8000/api/costs/getInitialMaterials',
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            }
        }
    )
}

export function addInitialMaterialsApi(number, name, type, priceD) {
    return axios.post('http://127.0.0.1:8000/api/costs/storeInitialMaterials', {
        number: number,
        name: name,
        type: type,
        priceD: priceD,
    },
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            },
        }
    )
}

export function uploadInitialMaterialsFileApi(formData) {
    return axios.post('http://127.0.0.1:8000/api/costs/import-initialMaterials', formData, 
    {
        headers: {
            'Content-Type': 'multipart/form-data'
        }, 
    }
    )
}

