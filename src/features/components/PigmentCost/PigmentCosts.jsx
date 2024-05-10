import { Button, Col, Row, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
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
      title: "تاريخ التعديل",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (text) => moment(text).format("MM-DD-YYYY"),
    },
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              // console.log(`the id is ${record.id}`);
              setSelectedItemId(record.id);
              setOpen1(true);
            }}
          >
            تعديل
          </Button>
        </>
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

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
        />
      )}
    </div>
  );
};

export default PigmentCosts;
