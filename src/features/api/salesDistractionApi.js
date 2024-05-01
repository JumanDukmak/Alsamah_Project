
import axios from "axios";

//-----------------------getExportSalesDistractionsApi------------------
export const getExportSalesDistractionsApi = (saletype,previous_year, brands_id, categories_id, country_id) => {
    return axios.get(`http://127.0.0.1:8000/api/sales/getExportSalesReport`, {
        headers: {
            'Authorization': `Bearer ${''}`,
            'Content-Type': 'application/json'
        },
        params: {
            previous_year:previous_year,
            saletype: saletype,
            brands_id: brands_id,
            categories_id: categories_id,
            country_id: country_id
        }
    })
}

export const getLocalSalesDistractionsApi = (local_saletype,previous_year, salesperson_id, areas_id, governorate, brands_id, categories_id) => {
    return axios.get(`http://127.0.0.1:8000/api/sales/getLocalSaleReport`, {
        headers: {
            'Authorization': `Bearer ${''}`,
            'Content-Type': 'application/json'
        },
        params: {
            saletype: local_saletype,
            previous_year:previous_year,
            brands_id: brands_id,
            categories_id: categories_id,
            salesperson_id: salesperson_id,
            areas_id: areas_id,
            governorate: governorate
        }
    })
}

//------------------------------Total-----------------------
export const getTotalSalesDistractionsApi = (saletype,previous_year, brands_id, categories_id) => {
    return axios.get(`http://127.0.0.1:8000/api/sales/getTotalSalesReport`, {
        headers: {
            Authorization: `Bearer ${""}`,
            "Content-Type": "application/json"
        },
        params: {
            previous_year:previous_year,
            saletype: saletype,
            brands_id: brands_id,
            categories_id: categories_id
        }
    });
};

//------------------------------Total Charts api-----------------------
export const getSalesChartsApi = (from,to,categories) => {
    return axios.get('http://127.0.0.1:8000/api/sales/salesType-diagram', {
        headers: {
            'Authorization': `Bearer ${''}`,
            'Content-Type': 'application/json'
        },
        params: {
            from:from,
            to: to,
            categories: categories,
           
        }
    }).then(response => (response)).catch(error =>(error.response.data.message))
}


export const getProductsChartsApi = (year,month) => {
    return axios.get('http://127.0.0.1:8000/api/sales/getProductsDiagram', {
        headers: {
            'Authorization': `Bearer ${''}`,
            'Content-Type': 'application/json'
        },
        params: {
            year:year,
            month: month,
            
        }
    }).then(response => (response)).catch(error =>(error.response.data.message))
}
