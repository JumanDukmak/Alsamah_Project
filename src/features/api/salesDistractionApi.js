
import axios from "axios";

//-----------------------getExportSalesDistractionsApi------------------
export const getExportSalesDistractionsApi = (saletype, brands_id, categories_id, country_id) => {
    return axios.get(`http://127.0.0.1:8000/api/sales/getExportSalesReport`, {
        headers: {
            'Authorization': `Bearer ${''}`,
            'Content-Type': 'application/json'
        },
        params: {
            saletype: saletype,
            brands_id: brands_id,
            categories_id: categories_id,
            country_id: country_id
        }
    })
}

export const getLocalSalesDistractionsApi = (local_saletype, salesperson_id, areas_id, governorate, brands_id, categories_id) => {
    return axios.get(`http://127.0.0.1:8000/api/sales/getLocalSaleReport`, {
        headers: {
            'Authorization': `Bearer ${''}`,
            'Content-Type': 'application/json'
        },
        params: {
            saletype: local_saletype,
            brands_id: brands_id,
            categories_id: categories_id,
            salesperson_id: salesperson_id,
            areas_id: areas_id,
            governorate: governorate
        }
    })
}

//------------------------------Total-----------------------
export const getTotalSalesDistractionsApi = (saletype, brands_id, categories_id) => {
    return axios.get(`http://127.0.0.1:8000/api/sales/getTotalSalesReport`, {
        headers: {
            Authorization: `Bearer ${""}`,
            "Content-Type": "application/json"
        },
        params: {
            saletype: saletype,
            brands_id: brands_id,
            categories_id: categories_id
        }
    });
};

//------------------------------Total Charts api-----------------------
export const getSalesChartsApi = () => {
    return axios.get('http://127.0.0.1:8000/api/sales/salesType-diagram', {
        headers: {
            'Authorization': `Bearer ${''}`,
            'Content-Type': 'application/json'
        }
    }).then(response => (response)).catch(error =>(error.response.data.message))
}
