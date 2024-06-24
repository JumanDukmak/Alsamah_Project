import { Button, Col, Input, Row, Form, Select, Space, Drawer, InputNumber, message, Upload, Divider, Typography } from "antd"
import { UploadOutlined } from '@ant-design/icons';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProductsFetch, getProductsFetch, resetData,  uploadFileFetch } from "../../redux/products/productSlice";
import { getBrandsStart } from "../../redux/Brands/brandsSlice";
import { getCategoriesStart } from "../../redux/Category/categoriesSlice";
import { resetData_initialMaterials, uploadMaterialsProductFileFetch } from "../../redux/InitialMaterials/initialMaterialsSlice";
import { resetData_directWork, uploadDirectCostFileFetch } from "../../redux/directWork/directWorkSlice";

export default function ProductCreate({ open, onClose, currentPage }) {
    const dispatch = useDispatch();
    const { Option } = Select;
    const [api, contextHolder] = message.useMessage();
    const brands = useSelector((state) => state.brands)
    const categories = useSelector((state) => state.categories)
    const { Title } = Typography;
    const products = useSelector((state) => state.products);
    const initialMaterials = useSelector((state) => state.initialMaterials);
    const directWorks = useSelector((state) => state.directWorks);

    
    useEffect(() => {
        if (products.message) {
            api.success(products.message);
            dispatch(resetData())
        }
        if (products.error) {
            api.error(products.error);
            dispatch(resetData())
        }
        if (initialMaterials.message) {
            api.success(initialMaterials.message);
            dispatch(resetData_initialMaterials())
        }
        if (initialMaterials.error) {
            api.error(initialMaterials.error);
            dispatch(resetData_initialMaterials())
        }
        if (directWorks.message) {
            api.success(directWorks.message);
            dispatch(resetData_directWork())
        }
        if (directWorks.error) {
            api.error(directWorks.error);
            dispatch(resetData_directWork())
        }

    }, [products.message, products.error,initialMaterials.message,initialMaterials.error,directWorks.message,directWorks.error]);

    useEffect(() => {
        dispatch(getBrandsStart())
        dispatch(getCategoriesStart())
    }, [])

    const List_piece = [
        {
            value: '1',
            label: 'قطعة',
        },
        {
            value: '2',
            label: 'دزينه',
        },
    ];

    const [product, setProduct] = useState({
        name: "",
        code: "",
        price: null,
        unit: "",
        brand_id: null,
        category_id: null,
        time_per_piece: null,
    })

    const [excel_file, setFile] = useState({
        excel_file: null,
        excel_MaterialProductfile:null,
        excel_DirectCostfile:null
    });

    const selected_brand_id = (selectedValue) => {
        setProduct(prevState => ({ ...prevState, brand_id: selectedValue }));
    };

    const selected_category_id = (selectedValue) => {
        setProduct(prevState => ({ ...prevState, category_id: selectedValue }));
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

    const onSubmit = () => {
        let dataFile = { excel_file: excel_file.excel_file }
        dispatch(uploadFileFetch(dataFile))
        dispatch(getProductsFetch(currentPage))
    };

    const onFinishToUplaodFile2 = () => {
        let dataFile = { excel_file: excel_file.excel_MaterialProductfile }
        dispatch(uploadMaterialsProductFileFetch(dataFile))
        
    };
    const onFinishToUplaodFile3 = () => {
        let dataFile = { excel_file: excel_file.excel_DirectCostfile }
        dispatch(uploadDirectCostFileFetch(dataFile))
        
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
                                    onChange={selected_category_id}
                                >
                                    {categories.categories.map((cat) => (
                                        <Option key={cat.id} value={cat.id}>
                                            {cat.name}
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
                                    onChange={selected_brand_id}
                                >
                                    {brands.brands.map((b) => (
                                        <Option key={b.id} value={b.id}>
                                            {b.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="time_per_piece"
                                label="زمن الفردة"
                                rules={[
                                    {
                                        required: true,
                                        message: 'الرجاء إدخال زمن الفردة',
                                    },
                                ]}
                            >
                                <InputNumber
                                    placeholder="زمن الفردة"
                                    style={{ width: '100%' }}
                                    onChange={(value) => setProduct({ ...product, time_per_piece: value })}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
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
                                            setFile(prevState => ({ ...prevState, excel_file: e.file }));
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
                <Divider />
                <Form
                    layout="horizental"
                    hideRequiredMark
                    style={{ padding: '10px' }}
                    onFinish={onFinishToUplaodFile2}
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
                            >يمكن تحميل ملف خاص بالمواد الأولية للمنتجات</Title>
                        </Form.Item>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="button">
                                <Space align="start">
                                    <Upload
                                        beforeUpload={() => false}
                                        onChange={(e) => {

                                            setFile(prevState => ({ ...prevState, excel_MaterialProductfile: e.file }));
                                            
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

                <Divider />
                <Form
                    layout="horizental"
                    hideRequiredMark
                    style={{ padding: '10px' }}
                    onFinish={onFinishToUplaodFile3}
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
                            >يمكن تحميل ملف خاص بالقوى العاملة للمنتجات</Title>
                        </Form.Item>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="button">
                                <Space align="start">
                                    <Upload
                                        beforeUpload={() => false}
                                        onChange={(e) => {

                                            setFile(prevState => ({ ...prevState, excel_DirectCostfile: e.file }));
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
            </Drawer>
        </div >
    )
}