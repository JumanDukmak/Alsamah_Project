import { Button, Col, Select, Row, Space, Table, message, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddInitialMaterialInventory from './AddInitialMaterialInventory';
import { getMaterialsInventoryFetch, resetData_MaterialsInventory } from '../../redux/InitialMaterialsInventory/initialMaterialsInventorySlice';
import moment from 'moment';
import UpdateInitialMaterialInventory from './UpdateInitialMaterialInventory';

const InitialMaterialsInventory = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const materialsInventory = useSelector((state) => state.materialsInventory.materialsInventory);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [openUpdate, setOpenUpdate] = useState(false);
    
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

    const new_data = {
        type: data_filtering.type,
        year: data_filtering.year,
    }

    useEffect(() => {
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
                render: (r, record) => 
                    <Space size="large">
                    <Button
                        type="link"
                        onClick={() => {
                            setSelectedItemId(record.inventory_id);
                            setOpenUpdate(true);
                        }}
                    >
                        تعديل
                    </Button>
                    <a style={{ color: 'red' }}>حذف</a>
                </Space>
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

    const [old_items, setOldItems] = useState([]);
    useEffect(() => {
        if (materialsInventory.length > 1) {
            const newList = materialsInventory.flatMap(product => 
                Object.values(product.monthly_inventory).flatMap(monthlyItems => 
                    monthlyItems.map(item => ({
                        inventory_id: item.inventory_id,
                        quantity: item.quantity,
                        inventory_date: item.date,
                    }))
                )
            );
            setOldItems(newList);
        }
    }, [materialsInventory]);

    return (
        <div className='conatiner_body'>
            {contextHolder}
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
            rowKey='initialMaterial_id'
            bordered
            columns={columns} 
            dataSource={materialsInventory}
            expandable={{ expandedRowRender }}
            pagination={false}
            />
            <AddInitialMaterialInventory
            open={open}
            onClose={() => setOpen(false)}
            new_data={new_data}
            />

            {selectedItemId && (
                <UpdateInitialMaterialInventory
                id={selectedItemId}
                open={openUpdate}
                onClose={() => {
                setOpenUpdate(false);
                }} 
                old_items={old_items}
                new_data={new_data}
                />
            )}
        </div>
    )
}

export default InitialMaterialsInventory
