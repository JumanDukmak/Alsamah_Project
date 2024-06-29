import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDirectWorkStart,
  resetData_directWork,
} from "../../redux/directWork/directWorkSlice";
import { getProductCardFetch } from "../../redux/products/productSlice";

const { Option } = Select;

export default function RemoveDirectWorks({
  open,
  onClose,
  id,
  all_directWorks,
}) {
  const dispatch = useDispatch();

  const [listDirectWork, setListDirectWork] = useState({
    working_numbers: [], //for all work numbers
    directWorks: [], // all objs
  });

  useEffect(() => {
    if (all_directWorks && listDirectWork.working_numbers.length === 0) {
      const updatedWorkingNumbers = all_directWorks.map(
        (p) => p.working_number
      );
      setListDirectWork((prevState) => ({
        ...prevState,
        directWorks: all_directWorks,
        working_numbers: updatedWorkingNumbers,
      }));
    }

    console.log(
      `the ids ${
        listDirectWork.working_numbers.length
      } and the direct ${JSON.stringify(listDirectWork.directWorks.length)}`
    );
  }, [all_directWorks]);

  const directWorks = useSelector((state) => state.directWorks);

  const [api, contextHolder] = message.useMessage();

  useEffect(() => {
    if (directWorks.message) {
      api.success(directWorks.message);
      dispatch(resetData_directWork());
    }
    if (directWorks.error) {
      api.error(directWorks.error);
      dispatch(resetData_directWork());
    }
  }, [directWorks.message, directWorks.error]);

  const onFinish = (e) => {
    let data = {
      productId: id,
      directWork: listDirectWork.working_numbers,
    };
  
    dispatch(deleteDirectWorkStart(data));
    dispatch(getProductCardFetch(id));
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
        title="حذف قوى عاملة"
        onCancel={onClose}
        footer={null}
      >
        <Form
          className="Remove_DirectWorks"
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
              //defaultValue={listDirectWork.directWorks.length > 0 ? listDirectWork.directWorks[0].working_type : null}
              defaultValue={all_directWorks.map((work) => work.working_type)}
              mode="multiple"
              placeholder=" القوى العاملة"
              optionLabelProp="label"
              style={{
                width: "100%",
              }}
              onChange={(value) => {
                const selectedValues = Array.isArray(value) ? value : [value];
                const working_numbers_productionRates = selectedValues.map(
                  (value) => {
                    const option = listDirectWork.directWorks.find(
                      (option) => option.working_type === value
                    );
                    return option ? option.working_number : null;
                  }
                );
                setListDirectWork({
                  ...listDirectWork,
                  working_numbers: working_numbers_productionRates,
                });
              }}
            >
              {listDirectWork.directWorks.map((option) => (
                <Option
                  key={option.working_number}
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
                حذف قوى عاملة
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
