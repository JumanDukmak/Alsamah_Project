import axios from "axios";

//-----------------------getCategoriesApi------------------
export const getCategoriesApi = () => {
    return axios.get('http://127.0.0.1:8000/api/sales/get-categories',
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            }
        }
    )
}

//-----------------------addCategoryApi------------------
export const addCategoryApi = (name) => {
    return axios.post('http://127.0.0.1:8000/api/sales/add-category', {
        name: name,
    },
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            },
        }
    )
}

