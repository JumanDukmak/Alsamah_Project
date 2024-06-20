import { useEffect, useState } from "react";
import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getProductionRatesFetch } from "../../redux/ProductionRates/productionRatesSlice";
import {  resetData } from "../../redux/products/productSlice";
import { addDirectCostFetch, resetData_directWork } from "../../redux/directWork/directWorkSlice";

const { Option } = Select;



export default function AddDirectWork({ open, onClose,id }) {
  const dispatch = useDispatch();

  const productionRates = useSelector((state) => state.productionRates);
  

  const [listDirectWork, setListDirectWork] = useState({
    directWorkCost: [],
  });
  useEffect(()=>{
dispatch(getProductionRatesFetch());
  },[])

 

  const directWorks = useSelector((state) => state.directWorks);

  const [api, contextHolder] = message.useMessage();

  useEffect(() => {
     
      
      if (directWorks.message) {
          api.success(directWorks.message);
          dispatch(resetData_directWork())
      }
      if (directWorks.error) {
          api.error(directWorks.error);
          dispatch(resetData_directWork())
      }

  }, [directWorks.message,directWorks.error]);


  

  const onFinish = (e) => {
    

    let data={directWorkCost:listDirectWork.directWorkCost ,id :id}
     console.log(`the ids === ${data.directWorkCost} 
     and the id is ${data.id}`)
       dispatch(addDirectCostFetch(data));
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
        title="إضافة قوى عاملة"
        onCancel={onClose}
        footer={null}
      >
        <Form

className='Add_DirectWork'

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
            label="القوى العاملة"
            name="name_"
            rules={[
              {
                required: true,
                message: "ادخل القوى العاملة !",
              },
            ]}
          >

<Select
                  mode="multiple"
                  placeholder=" القوى العاملة"
                  optionLabelProp="label"
                  onChange={(value) => {
                    const selectedValues = Array.isArray(value)
                      ? value
                      : [value];
                    const ids_productionRates = selectedValues.map((value) => {
                      const option = productionRates.productionRates.find(
                        (option) => option.working_type === value
                      );
                      return option ? option.id : null;
                    });
                    setListDirectWork({
                        ...listDirectWork,
                        directWorkCost: ids_productionRates,
                      })                  }}
                >
                  {productionRates.productionRates.map((option) => (
                    <Option
                      key={option.id}
                      value={option.working_type}
                      label={option.working_type}
                    >
                      {option.working_type}
                    </Option>



                  ))}
                </Select>


          </Form.Item>

         

          <Row gutter={16} justify="end">
            <Col>
              <Button onClick={onClose}>إغلاق</Button>
            </Col>

            <Col>
              <Button type="primary" htmlType="submit">
                إضافة قوى عاملة
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
