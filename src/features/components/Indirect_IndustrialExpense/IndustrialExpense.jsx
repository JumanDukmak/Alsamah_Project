import { Button, Col, Row, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getIndustrialExpenseStart } from "../../redux/Indirect_IndustrialExpense/IndustrialExpenseSlice";
import moment from "moment";
import Add_IndustrialExpense from "./Add_IndustrialExpense";
import Update_IndustrialExpense from "./Update_IndustrialExpense";
const IndustrialExpense = () => {
  const dispatch = useDispatch();
  const industrialExpense = useSelector((state) => state.IndustrialExpense);
  const [open1, setOpen1] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getIndustrialExpenseStart());
  }, []);

  const [old_items, setOldItems] = useState([]);
    useEffect(() => {
        if (industrialExpense) {
            const newList = industrialExpense.IndustrialExpense.map((item) => ({
                id: item.id,
                name: item.name,
                monthlyD: item.monthlyD,
            }));
            setOldItems(newList);
        }
    }, [industrialExpense]);

  const columns = [
    {
      title: "العنوان",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "الكلفة الشهرية",
      dataIndex: "monthlyD",
      key: "monthlyD",
      render: (text) => `${text}$`,
    },
    {
      title: "العملية",
      key: "action",
      render: (r, record) =>
      <>
        <Space size="large">
          <Button type="link" onClick={() => {
            setSelectedItemId(record.id);
            setOpen1(true);
          }}>
            تعديل
          </Button>
          <a style={{color: 'red'}}>حذف</a>
        </Space>
      </>,
    },
  ];
  

  return (
    <div className="conatiner_body">
      <Row justify="space-between">
        <Col>
          <h2>المصاريف الصناعية غير المباشرة</h2>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={() => {
    setOpen(true);
  }}
            style={{ fontWeight: "700" }}
            icon={<PlusOutlined />}
          >
            إضافة مصاريف صناعية
          </Button>

          <Add_IndustrialExpense
            open={open}
            onClose={() => {
              setOpen(false);
            }}
          />
        </Col>
      </Row>

      <div style={{ height: "20px" }} />
      <Table 
            rowKey='id'
            bordered
            columns={columns} 
            dataSource={industrialExpense.IndustrialExpense}
            pagination={false}
            />
            {selectedItemId && (
              <Update_IndustrialExpense
              id={selectedItemId}
              open={open1}
              onClose={() => {
                setOpen1(false);
              }}
              old_items={old_items}
        />
      )}
    </div>
  );
};

export default IndustrialExpense;
