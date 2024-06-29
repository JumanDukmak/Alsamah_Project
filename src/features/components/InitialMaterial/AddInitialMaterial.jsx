import { useEffect, useState } from "react";
import { Button, Col, Divider, Form, Input, Modal, Row, Space, Upload, message, Typography, InputNumber, Select } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { addInitialMaterialsFetch, getInitialMaterialsFetch, resetData_initialMaterials, uploadInitialMaterialsFileFetch } from "../../redux/InitialMaterials/initialMaterialsSlice";

const AddInitialMaterial = ({ open, onClose }) => {
    const { Title } = Typography;
    const dispatch = useDispatch();
    const initialMaterials = useSelector((state) => state.initialMaterials);

    const List_of_type = [
        {
            value: '1',
            label: 'خيوط',
        },
        {
            value: '2',
            label: 'أصبغة',
        },
        {
            value: '3',
            label: 'مواد التعبئة',
        },
    ];

    const [api, contextHolder] = message.useMessage();
    useEffect(() => {
    if (initialMaterials.message) {
        api.success(initialMaterials.message);
        dispatch(resetData_initialMaterials());
    }
    if (initialMaterials.error) {
        api.error(initialMaterials.error);
        dispatch(resetData_initialMaterials());
    }
    }, [initialMaterials.message, initialMaterials.error]);

    const selected_working_category = (selectedValue) => {
        const selectedType = List_of_type.find(ty => ty.value === selectedValue);
        if (selectedType) {
            setinitialMaterials(initialMaterial => ({ ...initialMaterial, type: selectedType.label }));
        }
    };

    const [initialMaterial, setinitialMaterials] = useState({
        material_number: null,
        material_name: "",
        type: "",
        priceD: null,
        storage_period: null,
        shipping_installation_duration: null,
    });

    const [excel_file, setFile] = useState({
        excel_file: null
    });

    const onSubmit = (e) => {
        let dataFile = { excel_file: excel_file }
        dispatch(uploadInitialMaterialsFileFetch(dataFile))
        dispatch(getInitialMaterialsFetch())
    };

    const onFinish = (e) => {
        dispatch(addInitialMaterialsFetch(initialMaterial));
        onClose();
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div>
        {contextHolder}
        <Modal open={open} title="إضافة المواد الأولية" onCancel={onClose} footer={null} width={700}>
            <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            hideRequiredMark
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
            <Form.Item
                label="رقم المادة"
                name="رقم المادة"
                rules={[
                {
                    required: true,
                    message: "ادخل رقم المادة !",
                },
                ]}
            >
                <Input
                placeholder='رقم المادة'
                onChange={(e) => setinitialMaterials({ ...initialMaterial, material_number: e.target.value })}
                />
            </Form.Item>
            <Form.Item
                label="اسم المادة"
                name="اسم المادة"
                rules={[
                {
                    required: true,
                    message: "ادخل اسم المادة !",
                },
                ]}
            >
                <Input
                placeholder='اسم المادة'
                onChange={(e) => setinitialMaterials({ ...initialMaterial, material_name: e.target.value })}
                />
            </Form.Item>
            <Form.Item
                label="النوع"
                name="النوع"
                rules={[
                {
                    required: true,
                    message: "ادخل النوع !",
                },
                ]}
            >
                <Select
                    placeholder="اختر النوع"
                    onChange={selected_working_category}
                >
                    {List_of_type.map((ty) => (
                        <Select.Option key={ty.value} value={ty.value}>
                            {ty.label}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label="السعر"
                name="السعر"
                rules={[
                {
                    required: true,
                    message: "ادخل السعر !",
                },
                ]}
            >
                <InputNumber
                placeholder='السعر'
                addonAfter="$"
                style={{ width: '100%' }}
                onChange={(e) => setinitialMaterials({ ...initialMaterial, priceD: e })}
                />
            </Form.Item>
            <Form.Item
                label="مدة التخزين"
                name="مدة التخزين"
                rules={[
                {
                    required: true,
                    message: "ادخل مدة التخزين !",
                },
                ]}
            >
                <InputNumber
                placeholder='مدة التخزين'
                style={{ width: '100%' }}
                onChange={(e) => setinitialMaterials({ ...initialMaterial, storage_period: e })}
                />
            </Form.Item>
            <Form.Item
                label="البضاعة في الطريق"
                name="البضاعة في الطريق"
                rules={[
                {
                    required: true,
                    message: "ادخل عدد البضاعة !",
                },
                ]}
            >
                <InputNumber
                placeholder='عدد البضاعة'
                style={{ width: '100%' }}
                onChange={(e) => setinitialMaterials({ ...initialMaterial, shipping_installation_duration: e })}
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
                    إضافة المادة{" "}
                </Button>
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
                            }}
                        >يمكن تحميل ملف خاص بالمواد الأولية</Title>
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

export default AddInitialMaterial