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

export function addInitialMaterialsApi(material_number, material_name, type, priceD, storage_period, shipping_installation_duration) {
    return axios.post('http://127.0.0.1:8000/api/costs/storeInitialMaterials', {
        material_number: material_number,
        material_name: material_name,
        type: type,
        priceD: priceD,
        storage_period: storage_period,
        shipping_installation_duration: shipping_installation_duration
    },
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            },
        }
    )
}

export function updateInitialMaterialsApi(material_number, material_name, type, priceD, storage_period, shipping_installation_duration, id) {
    return axios.post(`http://127.0.0.1:8000/api/costs/updateInitialMaterials/${id}`, {
        material_number: material_number,
        material_name: material_name,
        type: type,
        priceD: priceD,
        storage_period: storage_period,
        shipping_installation_duration: shipping_installation_duration
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

//---------------------------------------------------
export const addMaterialProductApi = ( productId, items)=> {
    console.log(`the list of material ${items}`);
    console.log(`  the id up : ${productId}`);
    return axios.post(`http://127.0.0.1:8000/api/costs/add-InitialMaterialsProduct/${productId}`, {
        items: items,
    },
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            },
        }
    )
}

export function uploadMaterialsProductFileApi(formData) {
    console.log("api"+ formData);
    return axios.post('http://127.0.0.1:8000/api/costs/import-InitialMaterialsProduct', formData, 
    {
        headers: {
            'Content-Type': 'multipart/form-data'
        }, 
    }
    )
}

export const updateMaterialsProductApi = ( productId,items)=> {
console.log(`DATA API : ${items}  `)
    return axios.post(`http://127.0.0.1:8000/api/costs/update-InitialMaterialsProduct/${productId}`, {
    items:items    
    },
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            },
        }
    )
}








