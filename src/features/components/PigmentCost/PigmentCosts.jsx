import { Button, Col, Row, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getpigmentCostsStart } from "../../redux/PigmentCosts/PigmentCostsSlice";
import Add_PigmentCosts from "./AddPigmentCosts";
import Update_PigmentCosts from "./Update_PigmentCosts";

const PigmentCosts = () => {
  const dispatch = useDispatch();
  const [open1, setOpen1] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const pigmentCosts = useSelector((state) => state.pigmentCosts);

  useEffect(() => {
    dispatch(getpigmentCostsStart());
  }, []);

  const columns = [
    {
      title: "العنوان",
      dataIndex: "measure",
      key: "measure",
    },
    {
      title: "النسبة",
      dataIndex: "value",
      key: "value",
      render: (text) => `${text}%`,
    },
    {
      title: "العملية",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="large">
          <Button
            type="link"
            onClick={() => {
              setSelectedItemId(record.id);
              setOpen1(true);
            }}
          >
            تعديل
          </Button>
            <a style={{color: 'red'}}>حذف</a>
          </Space>
        </>
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const [old_items, setOldItems] = useState([]);
  useEffect(() => {
      if (pigmentCosts) {
          const newList = pigmentCosts.pigmentCosts.map((item) => ({
              id: item.id,
              measure: item.measure,
              value: item.value,
          }));
          setOldItems(newList);
      }
  }, [pigmentCosts]);

  return (
    <div className="conatiner_body">
      <Row justify="space-between">
        <Col>
          <h2>تكاليف الصباغ</h2>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={showModal}
            style={{ fontWeight: "700" }}
            icon={<PlusOutlined />}
          >
            إضافة تكاليف صباغية
          </Button>
          <Add_PigmentCosts
            open={open}
            onClose={() => {
              setOpen(false);
            }}
          />
        </Col>
      </Row>

      <div style={{ height: "20px" }} />
      <Table
        rowKey="id"
        bordered
        pagination={false}
        columns={columns}
        dataSource={pigmentCosts.pigmentCosts}
      />

      {selectedItemId && (
        <Update_PigmentCosts
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

export default PigmentCosts;
