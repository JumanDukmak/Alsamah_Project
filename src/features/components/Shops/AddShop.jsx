import { useEffect, useState } from 'react';
import { Form, Input, Modal, Select, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addShopStart, resetData_Shops } from '../../redux/Shops/shopsSlice';

export default function AddShop({ open, setOpen }) {
    const dispatch = useDispatch();
    const shops = useSelector((state) => state.shops)
    const [shop, setShop] = useState({
        name: "",
        governorate: ""
    })

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
        const selectedShop = List_governorate.find(gov => gov.value === selectedValue);
        if (selectedShop) {
            setShop(prevState => ({ ...prevState, governorate: selectedShop.label }));
        }
    };

    const [api, contextHolder] = message.useMessage();
    useEffect(() => {
        if (shops.message != null) {
            api.success(shops.message);
            dispatch(resetData_Shops())
        }
        if (shops.error != null) {
            api.error(shops.error);
            dispatch(resetData_Shops())
        }
    }, [shops.message, shops.error]);

    const handleAddShop = () => {
        dispatch(addShopStart(shop));
        setOpen(false);
    }

    return (
        <>
            {contextHolder}
            <Modal
                open={open}
                title='إضافة محل'
                onOk={handleAddShop}
                okText='إضافة محل'
                cancelText='إلغاء'
                onCancel={() => { setOpen(false) }}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <CancelBtn />
                        <OkBtn />
                    </>
                )}
            >
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                    hideRequiredMark
                >
                    <Form.Item
                        label="اسم محل"
                        name="اسم محل"
                        rules={[
                            {
                                required: true,
                                message: 'ادخل اسم المحل !',
                            },
                        ]}
                    >
                        <Input onChange={(e) => setShop({ ...shop, name: e.target.value })} />
                    </Form.Item>
                    <Form.Item
                        name="المحافظة"
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
                </Form>
            </Modal>
        </>
    )
}