import { useEffect, useState } from "react";
import {
  Button,

  Col,
  Form,

  Input,
  InputNumber,
  Modal,
  Row,

  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addGeneralDataStart,
  resetData_GeneralData,
} from "../../redux/GeneralData/GeneralDataSlice";

export default function Add_GeneralData({ open, onClose }) {
  const dispatch = useDispatch();

  const generalData = useSelector((state) => state.GeneralData);
  const [oneGeneralData, setOneGeneralData] = useState({
    name: "",
    value: "",
  });

  const [api, contextHolder] = message.useMessage();
  useEffect(() => {
    if (generalData.message != null) {
      api.success(generalData.message);
      dispatch(resetData_GeneralData());
    }
    if (generalData.error != null) {
      api.error(generalData.error);
      dispatch(resetData_GeneralData());
    }
  }, [generalData.message, generalData.error]);

  const onFinish = (e) => {
    dispatch(addGeneralDataStart(oneGeneralData));
    onClose();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {contextHolder}
      <Modal
        open={open}
        title="إضافة معطيات عامة"
        onCancel={onClose}
        footer={null}
      >
        <Form
          className="Add_GeneralData"
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
            label="الاسم"
            name="name_"
            rules={[
              {
                required: true,
                message: "ادخل عنوان المعطيات الصناعية !",
              },
            ]}
          >
            <Input
              onChange={(e) =>
                setOneGeneralData({
                  ...oneGeneralData,
                  name: e.target.value,
                })
              }
            />
          </Form.Item>

          <Form.Item
            label=" القيمة"
            name="value"
            rules={[
              {
                required: true,
                message: "ادخل القيمة !",
              },
            ]}
          >
            <InputNumber
             
              onChange={(e) =>
                setOneGeneralData({
                  ...oneGeneralData,
                  value: e,
                })
              }
            />
          </Form.Item>

          <Row gutter={16} justify="end">
            <Col>
              <Button onClick={onClose}>إغلاق</Button>
            </Col>

            <Col>
              <Button type="primary" htmlType="submit">
                إضافة معطيات عامة
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
