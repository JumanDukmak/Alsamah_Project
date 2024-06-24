import { useEffect, useState } from "react";
import { Button, Col, Divider, Form, Input, Modal, Row, Space, Upload, message, Typography, InputNumber, Select } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { addProductionRatesFetch, getProductionRatesFetch, resetData_productionRates, uploadProductionRatesFileFetch } from "../../redux/ProductionRates/productionRatesSlice";

const AddProductionRates = ({ open, onClose }) => {
    const { Title } = Typography;
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
    });

    const [excel_file, setFile] = useState({
        excel_file: null
    });

    const onSubmit = (e) => {
        let dataFile = { excel_file: excel_file }
        dispatch(uploadProductionRatesFileFetch(dataFile))
        dispatch(getProductionRatesFetch())
    };

    const onFinish = (e) => {
        dispatch(addProductionRatesFetch(productionRate));
        onClose();
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    
    return (
        <div>
        {contextHolder}
        <Modal open={open} title="إضافة معدلات الإنتاج" onCancel={onClose} footer={null} width={700}>
            <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            autoComplete="off"
            hideRequiredMark
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
            <Form.Item
                label="رقم العمل"
                name="رقم العمل"
                rules={[
                {
                    required: true,
                    message: "ادخل رقم العمل !",
                },
                ]}
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
                rules={[
                {
                    required: true,
                    message: "ادخل نوع العمل !",
                },
                ]}
            >
                <Input
                placeholder='نوع العمل'
                onChange={(e) => setproductionRates({ ...productionRate, working_type: e.target.value })}
                />
            </Form.Item>
            <Form.Item
                label="الإنتاج اليومي"
                name="الإنتاج اليومي"
                rules={[
                {
                    required: true,
                    message: "ادخل الإنتاج اليومي !",
                },
                ]}
            >
                <InputNumber
                placeholder='الأنتاج اليومي'
                style={{ width: '100%' }}
                onChange={(e) => setproductionRates({ ...productionRate, daily_production: e })}
                />
            </Form.Item>
            <Form.Item
                label="فئة العمل"
                name="فئة العمل"
                rules={[
                {
                    required: true,
                    message: "ادخل فئة العمل !",
                },
                ]}
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
            <Row gutter={16} justify="end">
                <Col>
                <Button 
                style={{ fontWeight: '600' }}
                onClick={onClose}>إغلاق</Button>
                </Col>
                <Col>
                <Button type="primary" htmlType="submit">
                    إضافة معدل الإنتاج{" "}
                </Button>
                </Col>
            </Row>
            </Form>
            <Divider />
            <Form
                name="basic2"
                layout="horizental"
                hideRequiredMark
                style={{ padding: '10px' }}
                onFinish={onSubmit}
                onFinishFailed={onFinishFailed}
            >
                <Row>
                    <Form.Item name="title">
                        <Title
                            level={5}
                            style={{
                                fontFamily: 'Cairo',
                            }}
                        >يمكن تحميل ملف خاص بمعدلات الإنتاج</Title>
                    </Form.Item>
                </Row>
                <Row>
                    <Col>
                        <Form.Item name="button">
                            <Space align="start">
                                <Upload
                                    beforeUpload={() => false}
                                    onChange={(e) => {
                                        setFile(e.file);
                                        console.log(e.file);
                                    }}
                                >
                                    <Button
                                        icon={<UploadOutlined />}
                                        size='middle'
                                        style={{ fontWeight: '600' }}
                                    >تحميل من إكسل</Button>
                                </Upload>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    onClick={onClose}
                                >إرسال</Button>
                            </Space>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
        </div>
    )
}

export default AddProductionRates