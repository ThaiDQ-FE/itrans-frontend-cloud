import React, { useEffect } from "react";
import "antd/dist/antd.css";
import "./styles.scss";
import { Table, Input, Tooltip, Popover, Button, Tag } from "antd";
import { useState } from "react";
import Images from "../../../assets/images/images";
import {
  SearchOutlined,
  DeleteOutlined,
  MoreOutlined,
} from "@ant-design/icons";
function AdminManagementRoundComponent(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const checkSelectedRow = () => {
    if (selectedRowKeys < 1) {
      return <></>;
    } else {
      return (
        <Tooltip placement="top" title="Xóa">
          <DeleteOutlined style={{ cursor: "pointer" }} />
        </Tooltip>
      );
    }
  };
  const content = (
    <div style={{ textAlign: "center" }}>
      <Button type="primary" className="amrc__chiTietButton">
        Chi tiết
      </Button>
      <Button type="primary" className="amrc__deleteButton">
        Xóa
      </Button>
    </div>
  );
  const renderTags = (value) => {
    if (value === "EXPIRATION") {
      return <Tag className="amrc__expiration">Hết hạn</Tag>;
    } else if (value === "ACTIVE") {
      return <Tag className="amrc__active">Hoạt động</Tag>;
    } else if (value === "DELETE") {
      return <Tag className="amrc__delete">Đã xóa</Tag>;
    } else if (value === "PENDING") {
      return <Tag className="amrc__pending">Đang chờ</Tag>;
    }
  };
  const column = [
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "100px",

      render: (value) => (
        <div style={{ textAlign: "center" }}>{renderTags(value)}</div>
      ),
    },
    {
      title: "Tổ chức",
      dataIndex: "organization",
      key: "organization",
      width: "150px",
      render: (value, round) => (
        <div className="amrc__tenToChuc">
          <img
            className="amrc__thumbnail"
            src={round.logo === "" ? Images.NO_IMAGE : round.logo}
            alt="logo"
          />
          <Tooltip placement="top" title={value}>
            <span className="amrc__valueTenToChuc">{value}</span>
          </Tooltip>
        </div>
      ),
    },
    {
      title: "Giai đoạn gọi vốn",
      dataIndex: "stage",
      width: "100px",
      key: "stage",
    },
    {
      title: "Số tiền kêu gọi (Tỷ VNĐ)",
      dataIndex: "fundingAmount",
      key: "fundingAmount",
      width: "115px",
      render: (value) => <p className="amrc__valueSTKG">{value}</p>,
    },
    {
      title: "Phần trăm cổ phần (%)",
      dataIndex: "shareRequirement",
      key: "shareRequirement",
      width: "110px",
      render: (value) => <p className="amrc__valuePTCP">{value}</p>,
    },
    {
      title: "Mô tả",
      dataIndex: "summary",
      key: "summary",
      width: "225px",

      render: (value) => (
        <Tooltip placement="top" title={value}>
          <p className="amrc__valueMoTa">{value}</p>
        </Tooltip>
      ),
    },

    {
      title: "Ngày gọi",
      dataIndex: "startDate",
      key: "startDate",
      render: (value) => (
        <Tooltip placement="top" title={value}>
          <p className="amrc__valueNgayGoi" style={{ textAlign: "center" }}>
            {value}
          </p>
        </Tooltip>
      ),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      render: (value) => (
        <Tooltip placement="top" title={value}>
          <p className="amrc__valueNgayKetThuc" style={{ textAlign: "center" }}>
            {value}
          </p>
        </Tooltip>
      ),
    },
    {
      title: checkSelectedRow(),
      key: "action",
      render: (text, record) => (
        <Popover
          content={content}
          title={null}
          trigger="click"
          placement="right"
        >
          <MoreOutlined style={{ cursor: "pointer" }} />
        </Popover>
      ),
    },
  ];

  return (
    <div className="amrc__wrapper">
      <div className="amrc__container">
        <h2 className="amrc__title">Quản lý vòng gọi vốn</h2>
        <Input
          className="amrc__search"
          size="large"
          placeholder="Tìm kiếm"
          prefix={<SearchOutlined />}
        />
      </div>
      <Table
        loading={props.loading}
        size="middle"
        rowSelection={rowSelection}
        columns={column}
        dataSource={props.listRound}
        key={props.listRound.idRound}
        pagination={
          props.listRound.length < 8
            ? false
            : {
                defaultPageSize: 8,
              }
        }
      />
    </div>
  );
}

export default AdminManagementRoundComponent;
