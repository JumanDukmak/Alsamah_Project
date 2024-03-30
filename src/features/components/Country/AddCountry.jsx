import { useEffect, useState } from 'react';
import { Form, Input, Modal, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addCountryStart, resetData_Country } from '../../redux/Country/countriesSlice';

export default function AddCountry({ open, setOpen }) {
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries)
    const [country, setCountry] = useState({
        name: "",
    })

    const [api, contextHolder] = message.useMessage();
    useEffect(() => {
        if (countries.message != null) {
            api.success(countries.message);
            dispatch(resetData_Country())
        }
        if (countries.error != null) {
            api.error(countries.error);
            dispatch(resetData_Country())
        }
    }, [countries.message, countries.error]);

    const handleAddCountry = () => {
        dispatch(addCountryStart(country));
        setOpen(false);
    }

    return (
        <>
            {contextHolder}
            <Modal
                open={open}
                title='إضافة مدينة'
                okText='إضافة مدينة'
                cancelText='إلغاء'
                onOk={handleAddCountry}
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
                        label="اسم المدينة"
                        name="اسم المدينة"
                        rules={[
                            {
                                required: true,
                                message: 'ادخل اسم المدينة !',
                            },
                        ]}
                    >
                        <Input onChange={(e) => setCountry({ ...country, name: e.target.value })} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}