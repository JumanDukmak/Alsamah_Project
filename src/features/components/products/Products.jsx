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
            title: 'رمز المادة الإجمالية',
            dataIndex: 'code',
            key: 'code',
            onCell: (record, rowIndex) => {
                return {
                    onClick: () => {
                        setSelectedItemId(record.id)
                    },
                };
            },
        },
        {
            title: 'اسم المادة الإجمالية',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'الوحدة',
            dataIndex: 'unit',
            key: 'unit',
        },
        {
            title: 'المجموعة',
            dataIndex: 'category_name',
            key: 'category_name',
        },
        {
            title: 'الماركة',
            dataIndex: 'brand_name',
            key: 'brand_name',
        },
        {
            title: 'زمن الفردة',
            dataIndex: 'time_per_piece',
            key: 'time_per_piece',
        },
        {
            title: 'السعر المحلي',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'العملية',
            key: 'operation',
           
            render: (_,record) => 
                <Space size="large">
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
                x: 5
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
