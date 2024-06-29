import { Button, Col, Select, Row, Space, Table, message, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { json, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { getMachineProductivityFetch, resetData_MachineProductivity } from '../../redux/MachineProductivity/MachineProductivitySlice';
import { getCategoriesStart } from '../../redux/Category/categoriesSlice';
import AddActualProduction from './AddActualProduction';
import UpdateActualProduction from './UpdateActualProduction';

const MachineProductivity = () => {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const machineProductivity =  useSelector((state) => state.machineProductivity.machineProductivity);
    const [selectedItemId, setSelectedItemId] = useState(null);

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

    const [old_items, setOldItems] = useState([]);
    useEffect(() => {
        if (machineProductivity) {
            const newList = machineProductivity.flatMap(product => 
                Object.values(product.monthly_actual_production).flatMap(monthlyItems => 
                    monthlyItems.map(item => ({
                        machine_productivity_id: item.machine_productivity_id,
                        value: item.actual_productivity,
                        date: item.date,
                    }))
                )
            );
            setOldItems(newList);
        }
    }, [machineProductivity]);


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
        dispatch(getMachineProductivityFetch(new_data));
           
    }, [data_filtering]);

   

    const expandedRowRender = (record) => {
        const columns = [
            { title: 'الشهر', dataIndex: 'month', key: 'month',
                //render: (text) => getMonthName(text),
                render: (text, row, index) => {
                const obj = {
                    children: getMonthName(text),
                    props: {},
                };
                if (index === 0 || text !== mergedData[index - 1].month) {
                    const count = mergedData.filter(item => item.month === text).length;
                    obj.props.rowSpan = count;
                } else {
                    obj.props.rowSpan = 0;
                }
                
                return obj;
            } },
            { title: 'تاريخ التخزين', dataIndex: 'date', key: 'date' },
            { title: 'الإنتاج الفعلي', dataIndex: 'actual_productivity', key: 'actual_productivity' },
            { title: 'العملية', key: 'operation',
                width: 289,
                render: (_,record) => 
                        <Button type="link" onClick={() => {
                            setSelectedItemId(record.machine_productivity_id);
                            setOpen2(true)
                        }}>
                            تعديل
                        </Button>
                ,
            },
        ];

        const mergedData = [];
        for (const [month, _machine_productivity] of Object.entries(record.monthly_actual_production)) {
            _machine_productivity.forEach(item => {
                mergedData.push({ ...item, month });
            });
        }
        return <Table columns={columns} dataSource={mergedData} pagination={false} rowKey="machine_productivity_id" />;
    };
    
    const columns = [
        { title: 'اسم  المنتج', dataIndex: 'product_name', key: 'product_name' },
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

    return (
        <div className='conatiner_body'>
            {/* {contextHolder} */}
            <Row>
                <Col span={6}>
                    <h2>إنتاجية الآلات   </h2>
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
                <Col span={6} style={{textAlign: 'center'}}>
                    <Button 
                    type="primary"
                    size='middle'
                    style={{ fontWeight: '700' }}
                    onClick={() => setOpen(true)}
                    icon={<PlusOutlined />}
                    >إضافة إنتاج فعلي
                    </Button>
                </Col>
            </Row>
            <div style={{ height: '20px' }} />
            <Table 
            rowKey='product_id'
            bordered
            columns={columns} 
            dataSource={machineProductivity}
            expandable={{ expandedRowRender }}
            pagination={false}
            />
            <AddActualProduction
            open={open}
            onClose={() => setOpen(false)}
            new_data={{
                category: data_filtering.category,
                year: data_filtering.year,
            }}
            />
            {selectedItemId &&(
                <UpdateActualProduction
             
             open={open2}
             onClose={() => setOpen2(false)} 
             new_data={{
                 category: data_filtering.category,
                 year: data_filtering.year,
             }}
             old_items={old_items}
             id={selectedItemId}
             />)}
            
        </div>
    )
}

export default MachineProductivity
