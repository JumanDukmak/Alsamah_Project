import {
  Button,
  Form,
  Select,
  message,
  Typography,
  DatePicker,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCategoriesStart } from "../../redux/Category/categoriesSlice";
import { getProductionPlaneFetch, resetData_productionPlane } from "../../redux/production_Plane/productionPlane_Slice";

const { Option } = Select;
const { Title } = Typography;
const ShowProductionPlane = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productionPlane = useSelector((state) => state.productionPlane);
  const [productionPlanee, setProductionPlane] = useState({
    year: "",
    category: null,
  });

  const optionCategories = useSelector((state) => state.categories.categories);
  const selected_category = (selectedValue) => {
    setProductionPlane((prevState) => ({
      ...prevState,
      category: selectedValue,
    }));
  };

  useEffect(() => {
    dispatch(getCategoriesStart());
  }, []);

 
  const [messageApi, contextHolder] = message.useMessage();
  const error = () => {
    messageApi.open({
      type: 'error',
      content: productionPlane.error,
    });
  };


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = (e) => {

    let data = {
      year: productionPlanee.year,
      category: productionPlanee.category,
    };
    dispatch(getProductionPlaneFetch(data));
    if(productionPlane.error === null){
      navigate("/ProductionPlane",{ state: { year:productionPlanee.year  } });}

    else{
        error();
        resetData_productionPlane();
    }
  };

  return (
    <div
      className="conatiner_body"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {contextHolder}

      <Form
        layout="horizental"
        hideRequiredMark
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item name="title">
          <Title
            level={5}
            style={{
              fontFamily: "Cairo",
              color: "#213242",
              textAlign: "center",
            }}
          >
            {" "}
            استعراض خطة الإنتاج
          </Title>
        </Form.Item>

        <Form.Item
          name="year"
          label="السنة"
          rules={[
            {
              required: true,
              message: "ادخل السنة  !",
            },
          ]}
        >
          <DatePicker
            picker="year"
            placeholder="ادخل سنة المقارنة  "
            style={{ width: "100%" }}
            onChange={(value) => {
              setProductionPlane({
                ...productionPlanee,
                year: value.format("YYYY"),
              });

              console.log(`the ywar is : ${value.format("YYYY")}`);
            }}
          />
        </Form.Item>

        <Form.Item
          name="category"
          label=" الأصناف"
          rules={[
            {
              required: true,
              message: "ادخل اسم الصنف !",
            },
          ]}
        >
          <Select placeholder="ادخل الصنف " onChange={selected_category}>
            {optionCategories.map((c) => (
              <Option key={c.id} value={c.id}>
                {c.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="button">
          <Button
            style={{ fontWeight: "700", width: "290px" }}
            type="primary"
            htmlType="submit"
          >
            إرسال
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ShowProductionPlane;
