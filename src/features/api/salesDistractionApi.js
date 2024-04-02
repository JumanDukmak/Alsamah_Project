
import axios from "axios";

//-----------------------getExportSalesDistractionsApi------------------
export const getExportSalesDistractionsApi = (saletype,brands_id,categories_id,country_id) => {
    return axios.get(`http://127.0.0.1:8000/api/sales/getExportSalesReport`,
        {
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
        }
    )
}



export const getLocalSalesDistractionsApi = (local_saletype,salesperson_id,areas_id,governorate,brands_id,categories_id) => {
   
   console.log(`the type is :${local_saletype}`)
    return axios.get(`http://127.0.0.1:8000/api/sales/getLocalSaleReport`,
        {
            headers: {
                'Authorization': `Bearer ${''}`,
                'Content-Type': 'application/json'
            },
            params: {
                saletype: local_saletype,
                brands_id: brands_id,
                categories_id: categories_id,
                salesperson_id: salesperson_id,
                areas_id:areas_id,
                governorate:governorate

            }
        }
    )
}
//------------------------------Total-----------------------


