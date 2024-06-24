import { useEffect, useState } from "react";
import { Button, Col, Form, Input, InputNumber, Modal, Row, message } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { addPigmentCostsStart, resetData_pigmentCosts } from "../../redux/PigmentCosts/PigmentCostsSlice";



export default function Add_PigmentCosts({ open, onClose }) {
  const dispatch = useDispatch();

  const pigmentCosts = useSelector((state) => state.pigmentCosts);

  const [onePigmentCosts, setOnePigmentCosts] = useState({
    measure: "",
    value: "",
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

  const onFinish = (e) => {
    dispatch(addPigmentCostsStart(onePigmentCosts));
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
        title="إضافة مصاريف صباغية"
        onCancel={onClose}
        footer={null}
      >
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
            label="الاسم"
            name="measure"
            rules={[
              {
                required: true,
                message: "ادخل اسم التكاليف الصباغية !",
              },
            ]}
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
rules={[
  {
    required: true,
    message: "ادخل  نسبة الصباغ !",
  },
]}
>


    <InputNumber  addonAfter="%" onChange={(e) =>
  
  setOnePigmentCosts({
    ...onePigmentCosts,
    value: e,
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
                إضافة مصاريف صباغية
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
