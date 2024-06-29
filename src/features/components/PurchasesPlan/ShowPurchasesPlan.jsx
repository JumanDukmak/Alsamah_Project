import { Button, Form, Select, message, Typography, DatePicker } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPurchasesPlanFetch, resetData_PurchasesPlan } from "../../redux/PurchasesPlan/purchasesPlanSlice";

const ShowPurchasesPlan = () => {
    const { Option } = Select;
    const { Title } = Typography;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const purchasesPlan = useSelector((state) => state.purchasesPlan);
console.log(purchasesPlan);

    const [purchasesPlane, setPurchasesPlan] = useState({
        year: "",
        category: null,
    });

    const [messageApi, contextHolder] = message.useMessage();
    const error = () => {
        messageApi.open({
            type: 'error',
            content: purchasesPlan.error,
        });
    };

    const List_category = [
        {
            value: '1',
            label: 'خيوط',
        },
        {
            value: '2',
            label: 'أصبغة',
        },
        {
            value: '3',
            label: 'مواد تعبئة',
        },
    ];

    const selected_category = (selectedValue) => {
        const selectedCategory = List_category.find(cate => cate.value === selectedValue);
        if (selectedCategory) {
            setPurchasesPlan(purchasesPlane => ({ ...purchasesPlane, category: selectedCategory.label }));
        }
    };

    const onFinish = (e) => {
        let data = {
            year: purchasesPlane.year,
            category: purchasesPlane.category,
        };
        dispatch(getPurchasesPlanFetch(data));
        if(purchasesPlan.error === null) {
            navigate("/PurchasesPlan",{ state: { year: purchasesPlane.year  } });}
        else{
            error();
            resetData_PurchasesPlan();
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    
    return (
        <div
        className="conatiner_body"
        style={{ display: "flex", justifyContent: "center", alignItems: "center"}}
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
                استعراض خطة المشتريات
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
                    setPurchasesPlan({
                    ...purchasesPlane,
                    year: value.format("YYYY"),
                    });
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
                {List_category.map((cate) => (
                    <Option key={cate.value} value={cate.value}>
                        {cate.label}
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
    )
}

export default ShowPurchasesPlan