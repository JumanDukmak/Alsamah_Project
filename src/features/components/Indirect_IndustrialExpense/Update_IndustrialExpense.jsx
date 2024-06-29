import { useEffect, useState } from "react";
import { Button, Col, Form, Input, InputNumber, Modal, Row, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { resetData_IndustrialExpense, updateIndustrialExpenseStart } from "../../redux/Indirect_IndustrialExpense/IndustrialExpenseSlice";
import { useForm } from "antd/es/form/Form";

export default function Update_IndustrialExpense({ open, onClose, id, old_items }) {
  const dispatch = useDispatch();
  const industrialExpense = useSelector((state) => state.IndustrialExpense);
  const [form] = useForm();

  const [oneIndustrialExpense, setOneIndustrialExpense] = useState({
    name: "",
    monthlyD: null,
    id:id
  });

  const [api, contextHolder] = message.useMessage();
  useEffect(() => {
    if (industrialExpense.message != null) {
      api.success(industrialExpense.message);
      dispatch(resetData_IndustrialExpense());
    }
    if (industrialExpense.error != null) {
      api.error(industrialExpense.error);
      dispatch(resetData_IndustrialExpense());
    }
  }, [industrialExpense.message, industrialExpense.error]);

  useEffect(() => {
    const itemToUpdate = old_items.find(item => item.id === id);

    if (itemToUpdate) {
        form.setFieldsValue({
            name: itemToUpdate.name,
            monthlyD: itemToUpdate.monthlyD,
        });
    }
}, [form, id, old_items]);

  const onFinish = (e) => {
    const filteredExpenses = {
      ...oneIndustrialExpense,
      // Remove properties with null values
      name: oneIndustrialExpense.name !== null ? oneIndustrialExpense.name : undefined,
      monthlyD: oneIndustrialExpense.monthlyD !== null ? oneIndustrialExpense.monthlyD : undefined,
  };
      dispatch(updateIndustrialExpenseStart(filteredExpenses));
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
        title="تعديل المصاريف صناعية"
        onCancel={onClose}
        footer={null}
      >
        <Form
          form={form}
          className='Update_IndustrialExpense'
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
                setOneIndustrialExpense({
                  ...oneIndustrialExpense,
                  name: e.target.value,
                })
              }
            />
          </Form.Item>

          <Form.Item 
          label="التكاليف الشهرية"
          name="monthlyD"
          >
            <InputNumber addonAfter="$" onChange={(e) =>
                setOneIndustrialExpense({
                  ...oneIndustrialExpense,
                  monthlyD: e,
                })
              
              } 
              style={{ width: '100%' }}/>
          </Form.Item>

          <Row gutter={16} justify="end">
            <Col>
              <Button onClick={onClose}>إغلاق</Button>
            </Col>

            <Col>
              <Button type="primary" htmlType="submit">
                تعديل مصاريف صناعية
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
