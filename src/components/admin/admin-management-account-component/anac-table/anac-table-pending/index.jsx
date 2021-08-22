import React from "react";
import "antd/dist/antd.css";
import "./styles.scss";
import { Table, Button } from "antd";
import { withRouter } from "react-router-dom";
import { localStorages } from "../../../../../assets/helper/helper";
import Images from "../../../../../assets/images/images";
function ANACTablePending(props) {
  const handleClickDetail = (record) => {
    localStorages("adminDetailAccount", record);
    setTimeout(() => {
      props.history.push("/admin/quan-ly-tai-khoan/chi-tiet");
    }, 500);
  };
  const column = [
    {
      title: "Ảnh",
      dataIndex: "logo",
      key: "logo",
      render: (value) => (
        <div className="anac__logo" style={{ textAlign: "center" }}>
          <img src={value === "" ? Images.NO_IMAGE : value} alt="logo" />
        </div>
      ),
    },
    {
      title: "Loại hình",
      dataIndex: "role",
      key: "role",
      render: (value) => (
        <>{value === "ORGANIZATION" ? "Tổ chức" : "Nhà đầu tư"}</>
      ),
    },
    {
      title: "Tên tài khoản",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mail",
      dataIndex: "gmail",
      key: "gmail",
    },
    {
      title: "Ngày đăng ký",
      dataIndex: "createAt",
      key: "createAt",
      render: (value) => (
        <p style={{ margin: 0, textAlign: "center" }}>{value}</p>
      ),
    },
    {
      title: "",
      key: "action",
      render: (record) => (
        <div className="anac__button" style={{ textAlign: "center" }}>
          <Button
            type="primary"
            onClick={() => {
              handleClickDetail(record);
            }}
          >
            Chi tiết
          </Button>
        </div>
      ),
    },
  ];
  return (
    <Table
      loading={props.loading}
      columns={column}
      dataSource={props.listAccount}
      key={Math.random(9999)}
      pagination={
        props.listAccount.length < 6
          ? false
          : {
              defaultPageSize: 6,
            }
      }
    />
  );
}

export default withRouter(ANACTablePending);
