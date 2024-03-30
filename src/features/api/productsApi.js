import axios from "axios";

export function addProductsApi( name, code, price, unit, brand_id, category_id ) {
    return axios.post( "http://127.0.0.1:8000/api/sales/Add_product", {
                name: name,
                code: code,
                price: price,
                unit: unit,
                brand_id: brand_id,
                category_id: category_id,
            },
            // {
            //     headers: {
            //         Authorization: `Bearer ${storage.getToken()}`,
            //         "Content-Type": "application/json",
            //     },
            // }
    ).then((response) => response).catch((error) => error.response.data.message);
}

export function getProductsApi() {
    return axios.get( "http://127.0.0.1:8000/api/sales/show_products",
            // {
            //     headers: {
            //         Authorization: `Bearer ${storage.getToken()}`,
            //         "Content-Type": "application/json",
            //     },
            // }
    ).then((response) => response).catch((error) => error.response.data.message);
}

export function uploadFileApi(formData) {
    console.log("api"+ formData);
    return axios.post('http://127.0.0.1:8000/api/sales/import-products', formData, 
    {
        headers: {
            'Content-Type': 'multipart/form-data'
        }, 
    }
    ).then(response => (response)).catch(error =>(error.response.data.message) )
}