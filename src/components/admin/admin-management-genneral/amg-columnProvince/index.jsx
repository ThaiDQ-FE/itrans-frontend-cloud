import React from "react";
import "antd/dist/antd.css";
import "./styles.scss";
import { Table, Input, Tooltip, Button, Popover } from "antd";
import { useState } from "react";
import { DeleteOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
function AMGColumnProvince(props) {
  const [selectedRowKeysProvince, setSelectedRowKeysProvince] = useState([]);

  const onSelectChangeProvince = (selectedRowKeys) => {
    setSelectedRowKeysProvince(selectedRowKeys);
  };

  const rowSelectionProvince = {
    getCheckboxProps: (record) => {
      if (record.check === true) {
        return { disabled: true };
      }
    },
    selectedRowKeysProvince,
    onChange: onSelectChangeProvince,
  };
  const checkSelectedRowProvince = () => {
    if (selectedRowKeysProvince < 1) {
      return (
        <>
          <Tooltip title="Thêm" placement="top">
            <PlusOutlined style={{ cursor: "pointer" }} />
          </Tooltip>
        </>
      );
    } else {
      return (
        <>
          <Tooltip title="Thêm" placement="top">
            <PlusOutlined style={{ cursor: "pointer" }} />
          </Tooltip>
          <Tooltip placement="top" title="Xóa">
            <DeleteOutlined style={{ cursor: "pointer", marginLeft: 5 }} />
          </Tooltip>
        </>
      );
    }
  };
  const columnProvince = [
    {
      title: "Tỉnh/thành",
      dataIndex: "name",
      key: "name",
      ...props.getColumnSearchProps("name"),
    },
    {
      title: checkSelectedRowProvince(),
      key: "status",
      render: (text, value) => (
        <div style={{ textAlign: "center" }}>
          <Tooltip placement="top" title="Xóa">
            <DeleteOutlined style={{ cursor: "pointer" }} />
          </Tooltip>
        </div>
      ),
    },
  ];
  return (
    <Table
      bordered
      loading={props.loading}
      size="middle"
      rowSelection={{ ...rowSelectionProvince }}
      columns={columnProvince}
      key={columnProvince.key}
      dataSource={props.province}
      pagination={
        props.province.length < 10
          ? false
          : {
              pageSize: 10,
              defaultPageSize: 10,
              showSizeChanger: false,
            }
      }
    />
  );
}

export default AMGColumnProvince;
