import { Button, Col, Input, Row, Form, Space, Drawer, InputNumber, message } from "antd"
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetData_financialExpenses, updateFinancialExpensesFetch } from "../../redux/FinancialExpenses/financialExpensesSlice";
import { useForm } from "antd/es/form/Form";

const UpdateFinancialExpenses = ({ open, onClose, id, old_items }) => {
    const dispatch = useDispatch();
    const financialExpenses = useSelector((state) => state.financialExpenses);
    const [form] = useForm();

    const [financialExpens, setfinancialExpenses] = useState({
        working_number: null,
        work_category: "",
        num_of_employees: null,
        transport_cost: null,
        health_insurance: null,
        basic_salary: null,
        incentives: null,
        discounted_working_days: null,
        id: id
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

    useEffect(() => {
        const itemToUpdate = old_items.find(item => item.id === id);
        if (itemToUpdate) {
            form.setFieldsValue({
                working_number: itemToUpdate.working_number,
                work_category: itemToUpdate.work_category,
                num_of_employees: itemToUpdate.num_of_employees,
                transport_cost: itemToUpdate.transport_cost,
                health_insurance: itemToUpdate.health_insurance,
                basic_salary: itemToUpdate.basic_salary,
                incentives: itemToUpdate.incentives,
                discounted_working_days: itemToUpdate.discounted_working_days
            });
        }
    }, [form, id, old_items]);

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const onFinish = (e) => {
        const filteredExpenses = {
            ...financialExpens,
            // Remove properties with null values
            working_number: financialExpens.working_number !== null ? financialExpens.working_number : undefined,
            num_of_employees: financialExpens.num_of_employees !== null ? financialExpens.num_of_employees : undefined,
            transport_cost: financialExpens.transport_cost !== null ? financialExpens.transport_cost : undefined,
            health_insurance: financialExpens.health_insurance !== null ? financialExpens.health_insurance : undefined,
            basic_salary: financialExpens.basic_salary !== null ? financialExpens.basic_salary : undefined,
            incentives: financialExpens.incentives !== null ? financialExpens.incentives : undefined,
            discounted_working_days: financialExpens.discounted_working_days !== null ? financialExpens.discounted_working_days : undefined,
        };
    
        dispatch(updateFinancialExpensesFetch(filteredExpenses));
        onClose();
    };

    return (
        <div>
            {contextHolder}
            <Drawer
                title="تعديل النفقات المالية"
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
                    form={form}
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

export default UpdateFinancialExpenses