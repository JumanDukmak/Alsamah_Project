import { useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, message, InputNumber, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "antd/es/form/Form";
import { resetData_initialMaterials, updateInitialMaterialsFetch } from "../../redux/InitialMaterials/initialMaterialsSlice";

const UpdateInitialMaterial = ({ open, onClose, id, old_items }) => {
    const dispatch = useDispatch();
    const [form] = useForm();
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
        id:id
    });

    useEffect(() => {
        const itemToUpdate = old_items.find(item => item.id === id);

        if (itemToUpdate) {
            form.setFieldsValue({
                material_number: itemToUpdate.material_number,
                material_name: itemToUpdate.material_name,
                type: itemToUpdate.type,
                priceD: itemToUpdate.priceD,
                storage_period: itemToUpdate.storage_period,
                shipping_installation_duration: itemToUpdate.shipping_installation_duration
            });
        }
    }, [form, id, old_items]);

    const onFinish = (e) => { 
        const filteredExpenses = {
            ...initialMaterial,
            // Remove properties with null values
            material_number: initialMaterial.material_number !== null ? initialMaterial.material_number : undefined,
            material_name: initialMaterial.material_name !== null ? initialMaterial.material_name : undefined,
            type: initialMaterial.type !== null ? initialMaterial.type : undefined,
            priceD: initialMaterial.priceD !== null ? initialMaterial.priceD : undefined,
            storage_period: initialMaterial.storage_period !== null ? initialMaterial.storage_period : undefined,
            shipping_installation_duration: initialMaterial.shipping_installation_duration !== null ? initialMaterial.shipping_installation_duration : undefined,
        };
        dispatch(updateInitialMaterialsFetch(filteredExpenses));
            onClose();
        };
    
        const onFinishFailed = (errorInfo) => {
            console.log("Failed:", errorInfo);
        };

    return (
        <div>
        {contextHolder}
        <Modal open={open} title="تعديل المواد الأولية" onCancel={onClose} footer={null} width={700}>
            <Form
            form={form}
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
                name="material_number"
            >
                <Input
                placeholder='رقم المادة'
                onChange={(e) => setinitialMaterials({ ...initialMaterial, material_number: e.target.value })}
                />
            </Form.Item>
            <Form.Item
                label="اسم المادة"
                name="material_name"
            >
                <Input
                placeholder='اسم المادة'
                onChange={(e) => setinitialMaterials({ ...initialMaterial, material_name: e.target.value })}
                />
            </Form.Item>
            <Form.Item
                label="النوع"
                name="type"
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
                name="priceD"
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
                name="storage_period"
            >
                <InputNumber
                placeholder='مدة التخزين'
                style={{ width: '100%' }}
                onChange={(e) => setinitialMaterials({ ...initialMaterial, storage_period: e })}
                />
            </Form.Item>
            <Form.Item
                label="البضاعة في الطريق"
                name="shipping_installation_duration"
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
                    تعديل المادة{" "}
                </Button>
                </Col>
            </Row>
            </Form>
        </Modal>
        </div>
    )
}

export default UpdateInitialMaterial