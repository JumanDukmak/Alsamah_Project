import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getsalesPersonsStart } from "../../redux/SalesPerson/salesPersonSlice";
import { Button, Form, Input, Col, Row, Select, Drawer, message, Space } from 'antd';
import { addAreaStart, resetData_Areas } from "../../redux/Area/areasSlice";
import AddSalesPerson from "../SalesPerson/AddSalesPerson";

const { Option } = Select;

export default function AddArea({ open, setOpen }) {
    const dispatch = useDispatch();
    const salesPersons = useSelector((state) => state.salesPersons);
    const areas = useSelector((state) => state.areas);

    useEffect(() => {
        dispatch(getsalesPersonsStart())
    }, [])

    const [area, setArea] = useState({
        name: "",
        governorate: "",
        salesperson_id: ""
    })

    const [api, contextHolder] = message.useMessage();
    useEffect(() => {
        if (areas.message != null) {
            api.success(areas.message);
            dispatch(resetData_Areas())
        }
        if (areas.error != null) {
            api.error(areas.error);
            dispatch(resetData_Areas())
        }
    }, [areas.message, areas.error]);

    const List_governorate = [
        {
            value: '1',
            label: 'دمشق',
        },
        {
            value: '2',
            label: 'ريف دمشق',
        },
        {
            value: '3',
            label: 'حمص',
        },
        {
            value: '4',
            label: 'حماة',
        },
        {
            value: '5',
            label: 'حلب',
        },
        {
            value: '6',
            label: 'ادلب',
        },
        {
            value: '7',
            label: 'اللاذقية',
        },
        {
            value: '8',
            label: 'طرطوس',
        },
        {
            value: '9',
            label: 'درعا',
        },
        {
            value: '10',
            label: 'سويدا',
        },
        {
            value: '11',
            label: 'قنيطرة',
        },
        {
            value: '12',
            label: 'دير الزور',
        },
        {
            value: '13',
            label: 'حسكة',
        },
        {
            value: '14',
            label: 'الرقة',
        },
    ];

    const selected_governorate = (selectedValue) => {

    const selectedGov = List_governorate.find(gov => gov.value === selectedValue);
        if (selectedGov) {
            setArea(prevState => ({ ...prevState, governorate: selectedGov.label }));
        }
    };

    const selected_salesperson_id = (selectedValue) => {
        setArea(prevState => ({ ...prevState, salesperson_id: selectedValue }));
    };

    const handleAddArea = () => {
        dispatch(addAreaStart(area))
        setOpen(false);
    }

    const [openModelSalesPers, setOpenModelSalesPers] = useState(false);

    const show_modal_AddSalesPerson = () => {
        setOpenModelSalesPers(true);
    };

    return (
        <>
            {contextHolder}
            <Drawer
                title="إضافة منطقة"
                width={720}
                onClose={() => { setOpen(false) }}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button type="primary"
                            size='middle'
                            style={{ fontWeight: '700' }}
                            onClick={handleAddArea}
                        > إضافة منطقة </Button>
                    </Space>
                }
            >
                <Form layout="vertical" hideRequiredMark
                    autoComplete="off"
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="اسم المنطقة"
                                rules={[
                                    {
                                        required: true,
                                        message: 'ادخل اسم المنطقة!',
                                    },
                                ]}
                            >
                                <Input placeholder="ادخل اسم المنطقة" onChange={(e) => setArea({ ...area, name: e.target.value })} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="governorate"
                                label="المحافظة"
                                rules={[
                                    {
                                        required: true,
                                        message: 'ادخل اسم المحافظة!',
                                    },
                                ]}
                            >
                                <Select placeholder="ادخل اسم المحافظة" onChange={selected_governorate}>
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
                                        message: 'ادخل اسم القطاع!',
                                    },
                                ]}
                            >
                                <Select placeholder="ادخل اسم القطاع" onChange={selected_salesperson_id}>
                                    {salesPersons.salesPersons.map((s) => (
                                        <Option key={s.id} value={s.id}>
                                            {`${s.first_name} ${s.last_name}`}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12} >
                            <Button type="link" style={{ color: '#02e079' }} onClick={show_modal_AddSalesPerson} >إضافة قطاع جديد</Button>
                            <AddSalesPerson open={openModelSalesPers}
                                setOpen={setOpenModelSalesPers} />
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    )
}

