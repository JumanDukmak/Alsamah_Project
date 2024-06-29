import { useEffect, useState } from "react";
import { Button, Col, Form, Input, InputNumber, Space,Modal, Row, message, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { getInitialMaterialsFetch, resetData_initialMaterials, updateMaterialProductFetch } from "../../redux/InitialMaterials/initialMaterialsSlice";
import { useForm } from "antd/es/form/Form";

const { Option } = Select;


export default function UpdateMaterialProduct({ open, onClose,id,old_items }) {
  const [form] = useForm();
  const dispatch = useDispatch();
  const initialMaterials = useSelector((state) => state.initialMaterials);
  const [api, contextHolder] = message.useMessage();

  useEffect(()=>{
    dispatch(getInitialMaterialsFetch());
  },[])

  useEffect(() => {
     
      if (initialMaterials.message) {
          api.success(initialMaterials.message);
          dispatch(resetData_initialMaterials())
      }
      if (initialMaterials.error) {
          api.error(initialMaterials.error);
          dispatch(resetData_initialMaterials())
      }
     

  }, [initialMaterials.message,initialMaterials.error]);





  useEffect(() => {
    form.setFieldsValue({
      items: old_items
    });
  }, [form]);


  const onFinish = (e) => {
let data={
  productId:id,
  items:e.items
}

     dispatch(updateMaterialProductFetch(data));
   
    
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
        title=" تعديل المواد الأولية"
        onCancel={onClose}
    
        footer={null}
        
      >
        <div style={{height:'20px'}}></div>
     
        <Form form={form}
    name="dynamic_form_nest_item"
    onFinish={onFinish}
    style={{
      maxWidth: 600,
    }}
    autoComplete="off"
  >
    <Form.List name="items" >
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => {

         return(  <Space
          key={key}
          style={{
            display: 'flex',
            marginBottom: 8,
          }}
          align="baseline"
        >
          <Form.Item
         
            {...restField}
            name={[name, 'initial_material_id']}
            rules={[
              {
                required: true,
                message: 'ادخل المادة الأولية',
              },
            ]}
          >

          
            <Select
              placeholder="ادخل اسم المادة الاولية"
              style={{
                width: 230,
              }}
            >
              {initialMaterials.initialMaterials.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.material_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            {...restField}
            name={[name, 'quantity']}
            rules={[
              {
                required: true,
                message: '  ادخل الكمية',
              },
            ]}
          >
        
            <InputNumber
            placeholder="ادخل الكمية المطلوبة  "
style={{
  width: 200,
}}

stringMode
/>
          </Form.Item>
          <MinusCircleOutlined onClick={() => remove(name)} />
        </Space>);
})}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
             إضافة مادة أولية أخرى
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
    <Form.Item>
      <Button type="primary" htmlType="submit">
        تعديل
      </Button>
    </Form.Item>
  </Form>







      </Modal>
    </>
  );
}
