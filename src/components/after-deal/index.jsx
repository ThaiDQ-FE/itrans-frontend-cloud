import React from "react";
import { Table, Input, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./styles.scss";
import "antd/dist/antd.css";
function AfferDeal() {
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const { listDealCancel } = useSelector((state) => state.deal);
  const [dataDeal, setDataDeal] = useState({
    soTienDauTu: "",
    phanTramCoPhan: "",
    moTa: "",
  });

  const expandedRowRender = (record, index) => {
    const columns = [
      {
        title: "Tên nhà đầu tư",
        dataIndex: "nameInvestor",
        key: "nameInvestor",
        render: (value, round) => (
          <>
            <img id="src" src={round.logoInvestor} alt="&nbsp;" />
            <span>{value}</span>
          </>
        ),
      },
      {
        title: "Số tiền muốn đầu tư",
        dataIndex: "capitalInvestment",
        key: "capitalInvestment",
      },
      {
        title: "Phần trăm cổ phần",
        dataIndex: "dealShareRequirement",
        key: "dealShareRequirement",
      },
      { title: "Ngày đăng", dataIndex: "createAt", key: "createAt" },
      {
        dataIndex: "dealDescription",
        key: "dealDescription",
        title: "Mô tả",
      },
    ];
    const data = listDealCancel.filter(
      (deal) => deal.idRound === record.idRound && deal.status !== "REJECT"
    );
    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="1"
        locale={{ emptyText: "Không có dữ liệu" }}
      />
    );
  };
  const columns = [
    {
      title: "Tên doanh nghiệp",
      dataIndex: "nameOrganization",
      key: "nameOrganization",
      render: (value, round) => (
        <>
          <img id="src" src={round.logoOrganization} alt="&nbsp;" />
          <span>{value}</span>
        </>
      ),
    },
    { title: "Giai đoạn gọi vốn", dataIndex: "stage", key: "stage" },
    {
      title: "Số tiền kiêu gọi",
      dataIndex: "fundingAmount",
      key: "fundingAmount",
    },
    {
      title: "Phần trăm cổ phần",
      dataIndex: "roundShareRequirement",
      key: "roundShareRequirement",
    },
    { title: "Mô tả", dataIndex: "roundDescription", key: "roundDescription" },
    { title: "Ngày gọi", dataIndex: "startDate", key: "startDate" },
    { title: "Ngày kết thúc", dataIndex: "endDate", key: "endDate" },
  ];
  return (
    <div className="cd__wrapper">
      <h4>Deal thất bại</h4>
      <div className="cd__container">
        <Table
          className="components-table-demo-nested"
          columns={columns}
          expandable={{ expandedRowRender }}
          dataSource={listDealCancel}
          rowKey="idRound"
          locale={{ emptyText: "Không có dữ liệu" }}
        />
      </div>
    </div>
  );
}
export default AfferDeal;
