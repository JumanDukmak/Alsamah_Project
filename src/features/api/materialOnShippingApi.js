import axios from "axios";

export function addMaterialOnShippingApi(initial_material_id, date, quantity) {
    console.log(`the---------${initial_material_id} and ${date} and ${quantity}`);
    return axios.post(`http://127.0.0.1:8000/api/inventory/add-MaterialOnShipping?initial_material_id=${initial_material_id}&date=${date}&quantity=${quantity}`, null, {
        headers: {
            'Authorization': `Bearer ${''}`,
            "Content-Type": "application/json",
        }
    });
}



export function uploadMaterialOnShippingFileApi(formData) {
    return axios.post('http://127.0.0.1:8000/api/inventory/import-MaterialOnShipping', formData, 
    {
        headers: {
            'Authorization': `Bearer ${''}`,
            'Content-Type': 'multipart/form-data'
        }, 
    }
    )
}