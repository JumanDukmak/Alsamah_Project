import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, List, Modal, Row, Space, Table, Tabs } from "antd";
import { getProductCardFetch } from "../../redux/products/productSlice";
import { useLocation } from "react-router-dom";
import UpdateMaterialProduct from "../InitialMaterialsProduct/UpdateMaterialsProduct";
import RemoveDirectWorks from "../DirectWork/RemoveDirectWorks";

const ShowProduct = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const product = useSelector((state) => state.products.product);
    const id = location.state;

    useEffect(() => {
        dispatch(getProductCardFetch(id));
    }, []);

    const [directWorks, setDirectWorks] = useState([]);
    const [materialsProduct, setmaterialsProduct] = useState([]);
    const [old_items, setOldItems] = useState([]);
    useEffect(() => {
        if (product) {
            setDirectWorks(product.direct_costPerDozen);
            setmaterialsProduct(product.InitialMaterials);
            const newList = product.InitialMaterials.map((item) => ({
                initial_material_id: item.id,
                quantity: item.quantity
            }));
            setOldItems(newList);
        }
    }, [product]);

    const columns2 = [
        {
            title: "رقم فئة العمل",
            dataIndex: "working_number",
            key: "working_number",
            width: "225px"
        },
        {
            title: "فئة العمل",
            dataIndex: "work_category",
            key: "work_category"
        },
        {
            title: "الدخل السنوي",
            dataIndex: "total_cost",
            key: "total_cost"
        },
        {
            title: "كلفة الدزينة",
            dataIndex: "cost_per_dozen",
            key: "cost_per_dozen"
        }
    ];

    const columns3 = [
        {
            title: "رقم نوع العمل",
            dataIndex: "working_number",
            key: "working_number",
            width: "230px"
        },
        {
            title: "نوع العمل",
            dataIndex: "working_type",
            key: "working_type"
        },
        {
            title: "تصنيف العمل",
            dataIndex: "working_category",
            key: "working_category"
        },
        {
            title: "كلفة الدزينة",
            dataIndex: "cost_per_dozen",
            key: "cost_per_dozen"
        }
    ];

    const mergeCells = (data, key) => {
        if (!Array.isArray(data)) {
            return [];
        }
        let lastValue = null;
        let spanCounter = 0;

        return data.map((item, index) => {
            if (item[key] !== lastValue) {
                lastValue = item[key];
                spanCounter = data.filter(d => d[key] === item[key]).length;
                return { ...item, rowSpan: spanCounter };
            } else {
                return { ...item, rowSpan: 0 };
            }
        });
    };

    const mergedData = mergeCells(product ? product.InitialMaterials : "", 'type');

    const columns4 = [
        {
            title: "نوع المادة",
            dataIndex: "type",
            key: "type",
            render: (text, record, index) => {
                const obj = {
                    children: text,
                    props: {},
                };
                obj.props.rowSpan = mergedData[index].rowSpan;
                return obj;
            },
        },
        {
            title: "اسم المادة",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "المجموع",
            dataIndex: "cost",
            key: "cost"
        }
    ];

    const data2 = [
        { title: "اسم المنتج", description: product ? product.name : "" },
        { title: "رمز المنتج", description: product ? product.code : "" },
        { title: "الوحدة", description: product ? product.unit : "" },
        { title: "الماركة", description: product ? product.brand.name : "" },
        { title: "الصنف", description: product ? product.category.name : "" },
        { title: "زمن الفردة الواحدة", description: product ? product.time_per_piece : ""},
        { title: "السعر", description: product ? product.price : "" },
        { title: "المصاريف الصناعية الغير مباشرة", description: product ? product.indirect_industrialSum : ""},
        { title: "إجمالي كلفة اليد العاملة", description: product ? product.total_WorkForce : ""}
    ];

    const items = [
        {
            key: "1",
            label: "معلومات المنتج",
            children: (
                <List
                    size="large"
                    bordered
                    dataSource={data2}
                    style={{
                        backgroundColor: "white",
                        marginTop: "-16px",
                        border: "1px solid #E6E8EA",
                        borderRadius: "3px"
                    }}
                    renderItem={(item) => (
                        <List.Item>
                            <span style={{ color: "#013243", fontWeight: "700" }}>
                                {item.title}
                            </span>{" "}
                            :<span style={{ fontWeight: "600" }}> {item.description}</span>
                        </List.Item>
                    )}
                />
            )
        },
        {
            key: "2",
            label: "الإدارة والآلات",
            children: (
                <Table
                    rowKey="id"
                    bordered
                    columns={columns2}
                    dataSource={product ? product.indirect_costPerDozen : ""}
                    pagination={false}
                    style={{ marginTop: "-16px" }}
                    summary={() => {
                        return (
                            <>
                                <Table.Summary.Row
                                    style={{ fontWeight: "600", backgroundColor: "#FAFAFA" }}
                                >
                                    <Table.Summary.Cell index={0} colSpan={1}>
                                        إجمالي كلفة الآلات واليد العاملة
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={1} colSpan={3}>
                                        {product ? product.indirect_costPerDozenSum : ""}
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                            </>
                        );
                    }}
                />
            )
        },
        {
            key: "3",
            label: "حبكة وفرق",
            children: (
                <Table
                    rowKey="id"
                    bordered
                    columns={columns3}
                    dataSource={product ? product.direct_costPerDozen : ""}
                    pagination={false}
                    style={{ marginTop: "-16px" }}
                    summary={() => {
                        return (
                            <>
                                <Table.Summary.Row
                                    style={{ fontWeight: "600", backgroundColor: "#FAFAFA" }}
                                >
                                    <Table.Summary.Cell index={0} colSpan={1}>
                                        إجمالي كلفة قسم الفرق
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={1} colSpan={3}>
                                        {product ? product.faraqTypeSum : ""}
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                                <Table.Summary.Row
                                    style={{ fontWeight: "600", backgroundColor: "#FAFAFA" }}
                                >
                                    <Table.Summary.Cell index={0} colSpan={1}>
                                        إجمالي كلفة قسم الحبكة والفرق
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={1} colSpan={3}>
                                        {product ? product.direct_costPerDozenSum : ""}
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                            </>
                        );
                    }}
                />
            )
        },
        {
            key: "4",
            label: "المواد الأولية",
            children: (
                <Table
                    rowKey="id"
                    bordered
                    columns={columns4}
                    dataSource={product ? product.InitialMaterials : ""}
                    pagination={false}
                    style={{ marginTop: "-16px" }}
                    summary={() => {
                        return (
                            <>
                                <Table.Summary.Row
                                    style={{ fontWeight: "600", backgroundColor: "#FAFAFA" }}
                                >
                                    <Table.Summary.Cell index={0} colSpan={1}>
                                        مجموع تكلفة الخيط
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={1} colSpan={3}>
                                        {product ? product.sum_of_thread_cost : ""}
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>

                                <Table.Summary.Row
                                    style={{ fontWeight: "600", backgroundColor: "#FAFAFA" }}
                                >
                                    <Table.Summary.Cell index={0} colSpan={1}>
                                        مجموع تكلفة الصباغ
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={1} colSpan={3}>
                                        {product ? product.sum_of_colo_cost : ""}
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>

                                <Table.Summary.Row
                                    style={{ fontWeight: "600", backgroundColor: "#FAFAFA" }}
                                >
                                    <Table.Summary.Cell index={0} colSpan={1}>
                                        انتاجية الآلة باليوم
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={1} colSpan={3}>
                                        {product ? product.machine_productivity_per_day : ""}
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>

                                <Table.Summary.Row
                                    style={{ fontWeight: "600", backgroundColor: "#FAFAFA" }}
                                >
                                    <Table.Summary.Cell index={0} colSpan={1}>
                                        التكلفة الكلية
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={1} colSpan={3}>
                                        {product ? product.total_cost : ""}
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>

                                <Table.Summary.Row
                                    style={{ fontWeight: "600", backgroundColor: "#FAFAFA" }}
                                >
                                    <Table.Summary.Cell index={0} colSpan={1}>
                                        التكلفة الكلية بعد الهدر
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={1} colSpan={3}>
                                        {product ? product.total_cost_after_wastage : ""}
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>

                                <Table.Summary.Row
                                    style={{ fontWeight: "600", backgroundColor: "#FAFAFA" }}
                                >
                                    <Table.Summary.Cell index={0} colSpan={1}>
                                        صافي الانتاج
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={1} colSpan={3}>
                                        {product ? product.net_production : ""}
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                            </>
                        );
                    }}
                />
            )
        }
    ];
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);

    const [open2, setOpen2] = useState(false);
    const showModal = () => {
        setOpen2(true);
    };
    const handleOk = () => {
        setOpen2(false);
    };
    const handleCancel = () => {
        setOpen2(false);
    };

    return (
        <div className="conatiner_body">
            <Row justify="end">
                <Button type="primary" onClick={showModal}>
                    تعديل مكونات المنتج
                </Button>

                <Modal
                    open={open2}
                    title="تعديل مكونات المنتج "
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={(_, { CancelBtn }) => (
                        <>
                            <CancelBtn />
                        </>
                    )}
                >
                    <Space
                        size="middle"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%"
                        }}
                    >
                        <Button
                            type="primary"
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            تعديل المواد الأولية{" "}
                        </Button>
                        <UpdateMaterialProduct
                            id={id}
                            old_items={old_items}
                            open={open}
                            onClose={() => {
                                setOpen(false);
                            }}
                        />

                        <Button
                            type="primary"
                            onClick={() => {
                                setOpen1(true);
                            }}
                        >
                            حذف القوى العاملة{" "}
                        </Button>
                        <RemoveDirectWorks
                            all_directWorks={directWorks}
                            id={id}
                            open={open1}
                            onClose={() => {
                                setOpen1(false);
                            }}
                        />
                    </Space>
                </Modal>
            </Row>

            <Tabs type="card" size="large" items={items} />
        </div>
    );
};

export default ShowProduct;
