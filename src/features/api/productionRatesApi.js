import axios from "axios";

export function getProductionRatesApi() {
    return axios.get('http://127.0.0.1:8000/api/costs/productionRates',
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            }
        }
    )
}

export function addProductionRatesApi(working_number, working_type, daily_production, working_category) {
    return axios.post('http://127.0.0.1:8000/api/costs/add-productionRates', {
        working_number: working_number,
        working_type: working_type,
        daily_production: daily_production,
        working_category: working_category,
    },
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            },
        }
    )
}

export function uploadProductionRatesFileApi(formData) {
    return axios.post('http://127.0.0.1:8000/api/costs/import-productionRates', formData, 
    {
        headers: {
            'Content-Type': 'multipart/form-data'
        }, 
    }
    )
}

