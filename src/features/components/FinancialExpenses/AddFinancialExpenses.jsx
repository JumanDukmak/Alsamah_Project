import { Button, Col, Input, Row, Form, Select, Space, Drawer, InputNumber, message, Typography } from "antd"
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFinancialExpensesFetch, resetData_financialExpenses } from "../../redux/FinancialExpenses/financialExpensesSlice";

const AddFinancialExpenses = ({ open, onClose }) => {
    const { Title } = Typography;
    const dispatch = useDispatch();
    const financialExpenses = useSelector((state) => state.financialExpenses);
    const [financialExpens, setfinancialExpenses] = useState({
        working_number: null,
        work_category: "",
        num_of_employees: null,
        transport_cost: null,
        health_insurance: null,
        basic_salary: null,
        incentives: null,
        discounted_working_days: null,
    });

    const [api, contextHolder] = message.useMessage();
    useEffect(() => {
        if (financialExpenses.message != null) {
        api.success(financialExpenses.message);
        dispatch(resetData_financialExpenses());
        }
        if (financialExpenses.error != null) {
        api.error(financialExpenses.error);
        dispatch(resetData_financialExpenses());
        }
    }, [financialExpenses.message, financialExpenses.error]);

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const onFinish = (e) => {
        dispatch(addFinancialExpensesFetch(financialExpens));
        onClose();
    };

    return (
        <div>
            {contextHolder}
            <Drawer
                title="إضافة النفقات المالية"
                width={720}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
            >
                <Form
                    layout="vertical"
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    hideRequiredMark
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Row gutter={16}>
                    <Col span={12}>
                            <Form.Item
                                name="working_number"
                                label="رقم العمل"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء ادخال رقم العمل',
                                    },
                                ]}
                            >
                                <InputNumber
                                    placeholder="رقم العمل"
                                    style={{ width: '100%' }}
                                    onChange={(value) => setfinancialExpenses({ ...financialExpens, working_number: value })}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="work_category"
                                label="فئة العمل"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء إدخال فئة العمل',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="فئة العمل"
                                    onChange={(e) => setfinancialExpenses({ ...financialExpens, work_category: e.target.value })}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="num_of_employees"
                                label="عدد العمال"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء إدخال عدد العمال',
                                    },
                                ]}
                            >
                                <InputNumber
                                    placeholder="عدد العمال"
                                    style={{ width: '100%' }}
                                    onChange={(value) => setfinancialExpenses({ ...financialExpens, num_of_employees: value })}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="transport_cost"
                                label="تكلفة النقل"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء ادخال تكلفة النقل',
                                    },
                                ]}
                            >
                                <InputNumber
                                    addonAfter="SY"
                                    placeholder="تكلفة النقل"
                                    style={{ width: '100%' }}
                                    min={0}
                                    max={999999999999.999}
                                    onChange={(value) => setfinancialExpenses({ ...financialExpens, transport_cost: value })}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="health_insurance"
                                label="التأمين الصحي"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء ادخال التأمين الصحي',
                                    },
                                ]}
                            >
                                <InputNumber
                                    addonAfter="SY"
                                    placeholder="التأمين الصحي"
                                    style={{ width: '100%' }}
                                    min={0}
                                    max={999999999999.999}
                                    onChange={(value) => setfinancialExpenses({ ...financialExpens, health_insurance: value })}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="basic_salary"
                                label="الراتب الأساسي"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء ادخال الراتب الأساسي',
                                    },
                                ]}
                            >
                                <InputNumber
                                    addonAfter="SY"
                                    style={{ width: '100%' }}
                                    min={0}
                                    max={999999999999.999}
                                    placeholder="الراتب الأساسي"
                                    onChange={(value) => setfinancialExpenses({ ...financialExpens, basic_salary: value })}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="incentives"
                                label="الحافز"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء إدخال الحافز',
                                    },
                                ]}
                            >
                                <InputNumber
                                    addonAfter="SY"
                                    style={{ width: '100%' }}
                                    min={0}
                                    max={999999999999.999}
                                    placeholder="الحافز"
                                    onChange={(value) => setfinancialExpenses({ ...financialExpens, incentives: value })}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="discounted_working_days"
                                label="أيام العمل المخصومة على العامل"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء ادخال أيام العمل',
                                    },
                                ]}
                            >
                                <InputNumber
                                    placeholder="أيام العمل"
                                    style={{ width: '100%' }}
                                    onChange={(value) => setfinancialExpenses({ ...financialExpens, discounted_working_days: value })}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Space>
                                <Button onClick={onClose}>إغلاق</Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    onClick={onClose}
                                >إرسال</Button>
                            </Space>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </div >
    )
}

export default AddFinancialExpenses