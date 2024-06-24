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
      title: "تاريخ التعديل",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (text) => moment(text).format("MM-DD-YYYY"),
    },
    {
      title: "العملية",
      key: "action",
      render: (r, record) =><>
      
      <Button type="link" onClick={() => {
          // console.log(`the id is ${record.id}`);
          setSelectedItemId(record.id);
          setOpen1(true);
        }}>
          تعديل
        </Button>

     
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
            dataSource={industrialExpense.IndustrialExpense
 
            }
            pagination={false}
            />
            {selectedItemId && (
        <Update_IndustrialExpense
        id={selectedItemId}
        open={open1}
        onClose={() => {
          setOpen1(false);
        }}
          
        />
      )}
     
     
    </div>
  );
};

export default IndustrialExpense;
