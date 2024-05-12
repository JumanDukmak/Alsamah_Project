import { Button, Col, Row, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddFinancialExpenses from './AddFinancialExpenses';
import { getFinancialExpensesFetch, resetData_financialExpenses } from '../../redux/FinancialExpenses/financialExpensesSlice';

const columns = [
    {
        title: 'رقم العمل',
        dataIndex: 'working_number',
        key: 'working_number',
        fixed: 'left',
        width: 110,
    },
    {
        title: 'فئة العمل',
        dataIndex: 'work_category',
        key: 'work_category',
        fixed: 'left',
        width: '12%',
    },
    {
        title: 'عدد العمال',
        dataIndex: 'num_of_employees',
        key: 'num_of_employees',
        width: 120,
    },
    {
        title: 'تكلفة النقل',
        dataIndex: 'transport_cost',
        key: 'transport_cost',
        width: 110,
    },
    {
        title: 'الاستقالة والتأمينات',
        dataIndex: 'resignation_and_insurance',
        key: 'resignation_and_insurance',
        width: 170,
    },
    {
        title: 'تأمين صحي',
        dataIndex: 'health_insurance',
        key: 'health_insurance',
        width: 110,
    },
    {
        title: 'المستحق للصرف',
        dataIndex: 'eligible_for_disbursement',
        key: 'eligible_for_disbursement',
        width: 150,
    },
    {
        title: 'الراتب الأساسي',
        dataIndex: 'basic_salary_with_increase',
        key: 'basic_salary_with_increase',
        width: 140,
    },
    {
        title: 'الراتب الكلي',
        dataIndex: 'total_salary',
        key: 'total_salary',
        width: 110,
    },
    {
        title: 'الحافز',
        dataIndex: 'incentives_with_increase',
        key: 'incentives_with_increase',
        width: 100,
    },
    {
        title: 'العيادي',
        dataIndex: 'gifts',
        key: 'gifts',
        width: 100,
    },
    {
        title: 'إجمالي الكلفة السنوية',
        dataIndex: 'total_cost',
        key: 'total_cost',
        width: 200,
    },
    {
        title: 'أيام العمل المخصومة',
        dataIndex: 'discounted_working_days',
        key: 'discounted_working_days',
        width: 180,
    },
    {
        title: 'قيمة الخصم',
        dataIndex: 'discount_value',
        key: 'discount_value',
        width: 110,
    },
    {
        title: 'العملية',
        key: 'operation',
        width: 100,
        fixed: 'right',
        render: () => <a>action</a>,
    },
];

const FinancialExpenses = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const financialExpenses = useSelector((state) => state.financialExpenses)

    useEffect(() => {
        dispatch(getFinancialExpensesFetch())
    }, [])

    const [api, contextHolder] = message.useMessage();
    useEffect(() => {
        if (financialExpenses.message != null) {
            api.success(financialExpenses.message);
            dispatch(resetData_financialExpenses())
        }
        if (financialExpenses.error != null) {
            api.error(financialExpenses.error);
            dispatch(resetData_financialExpenses())
        }
    }, [financialExpenses.message, financialExpenses.error]);
    const showModal = () => {
        setOpen(true);
    };

    return (
        <div className='conatiner_body'>
            {contextHolder}
            <Row>
                <Col span={6}>
                    <h2>النفقات المالية</h2>
                </Col>
                <Col span={12} />
                <Col span={6} style={{textAlign: 'center'}}>
                    <Button 
                    type="primary"
                    size='middle'
                    style={{ fontWeight: '700' }}
                    onClick={showModal}
                    icon={<PlusOutlined />}
                    >إضافة النفقات المالية
                    </Button>
                    <AddFinancialExpenses
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
            dataSource={financialExpenses.financialExpenses}
            pagination={false}
            scroll={{
                x: 2100
            }}
            />
            <div style={{ height: '50px' }} />
        </div>
    )
}

export default FinancialExpenses