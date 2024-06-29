import { useEffect, useState } from "react";
import { Button, Col, Form, Input, InputNumber, Modal, Row, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { resetData_pigmentCosts, updatePigmentCostsStart } from "../../redux/PigmentCosts/PigmentCostsSlice";
import { useForm } from "antd/es/form/Form";

export default function Update_PigmentCosts({ open, onClose, id, old_items }) {
  const dispatch = useDispatch();
  const pigmentCosts = useSelector((state) => state.pigmentCosts);
  const [form] = useForm();

  const [onePigmentCosts, setOnePigmentCosts] = useState({
    measure: "",
    value: "",
    id:id
  });

  const [api, contextHolder] = message.useMessage();
  useEffect(() => {
    if (pigmentCosts.message != null) {
      api.success(pigmentCosts.message);
      dispatch(resetData_pigmentCosts());
    }
    if (pigmentCosts.error != null) {
      api.error(pigmentCosts.error);
      dispatch(resetData_pigmentCosts());
    }
  }, [pigmentCosts.message, pigmentCosts.error]);

  useEffect(() => {
    const itemToUpdate = old_items.find(item => item.id === id);

    if (itemToUpdate) {
      form.setFieldsValue({
        measure: itemToUpdate.measure,
        value: itemToUpdate.value,
      });
    }
  }, [form, id, old_items]);

  const onFinish = (e) => {
    const filteredExpenses = {
      ...onePigmentCosts,
      // Remove properties with null values
      measure: onePigmentCosts.measure !== null ? onePigmentCosts.measure : undefined,
      value: onePigmentCosts.value !== null ? onePigmentCosts.value : undefined,
  };
      dispatch(updatePigmentCostsStart(filteredExpenses));
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
        title="تعديل التكاليف الصباغية"
        onCancel={onClose}
        footer={null}
      >
        <Form
          form={form}
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
            name="measure"
          >
            <Input
              onChange={(e) =>
                setOnePigmentCosts({
                  ...onePigmentCosts,
                  measure: e.target.value,
                })
              }
            />
          </Form.Item>

          <Form.Item 
          label="نسبة الصباغ "
          name="value"
          >
            <InputNumber  addonAfter="%" onChange={(e) =>
            setOnePigmentCosts({...onePigmentCosts, value: e })
          }
            style={{ width: '100%' }}/>
          </Form.Item>
          
          <Row gutter={16} justify="end">
            <Col>
              <Button onClick={onClose}>إغلاق</Button>
            </Col>

            <Col>
              <Button type="primary" htmlType="submit">
                تعديل التكاليف الصباغية
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
