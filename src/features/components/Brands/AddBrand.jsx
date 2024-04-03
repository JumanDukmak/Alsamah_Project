import { useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addBrandStart, resetData_brand } from "../../redux/Brands/brandsSlice";

export default function AddBrand({ open, onClose }) {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brands);
  const [brand, setBrand] = useState({
    name: "",
  });

  const [api, contextHolder] = message.useMessage();
  useEffect(() => {
    if (brands.message != null) {
      api.success(brands.message);
      dispatch(resetData_brand());
    }
    if (brands.error != null) {
      api.error(brands.error);
      dispatch(resetData_brand());
    }
  }, [brands.message, brands.error]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = (e) => {
    dispatch(addBrandStart(brand));
    onClose();
  };

  return (
    <>
      {contextHolder}
      <Modal open={open} title="إضافة ماركة" onCancel={onClose} footer={null}>
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
            label="اسم الماركة"
            name="اسم الماركة"
            rules={[
              {
                required: true,
                message: "ادخل اسم الماركة !",
              },
            ]}
          >
            <Input
              onChange={(e) => setBrand({ ...brand, name: e.target.value })}
            />
          </Form.Item>
          <Row gutter={16} justify="end">
            <Col>
              <Button onClick={onClose}>إغلاق</Button>
            </Col>

            <Col>
              <Button type="primary" htmlType="submit">
                إضافة ماركة{" "}
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
