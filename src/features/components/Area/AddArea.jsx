import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getsalesPersonsStart } from "../../redux/SalesPerson/salesPersonSlice";
import {
  Button,
  Form,
  Input,
  Col,
  Row,
  Select,
  Drawer,
  message,
  Space,
  Divider,
  Typography,
} from "antd";
import { addAreaStart, resetData_Areas } from "../../redux/Area/areasSlice";
import AddSalesPerson from "../SalesPerson/AddSalesPerson";

const { Option } = Select;
const { Title } = Typography;

export default function AddArea({ open, onClose }) {
  const dispatch = useDispatch();
  const salesPersons = useSelector((state) => state.salesPersons);
  const areas = useSelector((state) => state.areas);

  useEffect(() => {
    dispatch(getsalesPersonsStart());
  }, []);

  const [area, setArea] = useState({
    name: "",
    governorate: "",
    salesperson_id: "",
  });

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

  const List_governorate = [
    {
      value: "1",
      label: "دمشق",
    },
    {
      value: "2",
      label: "ريف دمشق",
    },
    {
      value: "3",
      label: "حمص",
    },
    {
      value: "4",
      label: "حماة",
    },
    {
      value: "5",
      label: "حلب",
    },
    {
      value: "6",
      label: "ادلب",
    },
    {
      value: "7",
      label: "اللاذقية",
    },
    {
      value: "8",
      label: "طرطوس",
    },
    {
      value: "9",
      label: "درعا",
    },
    {
      value: "10",
      label: "سويدا",
    },
    {
      value: "11",
      label: "قنيطرة",
    },
    {
      value: "12",
      label: "دير الزور",
    },
    {
      value: "13",
      label: "حسكة",
    },
    {
      value: "14",
      label: "الرقة",
    },
  ];

  const selected_governorate = (selectedValue) => {
    const selectedGov = List_governorate.find(
      (gov) => gov.value === selectedValue
    );
    if (selectedGov) {
      setArea((prevState) => ({
        ...prevState,
        governorate: selectedGov.label,
      }));
    }
  };

  const selected_salesperson_id = (selectedValue) => {
    setArea((prevState) => ({ ...prevState, salesperson_id: selectedValue }));
  };

  const [openModelSalesPers, setOpenModelSalesPers] = useState(false);

  const show_modal_AddSalesPerson = () => {
    setOpenModelSalesPers(true);
  };

  const onFinish = (e) => {
    dispatch(addAreaStart(area));
    onClose();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Drawer
        title="إضافة منطقة"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={null}
      >
        <Form
          layout="vertical"
          hideRequiredMark
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="اسم المنطقة"
                rules={[
                  {
                    required: true,
                    message: "ادخل اسم المنطقة!",
                  },
                ]}
              >
                <Input
                  placeholder="ادخل اسم المنطقة"
                  onChange={(e) => setArea({ ...area, name: e.target.value })}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="governorate"
                label="المحافظة"
                rules={[
                  {
                    required: true,
                    message: "ادخل اسم المحافظة!",
                  },
                ]}
              >
                <Select
                  placeholder="ادخل اسم المحافظة"
                  onChange={selected_governorate}
                >
                  {List_governorate.map((gov) => (
                    <Option key={gov.value} value={gov.value}>
                      {gov.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} type="flex" align="middle">
            <Col span={12}>
              <Form.Item
                name="salesperson_id"
                label="القطاع"
                rules={[
                  {
                    required: true,
                    message: "ادخل اسم القطاع!",
                  },
                ]}
              >
                <Select
                  placeholder="ادخل اسم القطاع"
                  onChange={selected_salesperson_id}
                >
                  {salesPersons.salesPersons.map((s) => (
                    <Option key={s.id} value={s.id}>
                      {`${s.first_name} ${s.last_name}`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col>
              <Button onClick={onClose}>إغلاق</Button>
            </Col>

            <Col>
              <Button type="primary" htmlType="submit">
                إضافة منطقة{" "}
              </Button>
            </Col>
          </Row>
        </Form>
        <Divider />
        <Form
          layout="horizental"
          hideRequiredMark
          style={{ padding: "10px" }}
          onFinish={show_modal_AddSalesPerson}
          onFinishFailed={onFinishFailed}
        >
          <Row>
            <Form.Item name="title">
              <Title
                level={5}
                style={{ fontFamily: "Cairo", color: "#213242" }}
              >
                يمكن إضافة مندوب جديد{" "}
              </Title>
            </Form.Item>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Button type="primary" htmlType="submit">
                إضافة قطاع{" "}
              </Button>
              <AddSalesPerson
                open={openModelSalesPers}
                onClose={() => {
                  setOpenModelSalesPers(false);
                }}
              />
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
}
