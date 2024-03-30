import { useEffect, useState } from 'react';
import { Form, Input, Modal, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addBrandStart, resetData_brand } from '../../redux/Brands/brandsSlice';

export default function AddBrand({ open, setOpen }) {
    const dispatch = useDispatch();
    const brands = useSelector((state) => state.brands)
    const [brand, setBrand] = useState({
        name: "",
    })

    const [api, contextHolder] = message.useMessage();
    useEffect(() => {
        if (brands.message != null) {
            api.success(brands.message);
            dispatch(resetData_brand())
        }
        if (brands.error != null) {
            api.error(brands.error);
            dispatch(resetData_brand())
        }
    }, [brands.message, brands.error]);

    const handleAddBrand = () => {
        dispatch(addBrandStart(brand));
        setOpen(false);
    }

    return (
        <>
            {contextHolder}
            <Modal
                open={open}
                title='إضافة ماركة'
                okText='إضافة ماركة'
                cancelText='إلغاء'
                onOk={handleAddBrand}
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
                        label="اسم الماركة"
                        name="اسم الماركة"
                        rules={[
                            {
                                required: true,
                                message: 'ادخل اسم الماركة !',
                            },
                        ]}
                    >
                        <Input onChange={(e) => setBrand({ ...brand, name: e.target.value })} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}