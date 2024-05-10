import { useEffect, useState } from "react";
import { Button, Col, Form, Input, InputNumber, Modal, Row, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {

  resetData_IndustrialExpense,
  updateIndustrialExpenseStart,
} from "../../redux/Indirect_IndustrialExpense/IndustrialExpenseSlice";



export default function Update_IndustrialExpense({ open, onClose,id }) {
  const dispatch = useDispatch();
  const industrialExpense = useSelector((state) => state.IndustrialExpense);
  const [oneIndustrialExpense, setOneIndustrialExpense] = useState({
    name: "",
    monthlyD: "",
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

  const onFinish = (e) => {
     dispatch(updateIndustrialExpenseStart(oneIndustrialExpense));
    console.log(`the helllllooooo`);
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
            rules={[
              {
                required: true,
                message: "ادخل اسم المصاريف الصناعية !",
              },
            ]}
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
rules={[
  {
    required: true,
    message: "ادخل التكلفة الشهرية !",
  },
]}
>


    <InputNumber  addonAfter="$" onChange={(e) =>
  
                setOneIndustrialExpense({
                  ...oneIndustrialExpense,
                  monthlyD: e,
                })
              
              } />
  
  


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
