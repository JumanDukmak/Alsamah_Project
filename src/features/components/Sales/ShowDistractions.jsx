import { Button, Form, Col, Row, Select, message, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountriesStart } from "../../redux/Country/countriesSlice";
import { getBrandsStart } from "../../redux/Brands/brandsSlice";
import { getCategoriesStart } from "../../redux/Category/categoriesSlice";
import { getsalesPersonsStart } from "../../redux/SalesPerson/salesPersonSlice";
import { getAreasStart } from "../../redux/Area/areasSlice";
import { getShopsStart } from "../../redux/Shops/shopsSlice";
import {
  getExportSalesStart,
  getLocalSalesStart,
  getTotalSalesStart,
  resetData_distractions,
} from "../../redux/SalesReports/salesDistractionsSlice";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const ShowDistractions = () => {
  const [form] = Form.useForm();
  const salesDistraction = useSelector((state) => state.salesDistraction);
  const navigate = useNavigate();

  const [report, setReport] = useState({
    saletype: "",
    previous_year: "",
    local_saletype: "سوريا",
    brands_id: [], //list of brand
    categories_id: [], //list of categories
    country_id: null, //country
    salesperson_id: null,
    areas_id: [],
    governorate: null,
    shop_id: null,
  });

  const optionBrands = useSelector((state) => state.brands.brands);
  const optionCategories = useSelector((state) => state.categories.categories);
  const optionAreas = useSelector((state) => state.areas.areas);
  const salesPersons = useSelector((state) => state.salesPersons.salesPersons);
  const shops = useSelector((state) => state.shops.shops);
  const countries = useSelector((state) => state.countries);
  const dispatch = useDispatch();

  useEffect(() => {
    if (report.saletype !== "محلي") {
      form.setFieldsValue({
        local_saletype: "سوريا",
      });
    }
    if (report.local_saletype === "مندوبين" && report.areas_id.length !== 0) {
      console.log("true");
      form.setFieldsValue({
        salesperson_id: null,
      });
    }
    if (report.local_saletype === "مندوبين" && report.salesperson_id !== null) {
      console.log("true2");
      form.setFieldsValue({
        areas_id: null,
      });
    }
  }, [
    report.salesperson_id,
    report.areas_id,
    report.saletype,
    report.local_saletype,
  ]);

  useEffect(() => {
    console.log(`report.saletype is ${report.saletype}`);
    if (report.saletype === "تصدير") {
      dispatch(getCountriesStart());
    } else if (report.saletype === "محلي") {
      if (report.local_saletype === "مندوبين") {
        dispatch(getAreasStart());
        dispatch(getsalesPersonsStart());
      }
      if (report.local_saletype === "محلات") {
        dispatch(getShopsStart());
      }
    }
    dispatch(getBrandsStart());
    dispatch(getCategoriesStart());
  }, [report.saletype, report.local_saletype]);

  const [api, contextHolder] = message.useMessage();
  useEffect(() => {
    if (salesDistraction.message != null) {
      api.success(salesDistraction.message);
      dispatch(resetData_distractions());
    }
    if (salesDistraction.error != null) {
      api.error(salesDistraction.error);
      dispatch(resetData_distractions());
    }
  }, [salesDistraction.message, salesDistraction.error]);

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

  const List_saleType = [
    {
      id: "1",
      label: "تصدير",
    },
    {
      id: "2",
      label: "محلي",
    },
    {
      id: "3",
      label: "إجمالي",
    },
  ];

  const List_localSalesType = [
    {
      id: "1",
      label: "مندوبين",
    },
    {
      id: "2",
      label: "محلات",
    },
    {
      id: "3",
      label: "محافظات",
    },
  ];

  const selected_governorate = (selectedValue) => {
    const selectedGov = List_governorate.find(
      (gov) => gov.value === selectedValue
    );
    if (selectedGov) {
      setReport((prevState) => ({
        ...prevState,
        governorate: selectedGov.label,
      }));
    }
  };

  const selected_salesPersons = (selectedValue) => {
    setReport((prevState) => ({ ...prevState, salesperson_id: selectedValue }));
  };

  const selected_country = (selectedValue) => {
    console.log(`the country id is : ${selectedValue}`);
    setReport((prevState) => ({ ...prevState, country_id: selectedValue }));
  };

  const selected_shop = (selectedValue) => {
    setReport((prevState) => ({ ...prevState, shop_id: selectedValue }));
  };

  const selected_saleType = (selectedValue) => {
    const selectedSaleType = List_saleType.find((s) => s.id === selectedValue);
    if (selectedSaleType) {
      setReport((prevState) => ({
        ...prevState,
        local_saletype: "سوريا",
        saletype: selectedSaleType.label,
      }));
    }
  };

  const selected_localSaleType = (selectedValue) => {
    const selectedSaleType = List_localSalesType.find(
      (s) => s.id === selectedValue
    );
    if (selectedSaleType) {
      setReport((prevState) => ({
        ...prevState,
        local_saletype: selectedSaleType.label,
      }));
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = (e) => {
    if (report.saletype == "تصدير") {
      dispatch(getExportSalesStart(report));
      navigate("/distractions");
    } else if (report.saletype == "محلي") {
      dispatch(getLocalSalesStart(report));
      navigate("/distractions");
    } else if (report.saletype == "إجمالي") {
      dispatch(getTotalSalesStart(report));
      navigate("/distractions");
    }
  };

  return (
    <div className="conatiner_body">
      {contextHolder}
      <Row>
        <h2>انحرافات المبيعات</h2>
      </Row>
      <div style={{ height: "20px" }}></div>
      <div style={{ width: "100%", justifyContent: "center", display: "flex" }}>
        <Form
          style={{ width: "70%", padding: "20px" }}
          layout="vertical"
          hideRequiredMark
          initialValues={{ price: 1000 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="previous_year" label="السنة">
                <DatePicker
                  picker="year"
                  placeholder="ادخل سنة المقارنة  "
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    setReport({
                      ...report,
                      previous_year: value.format("YYYY"), // Update the selected year in the report state
                    });

                    console.log(`the ywar is : ${value.format("YYYY")}`);
                  }}
                />
              </Form.Item>
            </Col>

            {/* //---------------------------------نوع المبيع ---------------------------------------- */}
            <Col span={12}>
              <Form.Item
                name="saletype"
                label="نوع المبيع"
                rules={[
                  {
                    required: true,
                    message: "ادخل  نوع المبيع!",
                  },
                ]}
              >
                <Select
                  placeholder="ادخل نوع المبيع"
                  onChange={selected_saleType}
                >
                  {List_saleType.map((s) => (
                    <Option key={s.id} value={s.id}>
                      {s.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            {/* //----------------------------------المبيع المحلي ---------------------------------------- */}
            <Col span={12}>
              <Form.Item name="local_saletype" label="   نوع المبيع المحلي">
                <Select
                  placeholder="ادخل نوع المبيع المحلي"
                  onChange={selected_localSaleType}
                  disabled={report.saletype != "محلي"}
                  value={
                    report.saletype !== "محلي"
                      ? "سوريا"
                      : form.getFieldValue("local_saletype")
                  }
                >
                  {List_localSalesType.map((s) => (
                    <Option key={s.id} value={s.id}>
                      {s.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* ----------------------------------المحافظة  ---------------------------------------- */}
            <Col span={12}>
              <Form.Item name="governorate" label="المحافظة">
                <Select
                  placeholder="ادخل اسم المحافظة"
                  onChange={selected_governorate}
                  disabled={report.local_saletype != "محافظات"}
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
          <Row gutter={16}>
            {/* //----------------------------------المدينة  ---------------------------------------- */}
            <Col span={12}>
              <Form.Item name="country_id" label=" المدينة">
                <Select
                  placeholder="ادخل اسم المدينة"
                  onChange={selected_country}
                  disabled={report.saletype != "تصدير"}
                >
                  {countries.countries.map((c) => (
                    <Option key={c.id} value={c.id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            {/* //----------------------------------الأصناف  -------------------------------------- */}
            <Col span={12}>
              <Form.Item name="categories_id" label="الأصناف">
                <Select
                  mode="multiple"
                  placeholder=" الأصناف"
                  optionLabelProp="label"
                  onChange={(value) => {
                    const selectedValues = Array.isArray(value)
                      ? value
                      : [value];
                    const ids_categories = selectedValues.map((value) => {
                      const option = optionCategories.find(
                        (option) => option.name === value
                      );
                      return option ? option.id : null;
                    });
                    setReport({ ...report, categories_id: ids_categories });
                  }}
                >
                  {optionCategories.map((option) => (
                    <Option
                      key={option.id}
                      value={option.name}
                      label={option.name}
                    >
                      {option.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            {/* //----------------------------------الماركات  -------------------------------------- */}
            <Col span={12}>
              <Form.Item name="brands_id" label="الماركات">
                <Select
                  mode="multiple"
                  placeholder=" الماركات"
                  optionLabelProp="label"
                  onChange={(value) => {
                    const selectedValues = Array.isArray(value)
                      ? value
                      : [value];
                    const ids_brands = selectedValues.map((value) => {
                      const option = optionBrands.find(
                        (option) => option.name === value
                      );
                      return option ? option.id : null;
                    });
                    setReport({ ...report, brands_id: ids_brands });
                  }}
                >
                  {optionBrands.map((option) => (
                    <Option
                      key={option.id}
                      value={option.name}
                      label={option.name}
                    >
                      {option.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            {/* //----------------------------------المندوبين  -------------------------------------- */}
            <Col span={12}>
              <Form.Item name="salesperson_id" label="المندوبين">
                <Select
                  placeholder="ادخل اسم المندوب"
                  onChange={selected_salesPersons}
                  onClick={() => {
                    setReport((prevState) => ({
                      ...prevState,
                      areas_id: [],
                    }));
                  }}
                  value={
                    report.local_saletype === "مندوبين" &&
                    report.areas_id.length !== 0
                      ? form.getFieldValue("salesperson_id")
                      : null
                  }
                  disabled={
                    report.local_saletype !== "مندوبين" ||
                    report.areas_id.length !== 0
                      ? true
                      : false
                  }
                >
                  {salesPersons.map((s) => (
                    <Option key={s.id} value={s.id}>
                      {`${s.first_name} ${s.last_name}`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            {/* //----------------------------------المناطق  -------------------------------------- */}
            <Col span={12}>
              <Form.Item name="areas_id" label="المناطق">
                <Select
                  onClick={() => {
                    setReport((prevState) => ({
                      ...prevState,
                      salesperson_id: null,
                    }));
                  }}
                  value={
                    report.local_saletype == "مندوبين" &&
                    report.salesperson_id !== null
                      ? form.getFieldValue("areas_id")
                      : []
                  }
                  disabled={
                    report.local_saletype !== "مندوبين" ||
                    report.salesperson_id !== null
                      ? true
                      : false
                  }
                  mode="multiple"
                  placeholder=" المناطق"
                  optionLabelProp="label"
                  onChange={(value) => {
                    const selectedValues = Array.isArray(value)
                      ? value
                      : [value];
                    const ids_areas = selectedValues.map((value) => {
                      const option = optionAreas.find(
                        (option) => option.name === value
                      );
                      return option ? option.id : null;
                    });
                    setReport({ ...report, areas_id: ids_areas });
                  }}
                >
                  {optionAreas.map((option) => (
                    <Option
                      key={option.id}
                      value={option.name}
                      label={option.name}
                    >
                      {option.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="shop_id" label="المحل">
                <Select
                  placeholder="ادخل اسم المحل"
                  onChange={selected_shop}
                  disabled={report.local_saletype != "محلات"}
                >
                  {shops.map((s) => (
                    <Option key={s.id} value={s.id}>
                      {s.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col></Col>
          </Row>
          {/* //----------------------------------Button  -------------------------------------- */}
          <Row gutter={16} justify="end">
            <Button type="primary" htmlType="submit" style={{ width: "20%" }}>
              إرسال
            </Button>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default ShowDistractions;
