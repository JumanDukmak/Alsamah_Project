import { useSelector } from "react-redux";
import { Table, Tabs } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PurchasesPlan = () => {
    const purchasesPlan = useSelector((state) => state.purchasesPlan);
    const location = useLocation();
    const { year } = location.state;
    console.log("from plan: ", purchasesPlan);
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

    const columns = [
        {
            title: "الشهر",
            dataIndex: "month",
            key: "month",
            render: (text) => getMonthName(text),
        },
        {
            title: "رمز المادة ",
            dataIndex: "material_number",
            key: "material_number",
        },
        {
            title: "المادة ",
            dataIndex: "material_name",
            key: "material_name",
        },
        {
            title: "المخزون",
            dataIndex: "inventory",
            key: "inventory",
            // render: (text) => {
            //     const value = parseFloat(text); // Convert text to a number
            //     let color = "";
            //     let arrowIcon = null;
        
            //     if (value > 0) {
            //     color = "green";
            //     arrowIcon = <ArrowUpOutlined />;
            //     } else if (value < 0 || value == 0) {
            //     color = "red";
            //     arrowIcon = <ArrowDownOutlined />;
            //     }
            //     return (
            //     <span style={{ color }}>
            //         {arrowIcon} {text}
            //     </span>
            //     );
            // },
        },
        {
            title: "كلفة المخزون",
            dataIndex: "inventory_cost",
            key: "inventory_cost",
        },
        {
            title: "البضاعة في الطريق",
            dataIndex: "materialOnShipping",
            key: "materialOnShipping",
        },
        {
            title: "كلفة البضاعة في الطريق",
            dataIndex: "materialOnShipping_cost",
            key: "materialOnShipping_cost",
        },
        {
            title: "الاستهلاك المعياري",
            dataIndex: "standard_consumption",
            key: "standard_consumption",
        },
        {
            title: "المشتريات",
            dataIndex: "purchases",
            key: "purchases",
        },
        {
            title: "قيمة المشتريات",
            dataIndex: "purchasesValue",
            key: "purchasesValue",
        },
        {
            title: "المدفوعات",
            dataIndex: "payments",
            key: "payments",
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
            title: "إجمالي كلفة التخزين",
            dataIndex: "total_inventory_cost",
            key: "total_inventory_cost",
        },
        {
            title: "إجمالي كلفة البضاعة في الطريق",
            dataIndex: "total_materialOnShipping_cost",
            key: "total_materialOnShipping_cost",
        },
        {
            title: "إجمالي الاستهلاك المعياري",
            dataIndex: "total_standard_consumption",
            key: "total_standard_consumption",
        },
        {
            title: "إجمالي المشتريات",
            dataIndex: "total_purchases",
            key: "total_purchases",
        },
        {
            title: "إجمالي المدفوعات",
            dataIndex: "total_payments",
            key: "total_payments",
        },
    ];
    
    const items = [
        {
            key: "1",
            label: `خطة المشتريات لكل مادة لعام ${year}`,
            children: (
                <Table
                rowKey="id"
                bordered
                columns={columns}
                dataSource={purchasesPlan.materials}
                pagination={{ pageSize: 12, showSizeChanger: false }}
                scroll={{
                    x: 1400
                }}
                />
            ),
        },
        {
            key: "2",
            label: `خطة المشتريات الإجمالية لعام  ${year}`,
            children: (
                <Table
                rowKey="id"
                bordered
                columns={column2}
                dataSource={purchasesPlan.total}
                pagination={{ pageSize: 12, showSizeChanger: false }}
                />
            ),
        },
    ];

    const getMonthName = (monthNumber) => {
        return months[monthNumber - 1];
    };

    return (
        <div className="conatiner_body">
            <Tabs type="card" size="large" items={items} />
        </div>
    )
}

export default PurchasesPlan
