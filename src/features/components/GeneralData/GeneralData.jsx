import { Button, Col, Row, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getGeneralDataStart } from "../../redux/GeneralData/GeneralDataSlice";
import Add_GeneralData from "./Add_GeneralData";
import Update_GeneralData from "./Update_GeneralData";
const GeneralData = () => {
  const dispatch = useDispatch();
  const generalData = useSelector((state) => state.GeneralData);
  const [open1, setOpen1] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getGeneralDataStart());
  }, []);

  const [old_items, setOldItems] = useState([]);
  useEffect(() => {
      if (generalData) {
          const newList = generalData.GeneralData.map((item) => ({
              id: item.id,
              name: item.name,
              value: item.value,
          }));
          setOldItems(newList);
      }
  }, [generalData]);

  const columns = [
    {
      title: "العنوان",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "القيمة ",
      dataIndex: "value",
      key: "value",
      render: (text) => `${text}`,
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
          <h2>المعطيات العامة</h2>
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
            إضافة معطيات عامة
          </Button>

          <Add_GeneralData
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
            dataSource={generalData.GeneralData}
            pagination={false}
            />
            {selectedItemId && (
              <Update_GeneralData
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

export default GeneralData;
