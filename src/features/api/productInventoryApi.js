import axios from "axios";

export function addProductInventoryApi( product_id, quantity, inventory_date ) {
    return axios.post( "http://127.0.0.1:8000/api/inventory/add-ProductInventory", {
            product_id: product_id,
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

export function getProductInventoryApi(category, year) {
    return axios.get(`http://127.0.0.1:8000/api/inventory/show-ProductInventory`,
            {
                headers: {
                    Authorization: `Bearer ${''}`,
                    "Content-Type": "application/json",
                },
                params: {
                    category: category,
                    year: year
                }
            }
    )
}

export function uploadProductInventoryFileApi(formData) {
    return axios.post('http://127.0.0.1:8000/api/inventory/import-ProductInventory', formData, 
    {
        headers: {
            'Content-Type': 'multipart/form-data'
        }, 
    }
    )
}
















