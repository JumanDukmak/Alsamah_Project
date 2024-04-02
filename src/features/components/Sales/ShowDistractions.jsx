
import { Button, Form, Col, Row, Select, message } from 'antd';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesStart } from "../../redux/Country/countriesSlice";
import { getBrandsStart } from "../../redux/Brands/brandsSlice";
import { getCategoriesStart } from "../../redux/Category/categoriesSlice";
import { getsalesPersonsStart } from '../../redux/SalesPerson/salesPersonSlice';
import { getAreasStart } from '../../redux/Area/areasSlice';
import { getShopsStart } from '../../redux/Shops/shopsSlice';
import { getExportSalesStart, getLocalSalesStart, resetData_distractions } from '../../redux/SalesReports/salesDistractionsSlice';


const ShowDistractions = () => {
const salesDistraction = useSelector((state) => state.salesDistraction);

const [report,setReport] = useState({
    saletype:"",
    local_saletype:"سوريا",
    brands_id:[],//list of brand
    categories_id:[],//list of categories
    country_id:null,//country
    salesperson_id:null,
    areas_id:[],
    governorate:null,
    shop_id:null



});
const optionBrands = useSelector((state) => state.brands.brands);
const optionCategories = useSelector((state) => state.categories.categories);
const optionAreas= useSelector((state) => state.areas.areas);
const salesPersons = useSelector((state) => state.salesPersons.salesPersons);
const shops = useSelector((state) => state.shops.shops);



const countries = useSelector((state) => state.countries);
const dispatch=useDispatch();
useEffect(()=>{
    console.log(`report.saletype is ${report.saletype}`)
    if(report.saletype === 'تصدير'){
        console.log(`report.saletype is ${report.saletype} in تصدير`)
        dispatch(getCountriesStart()); 

    }
     else if(report.saletype === 'محلي'){
        console.log(`report.saletype is ${report.saletype} in محلي`)

if(report.local_saletype === 'مندوبين'){
    dispatch(getAreasStart());
    dispatch(getsalesPersonsStart());

}
if(report.local_saletype === 'محلات'){
    dispatch(getShopsStart());
}

}
dispatch(getBrandsStart());
dispatch(getCategoriesStart());




},[report.saletype,report.local_saletype])


const [api, contextHolder] = message.useMessage();
useEffect(() => {
    if (salesDistraction.message != null) {
        api.success(salesDistraction.message);
        dispatch(resetData_distractions())
    }
    if (salesDistraction.error != null) {
        api.error(salesDistraction.error);
        dispatch(resetData_distractions())
    }
}, [salesDistraction.message, salesDistraction.error]);







    const List_governorate = [
        {
            value: '1',
            label: 'دمشق',
        },
        {
            value: '2',
            label: 'ريف دمشق',
        },
        {
            value: '3',
            label: 'حمص',
        },
        {
            value: '4',
            label: 'حماة',
        },
        {
            value: '5',
            label: 'حلب',
        },
        {
            value: '6',
            label: 'ادلب',
        },
        {
            value: '7',
            label: 'اللاذقية',
        },
        {
            value: '8',
            label: 'طرطوس',
        },
        {
            value: '9',
            label: 'درعا',
        },
        {
            value: '10',
            label: 'سويدا',
        },
        {
            value: '11',
            label: 'قنيطرة',
        },
        {
            value: '12',
            label: 'دير الزور',
        },
        {
            value: '13',
            label: 'حسكة',
        },
        {
            value: '14',
            label: 'الرقة',
        },
    ];


    const List_saleType=[
{
id:'1',
label:'تصدير'

},
{
id:'2',
label:'محلي'

},
{
    id:'3',
    label:'إجمالي'
}


    ];

    const List_localSalesType=[
        {
            id:'1',
            label:'مندوبين'
            
            },
            {
            id:'2',
            label:'محلات'
            
            },
            {
                id:'3',
                label:'محافظات'
            }
    ]

    

    const selected_governorate = (selectedValue) => {
    const selectedGov = List_governorate.find(gov => gov.value === selectedValue);
        if (selectedGov) {
            setReport(prevState => ({ ...prevState, governorate: selectedGov.label }));
        }
    };

    const selected_salesPersons= (selectedValue) => {
        setReport(prevState => ({ ...prevState, salesperson_id: selectedValue }));
    };

    const selected_country = (selectedValue)=>{
        console.log(`the country id is : ${selectedValue}`)
        setReport(prevState => ({...prevState ,country_id:selectedValue}));
    }

    const selected_shop = (selectedValue)=>{
        setReport(prevState => ({...prevState ,shop_id:selectedValue}));
    }

    


    const selected_saleType =(selectedValue) =>{
        const selectedSaleType = List_saleType.find(s => s.id === selectedValue)
        if(selectedSaleType){
            console.log(`the value is : ${selectedSaleType.label}`)
            setReport(prevState => ({ ...prevState, saletype: selectedSaleType.label }));
        }
    }

    const selected_localSaleType =(selectedValue) =>{
        const selectedSaleType = List_localSalesType.find(s => s.id === selectedValue)
        if(selectedSaleType){
            setReport(prevState => ({ ...prevState, local_saletype: selectedSaleType.label }));
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
      const onFinish = (e) => {
       
if(report.saletype == 'تصدير'){


 dispatch(getExportSalesStart(report))

}

else if( report.saletype == 'محلي'){

 dispatch(getLocalSalesStart(report))

}



      };



    

    return (
        <div className='conatiner_body'>
            {contextHolder}
            <Row>
                <h2>انحرافات المبيعات</h2>
            </Row>
            <div style={{ height: '20px' }}></div>
           
           <div style={{ width:'70%',padding:'20px'}}>
           <Form
                    layout="vertical"
                    hideRequiredMark
                    initialValues={{ price: 1000 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Row gutter={16}  >

{/* //---------------------------------نوع المبيع ---------------------------------------- */}

                    <Col span={12}>
                            <Form.Item
                                name="saletype"
                                label="نوع المبيع"
                                rules={[
                                    {
                                        required: true,
                                        message: 'ادخل  نوع المبيع!',
                                    },
                                ]}
                            >
                                <Select placeholder="ادخل نوع المبيع" onChange={selected_saleType}>
                                    {List_saleType.map((s) => (
                                        <Option key={s.id} value={s.id}>
                                            {s.label}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
{/* //----------------------------------المبيع المحلي ---------------------------------------- */}
                        <Col span={12}>
                            <Form.Item
                                name="local_saletype"
                                label="   نوع المبيع المحلي"
                               
                            >
                                <Select placeholder="ادخل نوع المبيع المحلي" onChange={selected_localSaleType}  disabled={report.saletype != 'محلي'}>
                                    {List_localSalesType.map((s) => (
                                        <Option key={s.id} value={s.id}>
                                            {s.label}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
  
                    </Row>
                    <Row gutter={16}>

 {/* ----------------------------------المحافظة  ---------------------------------------- */}

                    <Col span={12}>
                            <Form.Item
                                name="governorate"
                                label="المحافظة"
                                
                            >
                                <Select placeholder="ادخل اسم المحافظة" onChange={selected_governorate} disabled={report.local_saletype != 'محافظات'}>
                                    {List_governorate.map((gov) => (
                                        <Option key={gov.value} value={gov.value}>
                                            {gov.label}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
 {/* //----------------------------------المدينة  ---------------------------------------- */}

                        <Col span={12}>
                            <Form.Item
                                name="country_id"
                                label=" المدينة"
                                
                            >
                                <Select placeholder="ادخل اسم المدينة" onChange={selected_country} disabled={report.saletype != 'تصدير'} >
                                    {countries.countries.map((c) => (
                                        <Option key={c.id} value={c.id}>
                                            {c.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>


                     
                       
                    </Row>
                    <Row gutter={16}>
 {/* //----------------------------------الأصناف  -------------------------------------- */}
                    <Col span={12}>
                        
                        <Form.Item
          name="categories_id"
          label="الأصناف"
          
        >
          <Select
            mode="multiple"
            placeholder=" الأصناف"
            optionLabelProp="label"
            onChange={(value) => {
              const selectedValues = Array.isArray(value) ? value : [value];
              const ids_categories = selectedValues.map((value) => {
                const option = optionCategories.find((option) => option.name === value);
                return option ? option.id : null;
              });
              console.log(`the categories id is : ${ids_categories}`)

              setReport({ ...report, categories_id: ids_categories })
            }}
          >
            {optionCategories.map((option) => (
              <Option key={option.id} value={option.name} label={option.name}>
                {option.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
                        </Col>
 {/* //----------------------------------الماركات  -------------------------------------- */}

                        <Col span={12}>
                        
                        <Form.Item
          name="brands_id"
          label="الماركات"
         
        >
          <Select
            mode="multiple"
            placeholder=" الماركات"
            optionLabelProp="label"
            onChange={(value) => {
              const selectedValues = Array.isArray(value) ? value : [value];
              const ids_brands = selectedValues.map((value) => {
                const option = optionBrands.find((option) => option.name === value);
                return option ? option.id : null;
              });
              console.log(`the brands id is : ${ids_brands}`)

              setReport({ ...report, brands_id: ids_brands })
            }}
          >
            {optionBrands.map((option) => (
              <Option key={option.id} value={option.name} label={option.name}>
                {option.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
                        </Col>
                      
                    </Row>

                    <Row gutter={16}>
{/* //----------------------------------المندوبين  -------------------------------------- */}

                    <Col span={12}>
                            <Form.Item
                                name="salesperson_id"
                                label="المندوب"
                                
                            >
                                <Select placeholder="ادخل اسم المندوب" onChange={selected_salesPersons} disabled={report.local_saletype != 'مندوبين'}>
                                {salesPersons.map((s) => (
                                        <Option key={s.id} value={s.id}>
                                            {`${s.first_name} ${s.last_name}`}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

 {/* //----------------------------------المناطق  -------------------------------------- */}

                        <Col span={12}>
                            <Form.Item
                                name="areas_id"
                                label="المناطق"
                                
                            >

<Select  disabled={report.local_saletype != 'مندوبين'}
            mode="multiple"
            placeholder=" المناطق"
            optionLabelProp="label"
            onChange={(value) => {
              const selectedValues = Array.isArray(value) ? value : [value];
              const ids_areas = selectedValues.map((value) => {
                const option = optionAreas.find((option) => option.name === value);
                return option ? option.id : null;
              });
              setReport({ ...report, areas_id: ids_areas })
            }}
          >
            {optionAreas.map((option) => (
              <Option key={option.id} value={option.name} label={option.name}>
                {option.name}
              </Option>
            ))}
          </Select>
                               
                            </Form.Item>
                        </Col>


                     
                       
                    </Row>


<Row gutter={16} justify="start">
<Col span={12}>
                            <Form.Item
                                name="shop_id"
                                label="المحل"
                                
                            >
                                <Select placeholder="ادخل اسم المحل" onChange={selected_shop} disabled={report.local_saletype != 'محلات'}>
                                    {shops.map((s) => (
                                        <Option key={s.id} value={s.id}>
                                            {s.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col>
                        </Col>

</Row>

    {/* //----------------------------------Button  -------------------------------------- */}

                    <Row gutter={16} justify="end">
                       

                    <Button
                                    type="primary"
                                    htmlType="submit"
                                  
                                style={{width:'20%'}}>إرسال</Button>
                       
                      
                    </Row>
                </Form>

           </div>






        </div>
    )
}

export default ShowDistractions