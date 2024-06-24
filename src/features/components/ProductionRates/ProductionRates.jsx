import { Button, Col, Row, Space, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddProductionRates from './AddProductionRates';
import { getProductionRatesFetch, resetData_productionRates } from '../../redux/ProductionRates/productionRatesSlice';
import UpdateProductionRates from './UpdateProductionRates';

const ProductionRates = () => {
    const dispatch = useDispatch();
    const productionRates = useSelector((state) => state.productionRates);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [openUpdate, setOpenUpdate] = useState(false);
    useEffect(() => {
        dispatch(getProductionRatesFetch());
    }, []);

    const [api, contextHolder] = message.useMessage();
    useEffect(() => {
        if (productionRates.message) {
            api.success(productionRates.message);
            dispatch(resetData_productionRates());
        }
        if (productionRates.error) {
            api.error(productionRates.error);
            dispatch(resetData_productionRates());
        }
    }, [productionRates.message, productionRates.error]);

    const columns = [
        {
            title: 'رقم العمل',
            dataIndex: 'working_number',
            key: 'working_number',
        },
        {
            title: 'نوع العمل',
            dataIndex: 'working_type',
            key: 'working_type',
        },
        {
            title: 'الانتاج اليومي',
            dataIndex: 'daily_production',
            key: 'daily_production',
        },
        {
            title: 'فئة العمل',
            dataIndex: 'working_category',
            key: 'working_category',
        },
        {
            title: 'العملية',
            key: 'operation',
            render: (r, record) => 
                <Space size="large">
                    <Button type="link" onClick={() => {
                    setSelectedItemId(record.id);
                    setOpenUpdate(true);
                    }}>
                    تعديل
                    </Button>
                    <a style={{color: 'red'}}>حذف</a>
                </Space>
            ,
        },
    ];

    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };

    return (
        <div className='conatiner_body'>
            {contextHolder}
            <Row>
                <Col span={6}>
                    <h2>معدلات الإنتاج</h2>
                </Col>
                <Col span={12} />
                <Col span={6} style={{textAlign: 'center'}}>
                    <Button 
                    type="primary"
                    size='middle'
                    style={{ fontWeight: '700' }}
                    onClick={showModal}
                    icon={<PlusOutlined />}
                    >إضافة معدلات الإنتاج
                    </Button>
                    <AddProductionRates
                    open={open}
                    onClose={() => {
                        setOpen(false);
                    }}
                    />
                </Col>
            </Row>
            <div style={{ height: '20px' }} />
            <Table 
            rowKey='id'
            bordered
            columns={columns} 
            dataSource={productionRates.productionRates}
            pagination={false}
            />

            {selectedItemId && (
                <UpdateProductionRates
                id={selectedItemId}
                open={openUpdate}
                onClose={() => {
                setOpenUpdate(false);
                }} 
                />
            )}
            <div style={{ height: '50px' }} />
        </div>
    )
}

export default ProductionRates