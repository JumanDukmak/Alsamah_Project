import { Button, Col, Input, Row, Form, Select, Space, Drawer, InputNumber, message, Upload, Divider, Typography, DatePicker, Modal } from "antd"
import { UploadOutlined } from '@ant-design/icons';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getInitialMaterialsFetch } from "../../redux/InitialMaterials/initialMaterialsSlice";
import dayjs from 'dayjs';
import { addMaterialOnShippingFetch, resetData_MaterialOnShipping, uploadMaterialOnShippingFileFetch } from "../../redux/MaterialOnShipping/MaterialOnShippingSlice";

const AddMaterialOnShipping = () => {
    const dispatch = useDispatch();
    const { Option } = Select;
    const [api, contextHolder] = message.useMessage();
    const { Title } = Typography;
    const initialMaterials = useSelector((state) => state.initialMaterials);
    const materialOnShipping = useSelector((state) => state.materialOnShipping);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(getInitialMaterialsFetch());
    }, []);

    useEffect(() => {
        if (materialOnShipping.message) {
            api.success(materialOnShipping.message);
            dispatch(resetData_MaterialOnShipping())
        }
        if (materialOnShipping.error) {
            api.error(materialOnShipping.error);
            dispatch(resetData_MaterialOnShipping())
        }
    }, [materialOnShipping.message, materialOnShipping.error]);

    const [mater, setmater] = useState({
        initial_material_id: "",
        quantity: "",
        date: "",
    })

    const [excel_file, setFile] = useState({
        excel_file: null,
    });

    const selected_initialMaterial_id = (selectedValue) => {
        setmater(prevState => ({ 
            ...prevState, 
            initial_material_id: selectedValue
        }));
    };

    const handleDateChange = (dat) => {
        if (dat) {
            setmater(prevState => ({
                ...prevState,
                date: dayjs(dat).format('YYYY-MM-DD HH:mm:ss'),
            }));
        } else {
            setmater(prevState => ({
                ...prevState,
                date: null,
            }));
        }
    };

    const onFinish = (e) => {
        setOpen(false);
        dispatch(addMaterialOnShippingFetch(mater))
    };

    const onSubmit = () => {
        let dataFile = { excel_file: excel_file.excel_file }
        dispatch(uploadMaterialOnShippingFileFetch(dataFile))
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


   

    return (
        <div  className="conatiner_body" 
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {contextHolder}

        <Form
                layout="horizental"
                hideRequiredMark
                onFinish={onSubmit}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item name="title">
                    <Title
                        level={5}
                        style={{
                            fontFamily: 'Cairo',
                            color: '#213242',
                        }}
                    >يمكن تحميل الملف الخاص بالبضاعة من هنا</Title>
                </Form.Item>
                <Form.Item name="upload">
                    <Upload
                        beforeUpload={() => false}
                        onChange={(e) => {
                            setFile(prevState => ({ ...prevState, excel_file: e.file }));
                        }}
                    >
                        <Button
                            icon={<UploadOutlined />}
                            size='middle'
                            style={{ fontWeight: '600', width: '290px' }}
                        >تحميل ملف إكسل</Button>
                    </Upload>
                </Form.Item>
                <Form.Item name="button">
                    <Button
                        style={{ fontWeight: '700', width: '290px' }}
                        type="primary"
                        htmlType="submit"
                    >إرسال</Button>
                </Form.Item>

<Button style={{   width: '290px' }}   onClick={() => {
      setOpen(true);
    }}>
        إضافة يدوية 
      </Button>
      <Modal open={open} title="إضافة بضاعة في الطريق " onCancel={() => {
      setOpen(false);
    }} footer={null} width={700}>
            <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            autoComplete="off"
            hideRequiredMark
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
          

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
                                onChange={(value) => setmater({ ...mater, quantity: value })}
                            />
                        </Form.Item>
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
            <Row gutter={16} justify="end">
                <Col>
                <Button 
                style={{ fontWeight: '600' }}
                onClick={() => {
                    setOpen(false);
                  }}>إغلاق</Button>
                </Col>
                <Col>
                <Button type="primary" htmlType="submit">
                    إضافة بضاعة في الطريق{" "}
                </Button>
                </Col>
            </Row>
            </Form>
           
           
        </Modal>






            </Form>        
    </div >
    )
}

export default AddMaterialOnShipping