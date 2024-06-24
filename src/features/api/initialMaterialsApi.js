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

export function updateInitialMaterialsApi(number, name, type, priceD, id) {
    return axios.post('http://127.0.0.1:8000/api/costs/storeInitialMaterials', {
        number: number,
        name: name,
        type: type,
        priceD: priceD,
        id: id,
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








