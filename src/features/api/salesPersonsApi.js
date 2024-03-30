import axios from "axios";

//-----------------------getsalesPersonsApi------------------
export const getsalesPersonsApi = () => {
    return axios.get('http://127.0.0.1:8000/api/sales/get-salesperson',
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            }
        }
    )
}

//-----------------------addsalesPersonsApi------------------
export const addsalesPersonApi = (first_name, last_name) => {
    return axios.post('http://127.0.0.1:8000/api/sales/add-salesperson', {
        first_name: first_name,
        last_name: last_name
    },
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            }
        }
    )
}




