import axios from "axios";


export function addActual_productionApi( product_id, value, date ) {
    return axios.post( "http://127.0.0.1:8000/api/production/actual/add-machineProductivity", {
        product_id: product_id,
        value: value,
                date: date,
            },
            {
                headers: {
                    // 'Authorization': `Bearer ${storage.getToken()}`,
                    "Content-Type": "application/json",
                },
            }
    )
}


export function uploadActual_productionFileApi(formData) {
    return axios.post('http://127.0.0.1:8000/api/production/actual/import-machineProductivity', formData, 
    {
        headers: {
            'Authorization': `Bearer ${''}`,
            'Content-Type': 'multipart/form-data'
        }, 
    }
    )
}



export function getMachineProductivityApi(category, year) {
    return axios.get(`http://127.0.0.1:8000/api/production/actual/show-`,
            {
                headers: {
                    'Authorization': `Bearer ${''}`,
                    "Content-Type": "application/json",
                },
                params: {
                    category: category,
                    year: year
                }
            }
    )
}




export function getComparisonBetweenActual_ExpectedApi(category, year) {
    return axios.get(`http://127.0.0.1:8000/api/production/show-comparison`,
            {
                headers: {
                    'Authorization': `Bearer ${''}`,
                    "Content-Type": "application/json",
                },
                params: {
                    category: category,
                    year: year
                }
            }
    )
}




export function updateActual_productionApi(id, date, value) {
    console.log(`theee --- ${id} and ${date} and ${value}`)
    return axios.put(`http://127.0.0.1:8000/api/production/actual/update-machineProductivity/${id}`, 
        {
            date: date,
            value: value
        },
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            },
        }
    )
}


















