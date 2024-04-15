import { Button, Col, Pagination, Row, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import ProductCreate from './ProductCreate';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsFetch } from '../../redux/products/productSlice';
import { useNavigate } from 'react-router-dom';

const columns = [
    {
        title: 'رمز المادة الإجمالية',
        dataIndex: 'code',
        key: 'code',
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
        title: 'السعر المحلي',
        dataIndex: 'price',
        key: 'price',
    },
    //للتجريب فقط
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
    },
];

const Products = () => {
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products)
    
    const onChange = (page) => {
        setCurrentPage(page); // Update current page
        dispatch(getProductsFetch(page))
    };

    return (
        <div className='conatiner_body'>
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
            columns={columns} 
            dataSource={products.products}
            pagination={false}
            />
            <div style={{ height: '50px' }} />
            <Pagination 
                current={products.meta.current_page_number} 
                total={products.meta.total_item_count} 
                showTotal={(total) => `${total} منتج`}
                showSizeChanger={false}
                pageSize={products.meta.items_per_page}
                onChange={onChange}
                style={{direction: 'ltr'}}
            />
            <ProductCreate
            open={open}
            onClose={() => setOpen(false)}
            />
        </div>
    )
}

export default Products;
