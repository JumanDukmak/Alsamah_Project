import { useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, message, InputNumber, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { resetData_productionRates, updateProductionRatesFetch } from "../../redux/ProductionRates/productionRatesSlice";

const UpdateProductionRates = ({ open, onClose, id }) => {
    const dispatch = useDispatch();
    const productionRates = useSelector((state) => state.productionRates);

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

    const selected_working_category = (selectedValue) => {
        const selectedCategory = List_working_category.find(cate => cate.value === selectedValue);
        if (selectedCategory) {
            setproductionRates(productionRate => ({ ...productionRate, working_category: selectedCategory.label }));
        }
    };

    const [productionRate, setproductionRates] = useState({
        working_number: null,
        working_type: "",
        daily_production: null,
        working_category: "",
        id: id
    });

    const onFinish = (e) => {
        dispatch(updateProductionRatesFetch(productionRate));
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
                name="رقم العمل"
            >
                <InputNumber
                placeholder='رقم العمل'
                style={{ width: '100%' }}
                onChange={(e) => setproductionRates({ ...productionRate, working_number: e })}
                />
            </Form.Item>
            <Form.Item
                label="نوع العمل"
                name="نوع العمل"
            >
                <Input
                placeholder='نوع العمل'
                onChange={(e) => setproductionRates({ ...productionRate, working_type: e.target.value })}
                />
            </Form.Item>
            <Form.Item
                label="فئة العمل"
                name="فئة العمل"
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
                name="الإنتاج اليومي"
            >
                <InputNumber
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