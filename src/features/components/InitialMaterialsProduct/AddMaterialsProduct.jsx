import { useEffect, useState } from "react";
import { Modal,  message, Select, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { addMaterialProductFetch, getInitialMaterialsFetch, resetData_initialMaterials } from "../../redux/InitialMaterials/initialMaterialsSlice";
import { Button, Form,  Space } from 'antd';
const { Option } = Select;


export default function AddMaterialProduct({ open, onClose,id }) {
  const dispatch = useDispatch();
  const intialMaterial=useSelector((state)=> state.initialMaterials)
  const [api, contextHolder] = message.useMessage();
  const initialMaterials = useSelector((state) => state.initialMaterials);

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


  
  const onFinish = (e) => {

  
    let data={
      productId:id,
      items:e.items
    }
dispatch(addMaterialProductFetch(data))
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
        title=" إضافة المواد الأولية"
        onCancel={onClose}
    
        footer={null}
        
      >
        <div style={{height:'20px'}}></div>
     
        <Form
    name="dynamic_form_nest_item"
    onFinish={onFinish}
    style={{
      maxWidth: 600,
    }}
    autoComplete="off"
  >
    <Form.List name="items">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space
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
            </Space>
          ))}
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
        إضافة
      </Button>
    </Form.Item>
  </Form>







      </Modal>
    </>
  );
}
