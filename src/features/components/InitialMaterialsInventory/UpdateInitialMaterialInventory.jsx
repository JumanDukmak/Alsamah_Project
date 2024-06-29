import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, message, InputNumber, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "antd/es/form/Form";
import dayjs from 'dayjs';
import { getMaterialsInventoryFetch, resetData_MaterialsInventory, updateMaterialsInventoryFetch } from "../../redux/InitialMaterialsInventory/initialMaterialsInventorySlice";

const UpdateInitialMaterialInventory = ({ open, onClose, id, old_items, new_data }) => {
    const dispatch = useDispatch();
    const [form] = useForm();
    const materialsInventories = useSelector((state) => state.materialsInventory);

    const [api, contextHolder] = message.useMessage();
    useEffect(() => {
    if (materialsInventories.message) {
        api.success(materialsInventories.message);
        dispatch(resetData_MaterialsInventory());
    }
    if (materialsInventories.error) {
        api.error(materialsInventories.error);
        dispatch(resetData_MaterialsInventory());
    }
    }, [materialsInventories.message, materialsInventories.error]);

    useEffect(() => {
        const itemToUpdate = old_items.find(item => item.inventory_id === id);

        if (itemToUpdate) {
            form.setFieldsValue({
                quantity: itemToUpdate.quantity,
                inventory_date: dayjs(itemToUpdate.inventory_date, 'YYYY-MM-DD'),
            });
        }
    }, [form, id, old_items]);

    const [materialsInventory, setmaterialsInventory] = useState({
        initialMaterial_id: null,
        quantity: null,
        inventory_date: null,
        id: id
    });

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
        const filteredExpenses = {
            ...materialsInventory,
            // Remove properties with null values
            quantity: materialsInventory.quantity !== null ? materialsInventory.quantity : undefined,
            inventory_date: materialsInventory.inventory_date !== null ? materialsInventory.inventory_date : undefined,
        };
        dispatch(updateMaterialsInventoryFetch(filteredExpenses));
        dispatch(getMaterialsInventoryFetch(new_data))
            onClose();
        };

        const onFinishFailed = (errorInfo) => {
            console.log("Failed:", errorInfo);
        };

    return (
        <div>
            {contextHolder}
            <Modal open={open} title="تعديل مخزون المواد" onCancel={onClose} footer={null} width={700}>
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
                    label="الكمية"
                    name="quantity"
                >
                    <InputNumber
                    placeholder='الكمية'
                    style={{ width: '100%' }}
                    onChange={(e) => setmaterialsInventory({ ...materialsInventory, quantity: e })}
                    />
                </Form.Item>
                <Form.Item
                    name="inventory_date"
                    label="تاريخ التخزين"
                >
                    <DatePicker
                    style={{ width: '100%' }}
                    placeholderText='تاريخ التخزين'
                    picker="date"
                    format="DD-MM-YYYY"
                    onChange={handleDateChange}
                    defaultValue={form.getFieldValue('inventory_date')}
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
                        تعديل مخزون المواد{" "}
                    </Button>
                    </Col>
                </Row>
                </Form>
            </Modal>
        </div>
    )
}

export default UpdateInitialMaterialInventory