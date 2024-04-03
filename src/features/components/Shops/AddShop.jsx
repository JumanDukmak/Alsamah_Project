import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addShopStart, resetData_Shops } from "../../redux/Shops/shopsSlice";

export default function AddShop({ open, onClose }) {
  const dispatch = useDispatch();
  const shops = useSelector((state) => state.shops);
  const [shop, setShop] = useState({
    name: "",
  });

  const [api, contextHolder] = message.useMessage();
  useEffect(() => {
    if (shops.message != null) {
      api.success(shops.message);
      dispatch(resetData_Shops());
    }
    if (shops.error != null) {
      api.error(shops.error);
      dispatch(resetData_Shops());
    }
  }, [shops.message, shops.error]);

  const onFinish = (e) => {
    dispatch(addShopStart(shop));
    onClose();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Modal open={open} title="إضافة محل" onCancel={onClose} footer={null}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          hideRequiredMark
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="اسم محل"
            name="اسم محل"
            rules={[
              {
                required: true,
                message: "ادخل اسم المحل !",
              },
            ]}
          >
            <Input
              onChange={(e) => setShop({ ...shop, name: e.target.value })}
            />
          </Form.Item>
          <Row gutter={16} justify="end">
            <Col>
              <Button onClick={onClose}>إغلاق</Button>
            </Col>

            <Col>
              <Button type="primary" htmlType="submit">
                إضافة محل
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
