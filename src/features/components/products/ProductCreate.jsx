import { Button, Col, Input, Row, Form, Select, Space, Drawer, InputNumber, message, Upload, Divider, Typography } from "antd"
import { UploadOutlined } from '@ant-design/icons';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProductsFetch, resetData, uploadFileFetch } from "../../redux/products/productSlice";

export default function ProductCreate({ open, onClose }) {
    const dispatch = useDispatch();

    const { Option } = Select;
    const [api, contextHolder] = message.useMessage();
    const { Title } = Typography;

    const products = useSelector((state) => state.products)
    useEffect(() => {
        if (products.message) {
            message.success(products.message);
            dispatch(resetData())
        }
        if (products.error) {
            message.error(products.error);
            dispatch(resetData())
        }
    }, [products.message, products.error]);

    const files = useSelector((state) => state.files)

    const List_brand = [
        {
            value: '4',
            label: 'السماح',
        },
    ];

    const List_category = [
        {
            value: '4',
            label: 'نسائي',
        },
    ];

    const List_piece = [
        {
            value: '1',
            label: 'قطعة',
        },
    ];

    const [product, setProduct] = useState({
        name: "",
        code: "",
        price: null,
        unit: "",
        brand_id: null,
        category_id: null
    })

    const [excel_file, setFile] = useState({
        excel_file: null
    });

    const selected_brand = (selectedValue) => {
        const selectedShop = List_brand.find(bra => bra.value === selectedValue);
        if (selectedShop) {
            setProduct(product => ({ ...product, brand_id: selectedShop.value }));
        }
    };

    const selected_category = (selectedValue) => {
        const selectedShop2 = List_category.find(cat => cat.value === selectedValue);
        if (selectedShop2) {
            setProduct(product => ({ ...product, category_id: selectedShop2.value }));
        }
    };

    const selected_piece = (selectedValue) => {
        const selectedShop3 = List_piece.find(pie => pie.value === selectedValue);
        if (selectedShop3) {
            setProduct(product => ({ ...product, unit: selectedShop3.label }));
        }
    };

    const onFinish = (e) => {
        dispatch(addProductsFetch(product))
    };

    const onSubmit = (e) => {
        let dataFile = {excel_file: excel_file}
        dispatch(uploadFileFetch(dataFile))
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            {contextHolder}
            <Drawer
                title="إضافة منتج"
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
                    initialValues={{ price: 1000 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="code"
                                label="رمز المادة الإجمالية"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء إدخال رمز المادة',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="رمز المادة"
                                    onChange={(e) => setProduct({ ...product, code: e.target.value })}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="اسم المادة الإجمالية"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء إدخال اسم المادة الإجمالية',
                                    },
                                    {
                                        pattern: /^[\p{L}\s]+$/u,
                                        message: 'الاسم يتضمن الأحرف فقط',
                                    },
                                ]}
                            >
                                <Input
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="اسم المادة"
                                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="unit"
                                label="الوحدة"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء اختيار الوحدة',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="اختر الوحدة"
                                    onChange={selected_piece}
                                >
                                    {List_piece.map((pie) => (
                                        <Option key={pie.value} value={pie.value}>
                                            {pie.label}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="category"
                                label="المجموعة"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء اختيار المجموعة',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="اختر المجموعة"
                                    onChange={selected_category}
                                >
                                    {List_category.map((cat) => (
                                        <Option key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="brand"
                                label="الماركة"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء اختيار الماركة',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="اختر الماركة"
                                    onChange={selected_brand}
                                >
                                    {List_brand.map((bra) => (
                                        <Option key={bra.value} value={bra.value}>
                                            {bra.label}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="price"
                                label="السعر المحلي"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء إدخال السعر المحلي',
                                    },
                                ]}
                            >
                                <InputNumber
                                    addonAfter="SY"
                                    style={{ width: '100%' }}
                                    onChange={(value) => setProduct({ ...product, price: value })}
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
                style={{padding: '10px'}}
                onFinish={onSubmit}
                onFinishFailed={onFinishFailed}
                >
                <Row>
                    <Form.Item name="title">
                        <Title 
                        level={5} 
                        style={{ fontFamily: 'Cairo',
                        color: '#213242',
                        }}
                        >يمكن تحميل ملف خاص بالمنتجات</Title>
                    </Form.Item>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
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
                                    style={{ fontWeight: '600'}}
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
        </Drawer>
        </div >
    )
}