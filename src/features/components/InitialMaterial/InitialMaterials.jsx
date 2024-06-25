import { Button, Col, Row, Space, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddInitialMaterial from './AddInitialMaterial';
import { getInitialMaterialsFetch, resetData_initialMaterials } from '../../redux/InitialMaterials/initialMaterialsSlice';

const columns = [
    {
        title: 'رقم المادة',
        dataIndex: 'material_number',
        key: 'material_number',
    },
    {
        title: 'اسم المادة',
        dataIndex: 'material_name',
        key: 'material_name',
    },
    {
        title: 'النوع',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'مدة التخزين',
        dataIndex: 'storage_period',
        key: 'storage_period',
    },
    {
        title: 'البضاعة في الطريق',
        dataIndex: 'shipping_installation_duration',
        key: 'shipping_installation_duration',
    },
    {
        title: 'السعر ( ل س )',
        dataIndex: 'SYP',
        key: 'SYP',
    },
    {
        title: 'السعر ( $ )',
        dataIndex: 'priceD',
        key: 'priceD',
    },
    {
        title: 'العملية',
        key: 'operation',
        render: () => 
            <Space size="large">
                <a>تعديل</a>
                <a style={{color: 'red'}}>حذف</a>
            </Space>
        ,
    },
];

const InitialMaterials = () => {
    const dispatch = useDispatch();
    const initialMaterials = useSelector((state) => state.initialMaterials);

    useEffect(() => {
        dispatch(getInitialMaterialsFetch());
    }, []);

    const [api, contextHolder] = message.useMessage();
    useEffect(() => {
        if (initialMaterials.message) {
            api.success(initialMaterials.message);
            dispatch(resetData_initialMaterials());
        }
        if (initialMaterials.error) {
            api.error(initialMaterials.error);
            dispatch(resetData_initialMaterials());
        }
    }, [initialMaterials.message, initialMaterials.error]);

    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    return (
        <div className='conatiner_body'>
            {contextHolder}
            <Row>
                <Col span={6}>
                    <h2>المواد الأولية</h2>
                </Col>
                <Col span={12} />
                <Col span={6} style={{textAlign: 'center'}}>
                    <Button 
                    type="primary"
                    size='middle'
                    style={{ fontWeight: '700' }}
                    onClick={showModal}
                    icon={<PlusOutlined />}
                    >إضافة المواد الأولية
                    </Button>
                    <AddInitialMaterial
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
            dataSource={initialMaterials.initialMaterials}
            pagination={false}
            />
            <div style={{ height: '50px' }} />
        </div>
    )
}

export default InitialMaterials