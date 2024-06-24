import { Button, Col, Select, Row, Space, Table, message, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddInitialMaterialInventory from './AddInitialMaterialInventory';
import { getMaterialsInventoryFetch, resetData_MaterialsInventory } from '../../redux/InitialMaterialsInventory/initialMaterialsInventorySlice';
import moment from 'moment';

const InitialMaterialsInventory = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const materialsInventory = useSelector((state) => state.materialsInventory.materialsInventory);
    
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

    const List_type = [
        {
            value: '1',
            label: 'خيوط',
        },
        {
            value: '2',
            label: 'أصبغة',
        },
        {
            value: '3',
            label: 'مواد التعبئة',
        },
    ];

    const getMonthName = (monthNumber) => {
        return months[monthNumber - 1];
    };

    const [data_filtering, setData_filtering] = useState({
        type: 'خيوط',
        year: new Date().getFullYear().toString(),
    });

    useEffect(() => {
        const new_data = {
            type: data_filtering.type,
            year: data_filtering.year,
        }
        dispatch(getMaterialsInventoryFetch(new_data));
    }, [data_filtering]);

    const selected_type = (selectedValue) => {
        const selectedtype = List_type.find(pie => pie.value === selectedValue);
        if (selectedtype) {
            setData_filtering(data_filtering => ({ ...data_filtering, type: selectedtype.label }));
        }
    };

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
            { title: 'الكمية', dataIndex: 'quantity', key: 'quantity' },
            { title: 'العملية', key: 'operation',
                width: 289,
                render: (_,record) => 
                        <Button type="link" onClick={() => {
                            // setSlelectedId_f_DirectCost(record.id);
                            // setOpen3(true);
                        }}>
                            تعديل
                        </Button>
                ,
            },
        ];

        const mergedData = [];
        for (const [month, inventory] of Object.entries(record.monthly_inventory)) {
            inventory.forEach(item => {
                mergedData.push({ ...item, month });
            });
        }
        return <Table columns={columns} dataSource={mergedData} pagination={false} rowKey="inventory_id" />;
    };
    
    const columns = [
        { title: 'اسم المادة الأولية', dataIndex: 'material_name', key: 'material_name' },
    ];

    const [api, contextHolder] = message.useMessage();
    useEffect(() => {
        if (materialsInventory.message != null) {
            api.success(materialsInventory.message);
            dispatch(resetData_MaterialsInventory())
        }
        if (materialsInventory.error != null) {
            api.error(resetData_MaterialsInventory.error);
            dispatch(resetData())
        }
    }, [materialsInventory.message, materialsInventory.error]);

    return (
        <div className='conatiner_body'>
            {/* {contextHolder} */}
            <Row>
                <Col span={6}>
                    <h2>مخزون المواد الأولية</h2>
                </Col>
                <Col span={12}>
                    <Space>
                        <Select
                        placeholder="النوع"
                        style={{ width: '130px'}}
                        onChange={selected_type}
                        defaultValue={data_filtering.type}
                        >
                        {List_type.map((pie) => (
                            <Option key={pie.value} value={pie.value}>
                                {pie.label}
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
                    >إضافة مخزون مواد جديد
                    </Button>
                </Col>
            </Row>
            <div style={{ height: '20px' }} />
            <Table 
            rowKey='id'
            bordered
            columns={columns} 
            dataSource={materialsInventory}
            expandable={{ expandedRowRender }}
            pagination={false}
            />
            <AddInitialMaterialInventory
            open={open}
            onClose={() => setOpen(false)}
            />
        </div>
    )
}

export default InitialMaterialsInventory
