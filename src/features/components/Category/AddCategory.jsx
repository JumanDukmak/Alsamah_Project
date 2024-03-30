import { useEffect, useState } from 'react';
import { Form, Input, Modal, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addCategoryStart, resetData_category } from '../../redux/Category/categoriesSlice';

export default function AddCategory({ open, setOpen }) {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories)
    const [category, setCategory] = useState({
        name: "",
    })

    const [api, contextHolder] = message.useMessage();
    useEffect(() => {
        if (categories.message != null) {
            api.success(categories.message);
            dispatch(resetData_category())
        }
        if (categories.error != null) {
            api.error(categories.error);
            dispatch(resetData_category())
        }
    }, [categories.message, categories.error]);

    const handleAddCategory = () => {
        dispatch(addCategoryStart(category));
        setOpen(false);
    }

    return (
        <>
            {contextHolder}
            <Modal
                open={open}
                title='إضافة صنف'
                okText='إضافة صنف'
                cancelText='إلغاء'
                onOk={handleAddCategory}
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
                        label="اسم الصنف"
                        name="اسم الصنف"
                        rules={[
                            {
                                required: true,
                                message: 'ادخل اسم الصنف !',
                            },
                        ]}
                    >
                        <Input onChange={(e) => setCategory({ ...category, name: e.target.value })} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}