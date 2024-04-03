import { useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addCountryStart,
  resetData_Country,
} from "../../redux/Country/countriesSlice";

export default function AddCountry({ open, onClose }) {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const [country, setCountry] = useState({
    name: "",
  });

  const [api, contextHolder] = message.useMessage();
  useEffect(() => {
    if (countries.message != null) {
      api.success(countries.message);
      dispatch(resetData_Country());
    }
    if (countries.error != null) {
      api.error(countries.error);
      dispatch(resetData_Country());
    }
  }, [countries.message, countries.error]);

  const onFinish = (e) => {
    dispatch(addCountryStart(country));
    onClose();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {contextHolder}
      <Modal open={open} title="إضافة مدينة" onCancel={onClose} footer={null}>
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
            label="اسم المدينة"
            name="اسم المدينة"
            rules={[
              {
                required: true,
                message: "ادخل اسم المدينة !",
              },
            ]}
          >
            <Input
              onChange={(e) => setCountry({ ...country, name: e.target.value })}
            />
          </Form.Item>
          <Row gutter={16} justify="end">
            <Col>
              <Button onClick={onClose}>إغلاق</Button>
            </Col>

            <Col>
              <Button type="primary" htmlType="submit">
                إضافة مدينة
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
