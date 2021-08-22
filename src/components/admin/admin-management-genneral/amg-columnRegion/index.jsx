import React from "react";
import "antd/dist/antd.css";
import "./styles.scss";
import { Table, Input, Tooltip, Button, Popover } from "antd";
import { useState } from "react";
import { DeleteOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
function AMGColumnRegion(props) {
  const [selectedRowKeysRegion, setSelectedRowKeysRegion] = useState([]);
  const onSelectChangeRegion = (selectedRowKeys) => {
    setSelectedRowKeysRegion(selectedRowKeys);
  };
  const rowSelectionRegion = {
    getCheckboxProps: (record) => {
      if (record.check === true) {
        return { disabled: true };
      }
    },
    selectedRowKeysRegion,
    onChange: onSelectChangeRegion,
  };
  const columnRegion = [
    {
      title: "Khu vưc",
      dataIndex: "name",
      key: "name",
      ...props.getColumnSearchProps("name"),
      render: (value) => (
        <div className="amgcRegion__name">
          <Tooltip title={value}>
            <p>{value}</p>
          </Tooltip>
        </div>
      ),
    },
    {
      title: "",
      key: "status",
      render: (text, value) => (
        <Tooltip placement="top" title="Xóa">
          <DeleteOutlined style={{ cursor: "pointer" }} />
        </Tooltip>
      ),
    },
  ];
  return (
    <Table
      className="table__disable"
      bordered
      loading={props.loading}
      size="middle"
      rowSelection={{ ...rowSelectionRegion }}
      columns={columnRegion}
      key={columnRegion.key}
      dataSource={props.region}
      pagination={
        props.region.length < 4
          ? false
          : {
              pageSize: 4,
              defaultPageSize: 4,
              showSizeChanger: false,
            }
      }
    />
  );
}

export default AMGColumnRegion;
