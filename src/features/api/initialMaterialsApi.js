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


export function uploadInitialMaterialsProductApi(formData) {
    return axios.post('http://127.0.0.1:8000/api/costs/add-InitialMaterialsProduct', formData, 
    {
        headers: {
            'Content-Type': 'multipart/form-data'
        }, 
    }
    )
}

export function addInitialMaterialsProductApi(initial_materials_code, quantity, productId) {
    return axios.post('http://127.0.0.1:8000/api/costs/add-InitialMaterialsProduct', {
        initial_materials_code: initial_materials_code,
        quantity: quantity,
        productId: productId,
     
    },
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            },
        }
    )
}


export function updateInitialMaterialsProductApi(initial_materials_code, quantity, productId) {
    return axios.post('http://127.0.0.1:8000/api/costs/update-InitialMaterialsProduct', {
        initial_materials_code: initial_materials_code,
        quantity: quantity,
        productId: productId,
     
    },
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            },
        }
    )
}

