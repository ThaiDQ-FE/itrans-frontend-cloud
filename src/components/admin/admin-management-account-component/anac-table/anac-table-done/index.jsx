import React from "react";
import "antd/dist/antd.css";
import "./styles.scss";
import { Table, Button, Tag, Tooltip } from "antd";
import Swal from "sweetalert2";
import Images from "../../../../../assets/images/images";
import { useDispatch } from "react-redux";
import {
  adminBlockAccoutn,
  adminOpenAccount,
} from "../../../../../store/action/admin.action";
import { withRouter } from "react-router-dom";
function ANACTableDone(props) {
  const dispatch = useDispatch();
  const handleBlockAccount = (value) => {
    Swal.fire({
      icon: "question",
      title: `${
        value.status === "ACTIVE"
          ? "Bạn muốn khóa tài khoản này?"
          : "Bạn muốn mở khóa tài khoản này?"
      }`,
      text: `${value.name}`,
      heightAuto: true,
      timerProgressBar: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#1890ff",
      cancelButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        if (value.status === "ACTIVE") {
          dispatch(adminBlockAccoutn(value.gmail, value.name, props.history));
        } else {
          dispatch(adminOpenAccount(value.gmail, value.name, props.history));
        }
      }
    });
  };
  const column = [
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (value) => (
        <div className="anac__logo" style={{ textAlign: "center" }}>
          {value === "ACTIVE" ? (
            <Tag className="anrc__active">Hoạt động</Tag>
          ) : (
            <Tag className="anrc__delete">Đã khóa</Tag>
          )}
        </div>
      ),
    },
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
    },
    {
      title: "Tên tài khoản",
      dataIndex: "name",
      key: "name",
      width: "200px",
      render: (value) => (
        <Tooltip title={value} placement="topRight">
          <div className="anac__name">{value}</div>
        </Tooltip>
      ),
    },
    {
      title: "Mail",
      dataIndex: "gmail",
      key: "gmail",
      width: "200px",
      render: (value) => (
        <Tooltip title={value} placement="topRight">
          <div className="anac__mail">{value}</div>
        </Tooltip>
      ),
    },
    {
      title: "Ngày đăng ký",
      dataIndex: "createAt",
      key: "createAt",
      render: (value) => (
        <p style={{ textAlign: "center", margin: 0 }}>{value}</p>
      ),
    },
    {
      title: "",
      dataIndex: "status",
      key: "status",
      render: (round, value) => (
        <div className="anac__button" style={{ textAlign: "center" }}>
          <Button
            type="primary"
            className={value.status === "ACTIVE" ? "anac__block" : "anac__open"}
            onClick={() => handleBlockAccount(value)}
          >
            {value.status === "ACTIVE" ? "Khóa" : "Mở"}
          </Button>
        </div>
      ),
    },
  ];
  return (
    <Table
      columns={column}
      dataSource={props.list}
      key={props.list.gmail}
      pagination={
        props.list.length < 6
          ? false
          : {
              defaultPageSize: 6,
            }
      }
    />
  );
}

export default withRouter(ANACTableDone);
