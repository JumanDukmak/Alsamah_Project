import { Button, Col, Input, Row, Form, Select, Space, Drawer, InputNumber, message, Upload, Divider, Typography, DatePicker } from "antd"
import { UploadOutlined } from '@ant-design/icons';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs from 'dayjs';
import { getAllProductsFetch } from "../../redux/products/productSlice";
import { addActual_productionFetch, getMachineProductivityFetch, resetData_MachineProductivity, uploadActual_productionFileFetch } from "../../redux/MachineProductivity/MachineProductivitySlice";

const AddActualProduction = ({ open, onClose ,new_data}) => {
    const dispatch = useDispatch();
    const { Option } = Select;
    const [api, contextHolder] = message.useMessage();
    const { Title } = Typography;
    const products= useSelector((state) => state.products);

    const machineProductivity = useSelector((state) => state.machineProductivity);

    useEffect(() => {
        dispatch(getAllProductsFetch());
    }, []);

    useEffect(() => {
        if (machineProductivity.message) {
            api.success(machineProductivity.message);
            dispatch(resetData_MachineProductivity())
        }
        if (machineProductivity.error) {
            api.error(machineProductivity.error);
            dispatch(resetData_MachineProductivity())
        }
    }, [machineProductivity.message, machineProductivity.error]);

    const [actual_production, setActual_production] = useState({
        product_id: null,
        value: null,
        date: null,
    })

    const [excel_file, setFile] = useState({
        excel_file: null,
    });

    const selected_product_id = (selectedValue) => {
        setActual_production(prevState => ({ 
            ...prevState, 
            product_id: selectedValue
        }));
    };

    const handleDateChange = (dat) => {
        if (dat) {
            setActual_production(prevState => ({
                ...prevState,
                date: dayjs(dat).format('YYYY-MM-DD HH:mm:ss'),
            }));
        } else {
            setActual_production(prevState => ({
                ...prevState,
                date: null,
            }));
        }
    };

    const onFinish = (e) => {
        dispatch(addActual_productionFetch(actual_production))
        dispatch(getMachineProductivityFetch(new_data))
    };

    const onSubmit = () => {
        let dataFile = { excel_file: excel_file.excel_file }
        dispatch(uploadActual_productionFileFetch(dataFile))
        dispatch(getMachineProductivityFetch(new_data))
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
        {contextHolder}
        <Drawer
            title="إضافة إنتاج فعلي"
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
                hideRequiredMark
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="product_id"
                            label=" المنتج" 
                            rules={[
                                {
                                    required: true,
                                    message: 'الرجاء إدخال المنتج ',
                                },
                            ]}
                        >
                            <Select
                                placeholder="اختر المنتج"
                                onChange={selected_product_id}
                            >
                                {products.allProducts.map((mat) => (
                                    <Option key={mat.id} value={mat.id}>
                                        {mat.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="value"
                            label="قيمة الإنتاج الغعلي"
                            rules={[
                                {
                                    required: true,
                                    message: 'الرجاء إدخال القيمة',
                                },
                            ]}
                        >
                            <InputNumber
                                placeholder="قيمة الإنتاج الفعلي"
                                style={{ width: '100%' }}
                                onChange={(v) => setActual_production({ ...actual_production, value: v })}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="date"
                            label="التاريخ"
                            rules={[
                                {
                                    required: true,
                                    message: 'الرجاء إدخال التاريخ ',
                                },
                            ]}
                        >
                            <DatePicker
                                style={{ width: '100%' }}
                                placeholderText='التاريخ '
                                picker="date"
                                format="DD-MM-YYYY"
                                onChange={handleDateChange}
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
            <Divider />
            <Form
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
                                color: '#213242',
                            }}
                        >يمكن تحميل ملف خاص   بالإنتاج الفعلي</Title>
                    </Form.Item>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="button">
                            <Space align="start">
                                <Upload
                                    beforeUpload={() => false}
                                    onChange={(e) => {
                                        setFile(prevState => ({ ...prevState, excel_file: e.file }));
                                    }}
                                >
                                    <Button
                                        icon={<UploadOutlined />}
                                        size='middle'
                                        style={{ fontWeight: '600' }}
                                    >تحميل ملف إكسل</Button>
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
        </Drawer>
    </div >
    )
}

export default AddActualProduction