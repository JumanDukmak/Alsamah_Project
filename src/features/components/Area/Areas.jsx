import { useEffect, useState } from "react";
import { Avatar, Button, Card, Col, Row, message } from "antd";
import Meta from "antd/es/card/Meta";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAreasStart, resetData_Areas } from "../../redux/Area/areasSlice";
import AddArea from "./AddArea";

const Areas = () => {
  const dispatch = useDispatch();
  const areas = useSelector((state) => state.areas);

  useEffect(() => {
    dispatch(getAreasStart());
  }, []);

  const [api, contextHolder] = message.useMessage();
  useEffect(() => {
    if (areas.message != null) {
      api.success(areas.message);
      dispatch(resetData_Areas());
    }
    if (areas.error != null) {
      api.error(areas.error);
      dispatch(resetData_Areas());
    }
  }, [areas.message, areas.error]);

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  return (
    <div className="conatiner_body">
      {contextHolder}
      <div className="title">
        <h2>المناطق</h2>
        <Button
          type="primary"
          onClick={showDrawer}
          style={{ fontWeight: "700" }}
          icon={<PlusOutlined />}
        >
          إضافة منطقة
        </Button>
        <AddArea
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        />
      </div>

      <div className="container_child">
        <Row gutter={[16, 24]}>
          {areas.areas.map((area, i) => (
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
                      {area.name.charAt(0).toUpperCase()}
                    </Avatar>
                  }
                  title={area.name}
                  description={` المحافظة  : ${area.governorate} `}
                />
                  <Meta
                  
    description={`اسم القطاع : ${area.salesperson.full_name}`}
    style={{ textAlign: "center" }}
  />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};
export default Areas;
