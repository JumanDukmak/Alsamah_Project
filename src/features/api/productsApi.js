import axios from "axios";

export function addProductsApi( name, code, price, unit, brand_id, category_id, time_per_piece ) {
    return axios.post( "http://127.0.0.1:8000/api/sales/Add_product", {
                name: name,
                code: code,
                price: price,
                unit: unit,
                brand_id: brand_id,
                category_id: category_id,
                time_per_piece: time_per_piece,
            },
            // {
            //     headers: {
            //         Authorization: `Bearer ${storage.getToken()}`,
            //         "Content-Type": "application/json",
            //     },
            // }
    ).then((response) => response).catch((error) => error.response.data.message);
}

export function getProductsApi(page) {
    return axios.get(`http://127.0.0.1:8000/api/sales/show_products?page=${page}`,
            // {
            //     headers: {
            //         Authorization: `Bearer ${storage.getToken()}`,
            //         "Content-Type": "application/json",
            //     },
            // }
    )
}

export function uploadFileApi(formData) {
    console.log("api"+ formData);
    return axios.post('http://127.0.0.1:8000/api/sales/import-products', formData, 
    {
        headers: {
            'Content-Type': 'multipart/form-data'
        }, 
    }
    ).then(response => (response)).catch(error =>(error.response.data.message))
}

export function getProductCardApi(id) {
    return axios.get(`http://127.0.0.1:8000/api/costs/products/${id}/card`,
            {
                headers: {
                    Authorization: `Bearer ${''}`,
                    "Content-Type": "application/json",
                },
            }
    )
}
















