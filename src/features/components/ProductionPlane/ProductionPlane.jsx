import { useSelector } from "react-redux";
import { Table, Tabs } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ProductionPlane = () => {
  const productionPlane = useSelector((state) => state.productionPlane);
  const location = useLocation();
  const { year } = location.state;
  
  const months = [
    "كانون الثاني",
    "شباط",
    "آذار",
    "نيسان",
    "أيار",
    "حزيران",
    "تموز",
    "آب",
    "أيلول",
    "تشرين الأول",
    "تشرين الثاني",
    "كانون الأول",
  ];

  const getMonthName = (monthNumber) => {
    return months[monthNumber - 1];
  };

  const columns = [
    {
      title: "الشهر",
      dataIndex: "month",
      key: "month",
      render: (text) => getMonthName(text),
    },

    {
      title: "المنتج ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "المخزون الفعلي",
      dataIndex: "actual_inventory",
      key: "actual_inventory",
      render: (text) => {
        const value = parseFloat(text); // Convert text to a number
        let color = "";
        let arrowIcon = null;

        if (value > 0) {
          color = "green";
          arrowIcon = <ArrowUpOutlined />;
        } else if (value < 0 || value == 0) {
          color = "red";
          arrowIcon = <ArrowDownOutlined />;
        }
        return (
          <span style={{ color }}>
            {arrowIcon} {text}
          </span>
        );
      },
    },

    {
      title: "المخزون المتوقع",
      dataIndex: "expected_inventory",
      key: "expected_inventory",
    },

    {
      title: "  صافي المبيعات",
      dataIndex: "total_month_sales",
      key: "total_month_sales",
    },

    {
      title: "إنتاجية الآلات",
      dataIndex: "machinery_productivity",
      key: "machinery_productivity",
    },
    {
      title: "عدد ساعات العمل المطلوبة",
      dataIndex: "working_hours_required",
      key: "working_hours_required",
    },

    {
      title: "عدد العمال المطلوبين",
      dataIndex: "calculateNumberOfWorkersRequired",
      key: "calculateNumberOfWorkersRequired",
    },
  ];

  const column2 = [
    {
      title: "الشهر",
      dataIndex: "month",
      key: "month",
      render: (text) => getMonthName(text),
    },

    {
      title: " إجمالي المخزون الفعلي",
      dataIndex: "total_actual_inventory",
      key: "total_actual_inventory",
      render: (text) => {
        const value = parseFloat(text); // Convert text to a number
        let color = "";
        let arrowIcon = null;

        if (value > 0) {
          color = "green";
          arrowIcon = <ArrowUpOutlined />;
        } else if (value < 0 || value == 0) {
          color = "red";
          arrowIcon = <ArrowDownOutlined />;
        }
        return (
          <span style={{ color }}>
            {arrowIcon} {text}
          </span>
        );
      },
    },

    {
      title: "إجمالي المخزون المتوقع",
      dataIndex: "total_expected_inventory",
      key: "total_expected_inventory",
    },

    {
      title: "  صافي المبيعات",
      dataIndex: "total_month_sales",
      key: "total_month_sales",
    },

    {
      title: "إجمالي عدد ساعات العمل المطلوبة",
      dataIndex: "total_working_hours_required",
      key: "total_working_hours_required",
    },

    {
      title: "إجمالي عدد العمال المطلوبين",
      dataIndex: "total_number_of_workers_required",
      key: "total_number_of_workers_required",
    },
  ];

  const items = [
    {
      key: "1",
      label: `الخطة الإنتاجية لكل منتج لعام ${year}`,
      children: (
        <Table
          rowKey="id"
          bordered
          columns={columns}
          dataSource={productionPlane.products}
    
          pagination={{ pageSize: 12, showSizeChanger: false }}
        />
      ),
    },
    {
      key: "2",
      label: `الخطة الإنتاجية الإجمالية لعام  ${year}`,
      children: (
        <Table
          rowKey="id"
          bordered
          columns={column2}
          dataSource={productionPlane.total}
          pagination={{ pageSize: 12, showSizeChanger: false }}
        />
      ),
    },
  ];

  return (
    <div className="conatiner_body">
      <Tabs type="card" size="large" items={items} />
    </div>
  );
};

export default ProductionPlane;
