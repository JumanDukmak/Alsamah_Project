import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, message, InputNumber, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "antd/es/form/Form";
import { getProductsInventoryFetch, resetData_ProductsInventory, updateProductsInventoryFetch } from "../../redux/productInventory/productInventorySlice";
import dayjs from 'dayjs';

const UpdateProductInventory = ({ open, onClose, id, old_items, new_data }) => {
    const dispatch = useDispatch();
    const [form] = useForm();
    const productsInventories = useSelector((state) => state.productsInventory);

    const [api, contextHolder] = message.useMessage();
    useEffect(() => {
    if (productsInventories.message) {
        api.success(productsInventories.message);
        dispatch(resetData_ProductsInventory());
    }
    if (productsInventories.error) {
        api.error(productsInventories.error);
        dispatch(resetData_ProductsInventory());
    }
    }, [productsInventories.message, productsInventories.error]);

    useEffect(() => {
        const itemToUpdate = old_items.find(item => item.inventory_id === id);
        console.log(old_items);

        if (itemToUpdate) {
            form.setFieldsValue({
                quantity: itemToUpdate.quantity,
                inventory_date: dayjs(itemToUpdate.inventory_date, 'YYYY-MM-DD'),
            });
        }
    }, [form, id, old_items]);

    console.log("update: ", old_items);

    const [productsInventory, setProductsInventory] = useState({
        quantity: null,
        inventory_date: null,
        id: id
    });

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
        const filteredExpenses = {
            ...productsInventory,
            // Remove properties with null values
            quantity: productsInventory.quantity !== null ? productsInventory.quantity : undefined,
            inventory_date: productsInventory.inventory_date !== null ? productsInventory.inventory_date : undefined,
        };
        dispatch(updateProductsInventoryFetch(filteredExpenses));
        dispatch(getProductsInventoryFetch(new_data))
            onClose();
        };
    
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div>
        {contextHolder}
        <Modal open={open} title="تعديل مخزون المنتجات" onCancel={onClose} footer={null} width={700}>
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
                onChange={(e) => setProductsInventory({ ...productsInventory, quantity: e })}
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
                    تعديل مخزون المنتج{" "}
                </Button>
                </Col>
            </Row>
            </Form>
        </Modal>
        </div>
    )
}

export default UpdateProductInventory