import { Button, Col, Select, Row, Space, Table, message, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from 'react-redux';
import { json, useNavigate } from 'react-router-dom';
import moment from 'moment';
import {  resetData_MachineProductivity,getComparisonBetweenActual_ExpectedFetch } from '../../redux/MachineProductivity/MachineProductivitySlice';
import { getCategoriesStart } from '../../redux/Category/categoriesSlice';


const Actual_Expected = () => {
 

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const machineProductivity =  useSelector((state) => state.machineProductivity);
    
    const months = [
        "كانون الثاني",
        "شباط",
        "آذار",
        "نيسان",
        "أيار",
        "حزيران",
        "تموز",
        "آب",
        "أيلول",
        "تشرين الأول",
        "تشرين الثاني",
        "كانون الأول",
    ];

 


    const categories = useSelector((state) => state.categories.categories);

    const selected_category = (selectedValue) => {
    
            setData_filtering(data_filtering => ({ ...data_filtering, category: selectedValue }));


    };

    const getMonthName = (monthNumber) => {
        return months[monthNumber - 1];
    };

    const [data_filtering, setData_filtering] = useState({
        category: 2,
        year: new Date().getFullYear().toString(),
    });

    useEffect(()=>{
        dispatch(getCategoriesStart());
    },[])

    useEffect(() => {
        const new_data = {
            category: data_filtering.category,
            year: data_filtering.year,
        }
        dispatch(getComparisonBetweenActual_ExpectedFetch(new_data));
      
    }, [data_filtering]);

   

  
    const columns = [
        {
          title: "الشهر",
          dataIndex: "month",
          key: "month",
          render: (text) => getMonthName(text),
        },
    
        {
          title: "المنتج ",
          dataIndex: "product_name",
          key: "product_name",
        },
        {
          title: " إجمالي الإنتاج الفعلي",
          dataIndex: "total_actual_production",
          key: "total_actual_production",
          render: (text) => {
            const value = parseFloat(text); // Convert text to a number
            let color = "";
            let arrowIcon = null;
    
            if (value > 0) {
              color = "green";
              arrowIcon = <ArrowUpOutlined />;
            } else if (value < 0 || value == 0) {
              color = "red";
              arrowIcon = <ArrowDownOutlined />;
            }
            return (
              <span style={{ color }}>
                {arrowIcon} {text}
              </span>
            );
          },
        },
    
        {
          title: "الإنتاج المتوقع",
          dataIndex: "expected_production",
          key: "expected_production",
        },
    
        {
          title: "  الفرق ",
          dataIndex: "difference",
          key: "difference",
        },
    
        {
          title: "نسبة الفرق",
          dataIndex: "ratio_of_difference",
          key: "ratio_of_difference",
        },
        
      ];

    const [api, contextHolder] = message.useMessage();
    useEffect(() => {
        if (machineProductivity.message != null) {
            api.success(machineProductivity.message);
            dispatch(resetData_MachineProductivity())
        }
        if (machineProductivity.error != null) {
            api.error(machineProductivity.error);
            dispatch(resetData_MachineProductivity())
        }
    }, [machineProductivity.message, machineProductivity.error]);

    console.log(machineProductivity);

    return (
        <div className='conatiner_body'>
            {/* {contextHolder} */}
            <Row>
                <Col span={8}>
                    <h2>مقارنة الانتاج الفعلي والمتوقع للآلات   </h2>
                </Col>
                <Col span={12}>
                    <Space>
                        <Select
                        placeholder="النوع"
                        style={{ width: '130px'}}
                        onChange={selected_category}
                        defaultValue={data_filtering.category}
                        >
                        {categories.map((c) => (
                            <Option key={c.id} value={c.id}>
                            {c.name}
                          </Option>
                        ))}
                        </Select>

                        <DatePicker
                        picker="year"
                        placeholder="السنة"
                        onChange={(value) => {
                            setData_filtering({
                            ...data_filtering,
                            year: value ? value.format('YYYY') : new Date().getFullYear(),
                            });
                        }}
                        defaultValue={moment(data_filtering.year, 'YYYY')}
                        />
                    </Space>
                </Col>
            
            </Row>
            <div style={{ height: '20px' }} />
           
            <Table
          rowKey="id"
          bordered
          columns={columns}
          dataSource={machineProductivity.comparison.result}
          pagination={{ pageSize: 12, showSizeChanger: false }}
        />




        </div>
    )
}

export default Actual_Expected
