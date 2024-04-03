import { useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategoryStart,
  resetData_category,
} from "../../redux/Category/categoriesSlice";

export default function AddCategory({ open, onClose }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const [category, setCategory] = useState({
    name: "",
  });

  const [api, contextHolder] = message.useMessage();
  useEffect(() => {
    if (categories.message != null) {
      api.success(categories.message);
      dispatch(resetData_category());
    }
    if (categories.error != null) {
      api.error(categories.error);
      dispatch(resetData_category());
    }
  }, [categories.message, categories.error]);

  const onFinish = (e) => {
    dispatch(addCategoryStart(category));
    onClose();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Modal open={open} title="إضافة صنف" onCancel={onClose} footer={null}>
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
            label="اسم الصنف"
            name="اسم الصنف"
            rules={[
              {
                required: true,
                message: "ادخل اسم الصنف !",
              },
            ]}
          >
            <Input
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
            />
          </Form.Item>
          <Row gutter={16} justify="end">
            <Col>
              <Button onClick={onClose}>إغلاق</Button>
            </Col>

            <Col>
              <Button type="primary" htmlType="submit">
                إضافة صنف
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
