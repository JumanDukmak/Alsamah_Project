import { Button, Col, Input, Row, Form, Select, Space, Drawer, InputNumber, message, Upload, Divider, Typography } from "antd"
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetData_sales, uploadExpectSalesFileFetch } from "../../redux/Sales/salesSlice";

const AddExpectSales = () => {
    const dispatch = useDispatch();
    const [api, contextHolder] = message.useMessage();
    const { Title } = Typography;

    const sales = useSelector((state) => state.sales)
    useEffect(() => {
        if (sales.message) {
            api.success(sales.message);
            dispatch(resetData_sales())
        }
        if (sales.error) {
            api.error(sales.error);
            dispatch(resetData_sales())
        }
    }, [sales.message, sales.error]);

    const [excel_file, setFile] = useState({
        excel_file: null
    });

    const onSubmit = (e) => {
        let dataFile = { excel_file: excel_file }
        dispatch(uploadExpectSalesFileFetch(dataFile))
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        
        
        <div 
        className="conatiner_body" 
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
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
                    >يمكن تحميل الملف الخاص بالمبيعات المتوقعة من هنا</Title>
                </Form.Item>
                <Form.Item name="upload">
                    <Upload
                        beforeUpload={() => false}
                        onChange={(e) => {
                            setFile(e.file);
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
            </Form>
        </div>
    )
}

export default AddExpectSales