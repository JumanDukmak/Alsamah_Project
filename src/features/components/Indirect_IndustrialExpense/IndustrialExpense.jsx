import { Button, Col, Row, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined,EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getIndustrialExpenseStart } from "../../redux/Indirect_IndustrialExpense/IndustrialExpenseSlice";
import moment from "moment";
import Add_IndustrialExpense from "./Add_IndustrialExpense";
const IndustrialExpense = () => {
  const dispatch = useDispatch();
  const industrialExpense = useSelector((state) => state.IndustrialExpense);
  useEffect(() => {
    dispatch(getIndustrialExpenseStart());
  }, []);
 
  
  const columns = [
    {
      title: "Name",
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
      render: (text) => moment(text).format('MM-DD-YYYY'),
    },
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },


    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <a>تعديل</a>
      ),
    },

  ];
 
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  return (
    <div className="conatiner_body">
    
      
         <Row  justify="space-between">
<Col>
<h2>المصاريف الصناعية غير المباشرة</h2>
</Col>
<Col>
<Button
          type="primary"
          onClick={showModal}
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
      <Table columns={columns} dataSource={ industrialExpense.IndustrialExpense.map((item) => ({
    ...item,
    key: item.id, // Assuming the "id" property is unique
  }))} pagination={false} />
    </div>
  );
};

export default IndustrialExpense;
