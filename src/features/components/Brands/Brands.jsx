import { useEffect, useState } from "react";
import { Avatar, Button, Card, Col, Row, message } from "antd";
import Meta from "antd/es/card/Meta";
import { useDispatch, useSelector } from "react-redux";
import AddBrand from "./AddBrand";
import {
  getBrandsStart,
  resetData_brand,
} from "../../redux/Brands/brandsSlice";
import { PlusOutlined } from "@ant-design/icons";

const Brands = () => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brands);
  useEffect(() => {
    dispatch(getBrandsStart());
  }, []);

  const [api, contextHolder] = message.useMessage();
  useEffect(() => {
    if (brands.message != null) {
      api.success(brands.message);
      dispatch(resetData_brand());
    }
    if (brands.error != null) {
      api.error(brands.error);
      dispatch(resetData_brand());
    }
  }, [brands.message, brands.error]);

  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  return (
    <div className="conatiner_body">
      {contextHolder}
      <div className="title">
        <h2>الماركات</h2>
        <Button
          type="primary"
          onClick={showModal}
          style={{ fontWeight: "700" }}
          icon={<PlusOutlined />}
        >
          إضافة ماركة
        </Button>
        <AddBrand
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        />
      </div>

      <div className="container_child">
        <Row gutter={[16, 24]}>
          {brands.brands.map((Brand, i) => (
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
                      {Brand.name.charAt(0).toUpperCase()}
                    </Avatar>
                  }
                  title={Brand.name}
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

export default Brands;
