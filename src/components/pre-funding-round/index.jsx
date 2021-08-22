import React from "react";
import { Table, Input, Tooltip } from "antd";
import "./styles.scss";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";
import { convertNumber } from "../../assets/helper/helper";
function PreviousFundingRound() {
  const { listRoundPass } = useSelector((state) => state.round);
  const { listDeal } = useSelector((state) => state.deal);
  const { loading } = useSelector((state) => state.loading);
  const expandedRowRender = (record, index) => {
    const columns = [
      {
        title: "Tên nhà đầu tư",
        dataIndex: "investor",
        key: "investor",
        width: "150px",
        render: (value, round) => (
          <div className="round__tenDoanhNghiep">
            <div className="round__thumbnail">
              <img src={round.logo} alt="logo" />
            </div>
            <p className="round__pTenDoanhNghiep">{value}</p>
          </div>
        ),
      },

      {
        title: "Số tiền muốn đầu tư",
        dataIndex: "capitalInvestment",
        key: "capitalInvestment",
        width: "180px",
        render: (value) => (
          <div className="cfr__inputStkg">
            <Input
              className="cfr__stkg"
              addonAfter=",000,000 VNĐ"
              defaultValue={convertNumber(value)}
              readOnly
            />
          </div>
        ),
      },
      {
        title: "Phần trăm cổ phần",
        dataIndex: "shareRequirement",
        key: "shareRequirement",
        width: "160px",
        render: (value) => (
          <div className="cfr__inputPtcp">
            <Input
              className="cfr__ptcp"
              addonAfter="%"
              defaultValue={value}
              readOnly
            />
          </div>
        ),
      },
      {
        title: "Ngày đăng",
        dataIndex: "date",
        key: "date",
        width: "180px",
        render: (value) => (
          <div className="cfr__inputStartDate">
            <Input className="cfr__input" defaultValue={value} readOnly />
          </div>
        ),
      },
      {
        title: "Ghi chú",
        dataIndex: "description",
        key: "description",
        width: "200px",
        render: (value) => (
          <Tooltip placement="top" title={value}>
            <p className="prefr__des">{value}</p>
          </Tooltip>
        ),
      },
    ];
    const data = listDeal.filter(
      (deal) => deal.idRound === record.idRound && deal.status === "ACCEPT"
    );

    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey={(record) => record.idRound}
        bordered
        locale={{
          emptyText: <span>Không có dữ liệu</span>,
        }}
      />
    );
  };
  const columns = [
    {
      title: "Tên tổ chức",
      dataIndex: "organization",
      key: "organization",
      width: "150px",
      render: (value, round) => (
        <div className="round__tenDoanhNghiep">
          <div className="round__thumbnail">
            <img src={round.logo} alt="logo" />
          </div>
          <p className="round__pTenDoanhNghiep">{value}</p>
        </div>
      ),
    },
    {
      title: "Giai đoạn gọi vốn",
      dataIndex: "stage",
      key: "stage",
      width: "150px",
    },
    {
      title: "Số tiền kêu gọi",
      dataIndex: "fundingAmount",
      key: "fundingAmount",
      width: "160px",
      render: (value) => (
        <div className="cfr__inputStkg">
          <Input
            className="cfr__stkg"
            addonAfter=",000,000 VNĐ"
            defaultValue={value}
            readOnly
          />
        </div>
      ),
    },
    {
      title: "Phần trăm cổ phần",
      dataIndex: "shareRequirement",
      key: "shareRequirement",
      width: "175px",
      render: (value) => (
        <div className="cfr__inputPtcp">
          <Input
            className="cfr__ptcp"
            addonAfter="%"
            defaultValue={value}
            readOnly
          />
        </div>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (value) => (
        <Tooltip placement="top" title={value}>
          <p className="prefr__des">{value}</p>
        </Tooltip>
      ),
    },
    {
      title: "Ngày gọi",
      dataIndex: "startDate",
      key: "startDate",
      width: "115px",
      render: (value) => (
        <div className="cfr__inputStartDate">
          <Input className="cfr__input" defaultValue={value} readOnly />
        </div>
      ),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      width: "125px",
      render: (value) => (
        <div className="cfr__inputEndDate">
          <Input className="cfr__input" defaultValue={value} readOnly />
        </div>
      ),
    },
  ];
  return (
    <div className="pfr__wrapper">
      <h3 style={{ marginBottom: 20 }}>VÒNG GỌI VỐN TRƯỚC ĐÓ</h3>
      <div className="pfr__container">
        <Table
          loading={loading}
          className="components-table-demo-nested"
          columns={columns}
          expandable={{ expandedRowRender }}
          dataSource={listRoundPass}
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20"],
          }}
          rowKey={(round) => round.idRound}
          locale={{
            emptyText: <span>Không có dữ liệu</span>,
          }}
        />
      </div>
    </div>
  );
}
export default PreviousFundingRound;
