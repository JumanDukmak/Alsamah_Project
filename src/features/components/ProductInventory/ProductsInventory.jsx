import { Button, Col, Pagination, Row, Space, Table, message, Select, DatePicker, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddProductInventory from './AddProductInventory';
import { getProductsInventoryFetch, resetData_ProductsInventory } from '../../redux/productInventory/productInventorySlice';
import moment from 'moment';

const ProductsInventory = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categories = useSelector((state) => state.categories);
    const productsInventories = useSelector((state) => state.productsInventory.productsInventory);
    
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
    
    const getMonthName = (monthNumber) => {
        return months[monthNumber - 1];
    };

    const [data_filtering, setData_filtering] = useState({
        category: categories.categories.length > 0 ? categories.categories[0].id : null,
        year: new Date().getFullYear().toString(),
    });

    useEffect(() => {
        const new_data = {
            category: data_filtering.category,
            year: data_filtering.year,
        }
        dispatch(getProductsInventoryFetch(new_data));
    }, [data_filtering]);

    const selected_category_id = (selectedValue) => {
        setData_filtering(prevState => ({ ...prevState, category: selectedValue }));
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
        { title: 'اسم المنتج', dataIndex: 'product_name', key: 'product_name' },
    ];

    const [api, contextHolder] = message.useMessage();
    useEffect(() => {
        if (productsInventories.message != null) {
            api.success(productsInventories.message);
            dispatch(resetData_ProductsInventory())
        }
        if (productsInventories.error != null) {
            api.error(productsInventories.error);
            dispatch(resetData_ProductsInventory())
        }
    }, [productsInventories.message, productsInventories.error]);

    return (
        <div className='conatiner_body'>
            {contextHolder}
            <Row>
                <Col span={6}>
                    <h2>مخزون المنتجات</h2>
                </Col>
                <Col span={12}>
                    <Space>
                        <Select
                        placeholder="الصنف"
                        style={{ width: '130px'}}
                        onChange={selected_category_id}
                        defaultValue={data_filtering.category}
                        >
                        {categories.categories.map((cat) => (
                            <Option key={cat.id} value={cat.id}>
                                {cat.name}
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
                    >إضافة مخزون منتج جديد
                    </Button>
                </Col>
            </Row>
            <div style={{ height: '20px' }} />
            <Table 
            bordered
            columns={columns} 
            dataSource={productsInventories}
            expandable={{ expandedRowRender }}
            rowKey="product_id"
            pagination={false}
            />
            <AddProductInventory
            open={open}
            onClose={() => setOpen(false)}
            />
        </div>
    )
}

export default ProductsInventory