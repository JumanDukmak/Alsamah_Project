import axios from "axios";

export function addMaterialsInventoryApi( initialMaterial_id, quantity, inventory_date ) {
    return axios.post( "http://127.0.0.1:8000/api/inventory/add-InitialMaterialInventory", {
                initialMaterial_id: initialMaterial_id,
                quantity: quantity,
                inventory_date: inventory_date,
            },
            // {
            //     headers: {
            //         Authorization: `Bearer ${storage.getToken()}`,
            //         "Content-Type": "application/json",
            //     },
            // }
    )
}

export function getMaterialsInventoryApi(type, year) {
    return axios.get(`http://127.0.0.1:8000/api/inventory/show-InitialMaterialInventory`,
            {
                headers: {
                    Authorization: `Bearer ${''}`,
                    "Content-Type": "application/json",
                },
                params: {
                    type: type,
                    year: year
                }
            }
    )
}

export function uploadMaterialsInventoryFileApi(formData) {
    return axios.post('http://127.0.0.1:8000/api/inventory/import-InitialMaterialInventory', formData, 
    {
        headers: {
            'Content-Type': 'multipart/form-data'
        }, 
    }
    )
}
















