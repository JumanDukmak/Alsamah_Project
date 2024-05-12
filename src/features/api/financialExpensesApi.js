import axios from "axios";

export function getFinancialExpensesApi() {
    return axios.get('http://127.0.0.1:8000/api/costs/financialExpenses',
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            }
        }
    )
}

export function addFinancialExpensesApi(working_number, work_category, num_of_employees, transport_cost,
    health_insurance, basic_salary, incentives, discounted_working_days ) {
    return axios.post('http://127.0.0.1:8000/api/costs/add-financialExpenses', {
        working_number: working_number,
        work_category: work_category,
        num_of_employees: num_of_employees,
        transport_cost: transport_cost,
        health_insurance: health_insurance,
        basic_salary: basic_salary,
        incentives: incentives,
        discounted_working_days: discounted_working_days,
    },
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            },
        }
    )
}