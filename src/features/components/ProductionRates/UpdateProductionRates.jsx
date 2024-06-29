import { useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, message, InputNumber, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { resetData_productionRates, updateProductionRatesFetch } from "../../redux/ProductionRates/productionRatesSlice";
import { useForm } from "antd/es/form/Form";

const UpdateProductionRates = ({ open, onClose, id, old_items }) => {
    const dispatch = useDispatch();
    const productionRates = useSelector((state) => state.productionRates);
    const [form] = useForm();

    const List_working_category = [
        {
            value: '1',
            label: 'حبكة',
        },
        {
            value: '2',
            label: 'فرق',
        },
    ];

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

    const [productionRate, setproductionRates] = useState({
        working_number: null,
        working_type: "",
        daily_production: null,
        working_category: "",
        id: id
    });

    const selected_working_category = (selectedValue) => {
        const selectedCategory = List_working_category.find(cate => cate.value === selectedValue);
        if (selectedCategory) {
            setproductionRates(productionRate => ({ ...productionRate, working_category: selectedCategory.label }));
        }
    };

    useEffect(() => {
        const itemToUpdate = old_items.find(item => item.id === id);

        if (itemToUpdate) {
            form.setFieldsValue({
                working_number: itemToUpdate.working_number,
                working_type: itemToUpdate.working_type,
                daily_production: itemToUpdate.daily_production,
                working_category: itemToUpdate.working_category,
            });
        }
    }, [form, id, old_items]);
    
    const onFinish = (e) => { 
        const filteredExpenses = {
            ...productionRate,
            // Remove properties with null values
            working_number: productionRate.working_number !== null ? productionRate.working_number : undefined,
            working_type: productionRate.working_type !== null ? productionRate.working_type : undefined,
            daily_production: productionRate.daily_production !== null ? productionRate.daily_production : undefined,
            working_category: productionRate.working_category !== null ? productionRate.working_category : undefined,
        };
        dispatch(updateProductionRatesFetch(filteredExpenses));
        onClose();
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    
    return (
        <div>
        {contextHolder}
        <Modal open={open} title="تعديل معدلات الإنتاج" onCancel={onClose} footer={null} width={700}>
            <Form
            form={form}
            name="basic3"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            style={{ maxWidth: 600 }}
            autoComplete="off"
            hideRequiredMark
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
            <Form.Item
                label="رقم العمل"
                name="working_number"
            >
                <InputNumber
                placeholder='رقم العمل'
                style={{ width: '100%' }}
                onChange={(e) => setproductionRates({ ...productionRate, working_number: e })}
                />
            </Form.Item>
            <Form.Item
                label="نوع العمل"
                name="working_type"
            >
                <Input
                placeholder='نوع العمل'
                onChange={(e) => setproductionRates({ ...productionRate, working_type: e.target.value })}
                />
            </Form.Item>
            <Form.Item
                label="فئة العمل"
                name="working_category"
            >
                <Select
                    placeholder="اختر الفئة"
                    onChange={selected_working_category}
                >
                    {List_working_category.map((cate) => (
                        <Select.Option key={cate.value} value={cate.value}>
                            {cate.label}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label="الإنتاج اليومي"
                name="daily_production"
            >
                <InputNumber
                stringMode
                placeholder='الأنتاج اليومي'
                style={{ width: '100%' }}
                onChange={(e) => setproductionRates({ ...productionRate, daily_production: e })}
                />
            </Form.Item>
            <Row gutter={16} justify="end">
                <Col>
                <Button 
                style={{ fontWeight: '600' }}
                onClick={onClose}>إغلاق</Button>
                </Col>
                <Col>
                <Button type="primary" htmlType="submit">
                    تعديل معدل الإنتاج{" "}
                </Button>
                </Col>
            </Row>
            </Form>
        </Modal>
        </div>
    )
}

export default UpdateProductionRates