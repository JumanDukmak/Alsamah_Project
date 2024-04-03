import { useEffect, useState } from "react";
import { Avatar, Button, Card, Col, Row, message } from "antd";
import Meta from "antd/es/card/Meta";
import { useDispatch, useSelector } from "react-redux";
import AddCategory from "./AddCategory";
import {
  getCategoriesStart,
  resetData_category,
} from "../../redux/Category/categoriesSlice";
import { PlusOutlined } from "@ant-design/icons";

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(getCategoriesStart());
  }, []);

  const [api, contextHolder] = message.useMessage();
  useEffect(() => {
    if (categories.message != null) {
      api.success(categories.message);
      dispatch(resetData_category());
    }
    if (categories.error != null) {
      api.error(categories.error);
      dispatch(resetData_category());
    }
  }, [categories.message, categories.error]);

  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  return (
    <div className="conatiner_body">
      {contextHolder}
      <div className="title">
        <h2>الأصناف</h2>
        <Button
          type="primary"
          onClick={showModal}
          style={{ fontWeight: "700" }}
          icon={<PlusOutlined />}
        >
          إضافة صنف
        </Button>
        <AddCategory
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        />
      </div>

      <div className="container_child">
        <Row gutter={[16, 24]}>
          {categories.categories.map((category, i) => (
            <Col className="gutter-row" key={i}>
              <Card
                hoverable
                style={{
                  width: 300,
                  marginRight: "10px",
                }}
              >
                <Meta
                  avatar={
                    <Avatar
                      style={{ backgroundColor: "#02e079b0", color: "white" }}
                    >
                      {category.name.charAt(0).toUpperCase()}
                    </Avatar>
                  }
                  title={category.name}
                  // description={` تاريخ الإضافة  : ${'24-11-2020'}`}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Categories;
