import { useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, message, InputNumber, Select } from "antd";

import {  Space, Drawer,  Upload, Divider, Typography, DatePicker } from "antd"
import { UploadOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from "react-redux";
import dayjs from 'dayjs';
import { getMachineProductivityFetch, resetData_MachineProductivity, updateActual_productionStart } from "../../redux/MachineProductivity/MachineProductivitySlice";
import { useForm } from "antd/es/form/Form";

const UpdateActualProduction = ({ open, onClose, id ,new_data,old_items}) => {
    const dispatch = useDispatch();
    const [form] = useForm();
    const [api, contextHolder] = message.useMessage();
    const machineProductivity = useSelector((state) => state.machineProductivity);
  

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


    useEffect(() => {
        const itemToUpdate = old_items.find(item => item.machine_productivity_id === id);

        if (itemToUpdate) {
            form.setFieldsValue({
                value: itemToUpdate.value,
                date: dayjs(itemToUpdate.date, 'YYYY-MM-DD'),
            });
        }
    }, [form, id, old_items]);


    // const [actual_production, setActual_production] = useState({
    
    //     value: null,
    //     date: "",
    // })

    const [actualProduction, setActualProduction] = useState({
        machine_productivity_id: null,
        value: null,
        date: null,
        id: id
    });
  
   

    const handleDateChange = (dat) => {
        if (dat) {
            setActualProduction(prevState => ({
                ...prevState,
                date: dayjs(dat).format('YYYY-MM-DD HH:mm:ss'),
            }));
        } else {
            setActualProduction(prevState => ({
                ...prevState,
                date: null,
            }));
        }
    };

 

    const onFinish = (e) => {


 const filteredExpenses = {
            ...actualProduction,
            // Remove properties with null values
            value: actualProduction.value !== null ? actualProduction.value : undefined,
            date: actualProduction.date !== null ? actualProduction.date : undefined,
        };
        dispatch(updateActual_productionStart(filteredExpenses));
        dispatch(getMachineProductivityFetch(new_data))
            onClose();

    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    
    return (
        <div>
        {contextHolder}
        <Modal open={open} title="تعديل إنتاجية الآلات الفعلي " onCancel={onClose} footer={null} width={700}>
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
                            name="value"
                            label="قيمة الإنتاج الفعلي"
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
                                onChange={(v) => setActualProduction({ ...actualProduction, value: v })}
                            />
                        </Form.Item>

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
                    defaultValue={form.getFieldValue('date')}
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
                    تعديل إنتاجية الآلات الفعلي {" "}
                </Button>
                </Col>
            </Row>
            </Form>
        </Modal>
        </div>
    )
}

export default UpdateActualProduction