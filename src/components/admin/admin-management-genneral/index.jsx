import React from "react";
import "antd/dist/antd.css";
import "./styles.scss";
import { Table, Input, Tooltip, Space, Button, Popover } from "antd";
import { useState } from "react";
import {
  SearchOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import AMGColumnStage from "./amg-columnStage";
import AMGColumnRegion from "./amg-columnRegion";
import AMGColumnIndustry from "./amg-columnIndustry";
import AMGColumnProvince from "./amg-columnProvince";
function AdminManagementGenneralComponent(props) {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder="Tìm kiếm ... "
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Hoàn tác
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {},
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  return (
    <div className="amgc__wrapper">
      <h1 className="amgc__title">Quản lý chung</h1>
      <div className="amgc__tableContainer">
        <div className="amgc__box1">
          <AMGColumnStage
            loading={props.loading}
            stage={props.stage}
            getColumnSearchProps={getColumnSearchProps}
          />
        </div>
        <div className="amgc__box2">
          <AMGColumnIndustry
            loading={props.loading}
            industry={props.industry}
            getColumnSearchProps={getColumnSearchProps}
          />
        </div>
        <div className="amgc__box3">
          <div className="disable__function">
            <span className="disable__span">Đã vô hiệu</span>
          </div>
          <AMGColumnProvince
            loading={props.loading}
            province={props.province}
            getColumnSearchProps={getColumnSearchProps}
          />
        </div>
        <div className="amgc__box4">
          <div className="disable__function">
            <span className="disable__span">Đã vô hiệu</span>
          </div>
          <AMGColumnRegion
            loading={props.loading}
            region={props.region}
            getColumnSearchProps={getColumnSearchProps}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminManagementGenneralComponent;
