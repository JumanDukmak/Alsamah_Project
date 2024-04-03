import { useEffect, useState } from "react";
import { Avatar, Button, Card, Col, Row, message } from "antd";
import Meta from "antd/es/card/Meta";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountriesStart,
  resetData_Country,
} from "../../redux/Country/countriesSlice";
import AddCountry from "./AddCountry";
import { PlusOutlined } from "@ant-design/icons";

const Countries = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  useEffect(() => {
    dispatch(getCountriesStart());
  }, []);

  const [api, contextHolder] = message.useMessage();
  useEffect(() => {
    if (countries.message != null) {
      api.success(countries.message);
      dispatch(resetData_Country());
    }
    if (countries.error != null) {
      api.error(countries.error);
      dispatch(resetData_Country());
    }
  }, [countries.message, countries.error]);

  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  return (
    <div className="conatiner_body">
      {contextHolder}
      <div className="title">
        <h2>المدن</h2>
        <Button
          type="primary"
          onClick={showModal}
          style={{ fontWeight: "700" }}
          icon={<PlusOutlined />}
        >
          إضافة مدينة
        </Button>
        <AddCountry
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        />
      </div>

      <div className="container_child">
        <Row gutter={[16, 24]}>
          {countries.countries.map((country, i) => (
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
                      {country.name.charAt(0).toUpperCase()}
                    </Avatar>
                  }
                  title={country.name}
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

export default Countries;
