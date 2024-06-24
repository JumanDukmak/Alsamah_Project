import { Button, Col, Input, Row, Form, Select, Space, Drawer, InputNumber, message, Upload, Divider, Typography, DatePicker } from "antd"
import { UploadOutlined } from '@ant-design/icons';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProductsInventoryFetch, resetData_ProductsInventory, uploadProductsInventoryFileFetch } from "../../redux/productInventory/productInventorySlice";
import { getAllProductsFetch } from "../../redux/products/productSlice";
import dayjs from 'dayjs';

const AddProductInventory = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const { Option } = Select;
    const [api, contextHolder] = message.useMessage();
    const { Title } = Typography;
    const allProducts = useSelector((state) => state.products.allProducts);
    const productsInventories = useSelector((state) => state.productsInventory);

    useEffect(() => {
        if (productsInventories.message) {
            api.success(productsInventories.message);
            dispatch(resetData_ProductsInventory())
        }
        if (productsInventories.error) {
            api.error(productsInventories.error);
            dispatch(resetData_ProductsInventory())
        }
    }, [productsInventories.message, productsInventories.error]);

    const [productsInventory, setProductsInventory] = useState({
        product_id: null,
        quantity: null,
        inventory_date: null,
    });

    const [excel_file, setFile] = useState({
        excel_file: null,
    });

    useEffect(() => {
        dispatch(getAllProductsFetch())
    }, [])

    const selected_product_id = (selectedValue) => {
        setProductsInventory(prevState => ({ 
            ...prevState, 
            product_id: selectedValue
        }));
    };

    const onSearch = (value) => {
        console.log('search:', value);
    };

    const handleDateChange = (date) => {
        if (date) {
            setProductsInventory(prevState => ({
                ...prevState,
                inventory_date: dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
            }));
        } else {
            setProductsInventory(prevState => ({
                ...prevState,
                inventory_date: null,
            }));
        }
    };

    const onFinish = (e) => {
        dispatch(addProductsInventoryFetch(productsInventory))
    };

    const onSubmit = () => {
        let dataFile = { excel_file: excel_file.excel_file }
        dispatch(uploadProductsInventoryFileFetch(dataFile))
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            {contextHolder}
            <Drawer
                title="إضافة مخزون منتج"
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
                                label="رمز المادة"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء إدخال رمز المادة',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="اختر الرمز"
                                    optionFilterProp={allProducts.code}
                                    onChange={selected_product_id}
                                    showSearch
                                    onSearch={onSearch}
                                >
                                    {allProducts.map((pro) => (
                                        <Option key={pro.id} value={pro.id}>
                                            {pro.code}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="quantity"
                                label="الكمية"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء إدخال الكمية',
                                    },
                                ]}
                            >
                                <InputNumber
                                    placeholder="الكمية"
                                    style={{ width: '100%' }}
                                    onChange={(value) => setProductsInventory({ ...productsInventory, quantity: value })}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="inventory_date"
                                label="تاريخ التخزين"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء إدخال تاريخ التخزين',
                                    },
                                ]}
                            >
                                <DatePicker
                                style={{ width: '100%' }}
                                placeholderText='تاريخ التخزين'
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
                            >يمكن تحميل ملف خاص بمخزون المنتجات</Title>
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

export default AddProductInventory