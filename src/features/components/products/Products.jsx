import { Button, Col, Pagination, Row, Space, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import ProductCreate from './ProductCreate';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsFetch, resetData } from '../../redux/products/productSlice';
import { useNavigate } from 'react-router-dom';
import ShowProduct from './ShowProduct';
import AddMaterialProduct from '../InitialMaterialsProduct/AddMaterialsProduct';
import AddDirectWork from '../DirectWork/AddDirectWork';

const Products = () => {
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [selectedId_f_Material, setSelectedId_f_Material] = useState(null);
    const [selectedId_f_DirectCost, setSlelectedId_f_DirectCost] = useState(null);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector((state) => state.products)

    const columns = [
        {
            title: 'رمز المادة',
            dataIndex: 'code',
            key: 'code',
            width: 110,
            fixed: 'left',
            onCell: (record) => {
                return {
                    onClick: () => {
                        setSelectedItemId(record.id)
                    },
                };
            },
        },
        {
            title: 'اسم المادة',
            dataIndex: 'name',
            key: 'name',
            width: 120,
            fixed: 'left',
        },
        {
            title: 'المصاريف الصناعية الغير مباشرة',
            dataIndex: 'indirect_industrialSum',
            key: 'indirect_industrialSum',
            width: 220,
        },
        {
            title: 'كلفة اليد العاملة',
            dataIndex: 'total_WorkForce',
            key: 'total_WorkForce',
            width: 135,
        },
        {
            title: 'كلفة الآلات واليد العاملة',
            dataIndex: 'indirect_costPerDozenSum',
            key: 'indirect_costPerDozenSum',
            width: 180,
        },
        {
            title: 'كلفة قسم الفرق',
            dataIndex: 'faraqTypeSum',
            key: 'faraqTypeSum',
            width: 135,
        },
        {
            title: 'كلفة قسم الحبكة والفرق',
            dataIndex: 'direct_costPerDozenSum',
            key: 'direct_costPerDozenSum',
            width: 185,
        },
        {
            title: 'كلفة الخيط',
            dataIndex: 'sum_of_thread_cost',
            key: 'sum_of_thread_cost',
            width: 100,
        },
        {
            title: 'كلفة الصباغ',
            dataIndex: 'sum_of_colo_cost',
            key: 'sum_of_colo_cost',
            width: 105,
        },
        {
            title: 'التكلفة الكلية',
            dataIndex: 'total_cost',
            key: 'total_cost',
            width: 115,
        },
        {
            title: 'التكلفة بعد الهدر',
            dataIndex: 'total_cost_after_wastage',
            key: 'total_cost_after_wastage',
            width: 135,
        },
        {
            title: 'السعر المحلي',
            dataIndex: 'price',
            key: 'price',
            width: '120'
        },
        {
            title: 'العملية',
            key: 'operation',
            width: 289,
            fixed: 'right',
            render: (_,record) => 
                <Space>
                    <Button type="link" onClick={() => {
                        setSelectedId_f_Material(record.id);
                        setOpen2(true);
                    }}>
                        إضافة مواد أولية
                    </Button>

                    <Button type="link" onClick={() => {
                        setSlelectedId_f_DirectCost(record.id);
                        setOpen3(true);
                    }}>
                        إضافة قوى عاملة
                    </Button>
                </Space>
            ,
        },
    ];

    useEffect(() => {
        selectedItemId && (
            navigate('/show/product/'+ selectedItemId, { state: selectedItemId })
        )
    }, [selectedItemId])
    useEffect(() => {
        dispatch(getProductsFetch(currentPage))
    }, [])

    const [api, contextHolder] = message.useMessage();
    useEffect(() => {
        if (products.message != null) {
            api.success(products.message);
            dispatch(resetData())
        }
        if (products.error != null) {
            api.error(products.error);
            dispatch(resetData())
        }
    }, [products.message, products.error]);

    return (
        <div className='conatiner_body'>
            {contextHolder}
            <Row>
                <Col span={6}>
                    <h2>المنتجات</h2>
                </Col>
                <Col span={12} />
                <Col span={6} style={{textAlign: 'center'}}>
                    <Button 
                    type="primary"
                    size='middle'
                    style={{ fontWeight: '700' }}
                    onClick={() => setOpen(true)}
                    icon={<PlusOutlined />}
                    >إضافة منتج جديد
                    </Button>
                </Col>
            </Row>
            <div style={{ height: '20px' }} />
            <Table 
            rowKey='id'
            bordered
            columns={columns} 
            dataSource={products.products}
            pagination={false}
            scroll={{
                x: 1940
            }}
            // onRow={(record, rowIndex) => {
            //     return {
            //         onClick: () => {
            //             setSelectedItemId(record.id)
            //         } 
            //     };
            // }}
            />
            <AddMaterialProduct
        id={selectedId_f_Material}
        open={open2}
        onClose={() => {
            setOpen2(false);
        }}
        />
        <AddDirectWork
        id={selectedId_f_DirectCost}
        open={open3}
        onClose={() => {
            setOpen3(false);
        }}
        />
            <div style={{ height: '50px' }} />
            <Pagination 
                current={products.meta.current_page_number} 
                total={products.meta.total_item_count}
                showTotal={(total) => `${total} منتج`}
                showSizeChanger={false}
                pageSize={products.meta.items_per_page}
                onChange={ (page) => {
                    setCurrentPage(page); // Update current page
                    dispatch(getProductsFetch(page))
                }
            }
            />
            <ProductCreate
            open={open}
            onClose={() => setOpen(false)}
            currentPage={currentPage}
            />
        </div>
    )
}

export default Products;
