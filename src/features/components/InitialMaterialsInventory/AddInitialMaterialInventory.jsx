import { Button, Col, Input, Row, Form, Select, Space, Drawer, InputNumber, message, Upload, Divider, Typography, DatePicker } from "antd"
import { UploadOutlined } from '@ant-design/icons';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMaterialsInventoryFetch, resetData_MaterialsInventory, uploadMaterialsInventoryFileFetch } from "../../redux/InitialMaterialsInventory/initialMaterialsInventorySlice";
import { getInitialMaterialsFetch } from "../../redux/InitialMaterials/initialMaterialsSlice";
import dayjs from 'dayjs';

const AddInitialMaterialInventory = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const { Option } = Select;
    const [api, contextHolder] = message.useMessage();
    const { Title } = Typography;
    const initialMaterials = useSelector((state) => state.initialMaterials);
    const materialsInventories = useSelector((state) => state.materialsInventory);

    useEffect(() => {
        dispatch(getInitialMaterialsFetch());
    }, []);

    useEffect(() => {
        if (materialsInventories.message) {
            api.success(materialsInventories.message);
            dispatch(resetData_MaterialsInventory())
        }
        if (materialsInventories.error) {
            api.error(materialsInventories.error);
            dispatch(resetData_MaterialsInventory())
        }
    }, [materialsInventories.message, materialsInventories.error]);

    const [materialsInventory, setmaterialsInventory] = useState({
        initialMaterial_id: null,
        quantity: null,
        inventory_date: null,
    })

    const [excel_file, setFile] = useState({
        excel_file: null,
    });

    const selected_initialMaterial_id = (selectedValue) => {
        setmaterialsInventory(prevState => ({ 
            ...prevState, 
            initialMaterial_id: selectedValue
        }));
    };

    const handleDateChange = (date) => {
        if (date) {
            setmaterialsInventory(prevState => ({
                ...prevState,
                inventory_date: dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
            }));
        } else {
            setmaterialsInventory(prevState => ({
                ...prevState,
                inventory_date: null,
            }));
        }
    };

    const onFinish = (e) => {
        dispatch(addMaterialsInventoryFetch(materialsInventory))
    };

    const onSubmit = () => {
        let dataFile = { excel_file: excel_file.excel_file }
        dispatch(uploadMaterialsInventoryFileFetch(dataFile))
        //dispatch(getProductsFetch(currentPage))
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
                            name="initialMaterial_id"
                            label="المادة الأولية" 
                            rules={[
                                {
                                    required: true,
                                    message: 'الرجاء إدخال المادة الأولية',
                                },
                            ]}
                        >
                            <Select
                                placeholder="اختر المادة"
                                onChange={selected_initialMaterial_id}
                            >
                                {initialMaterials.initialMaterials.map((mat) => (
                                    <Option key={mat.id} value={mat.id}>
                                        {mat.material_name}
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
                                onChange={(value) => setmaterialsInventory({ ...materialsInventory, quantity: value })}
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
                        >يمكن تحميل ملف خاص بمخزون المواد الأولية</Title>
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

export default AddInitialMaterialInventory