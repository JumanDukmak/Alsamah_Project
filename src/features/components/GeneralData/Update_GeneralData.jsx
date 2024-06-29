import { useEffect, useState } from "react";
import { Button, Col, Form, Input, InputNumber, Modal, Row, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { resetData_GeneralData, updateGeneralDataStart } from "../../redux/GeneralData/GeneralDataSlice";
import { useForm } from "antd/es/form/Form";

export default function Update_GeneralData({ open, onClose, id, old_items }) {
  const dispatch = useDispatch();
  const generalData = useSelector((state) => state.GeneralData);
  const [form] = useForm();

  const [oneGeneralData, setOneGeneralData] = useState({
    name: "",
    value: "",
    id:id
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

  useEffect(() => {
    const itemToUpdate = old_items.find(item => item.id === id);

    if (itemToUpdate) {
        form.setFieldsValue({
          name: itemToUpdate.name,
          value: itemToUpdate.value,
        });
    }
}, [form, id, old_items]);

  const onFinish = (e) => {
    const filteredExpenses = {
      ...oneGeneralData,
      // Remove properties with null values
      name: oneGeneralData.name !== null ? oneGeneralData.name : undefined,
      value: oneGeneralData.value !== null ? oneGeneralData.value : undefined,
  };
      dispatch(updateGeneralDataStart(filteredExpenses));
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
        title="تعديل المعطيات العامة "
        onCancel={onClose}
        footer={null}
      >
        <Form
        form={form}
        className='Update_GeneralData'
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
            name="name"
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
          >
            <InputNumber
              style={{ width: '100%' }}
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
                تعديل المعطيات العامة
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
