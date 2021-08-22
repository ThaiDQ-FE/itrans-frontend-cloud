import React, { useState } from "react";
import { Button, Card, Pagination, Tooltip } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import {
  checkEmailUser,
  checkRoleUser,
  localStorages,
} from "../../../assets/helper/helper";
import Images from "../../../assets/images/images";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { putUnfollow } from "../../../store/action/interest.action";
import { withRouter } from "react-router-dom";
function AccountManagementFollow(props) {
  const dispatch = useDispatch();
  const [length, setLength] = useState({
    minValue: 0,
    maxValue: 8,
  });
  const handleChange = (value) => {
    if (value <= 1) {
      setLength({
        minValue: 0,
        maxValue: 8,
      });
    } else {
      setLength({
        minValue: length.maxValue,
        maxValue: value * 8,
      });
    }
  };
  const handleClickUnFollow = (gmail, name) => {
    const object = {
      follow: checkEmailUser(),
      followed: gmail,
    };
    if (checkRoleUser() === "INVESTOR") {
      Swal.fire({
        icon: "question",
        title: "Bạn muốn hủy theo dõi tổ chức " + name,
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
          dispatch(putUnfollow(object, null, props.history));
        }
      });
    } else {
      Swal.fire({
        icon: "question",
        title: "Bạn muốn hủy theo dõi nhà đầu tư " + name,
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
          dispatch(putUnfollow(object, null, props.history));
        }
      });
    }
  };
  const handleClickFollow = () => {
    if (checkRoleUser() === "INVESTOR") {
      props.history.push("/to-chuc");
    } else {
      props.history.push("/nha-dau-tu");
    }
  };
  const handleClickToDetail = (gmail, id) => {
    if (checkRoleUser() === "INVESTOR") {
      localStorages("gmailOrganizationToDetail", gmail);
      localStorages("idOrganizationToDetail", id);
      setTimeout(() => {
        props.history.push("/to-chuc/chi-tiet");
      }, 500);
    } else {
      localStorages("gmailInvestorToDetail", gmail);
      localStorages("idInvestorToDetail", id);
      setTimeout(() => {
        props.history.push("/nha-dau-tu/chi-tiet");
      }, 500);
    }
  };
  return (
    <div
      className={`amFollow__default${props.list.length > 0 ? "" : " noFollow"}`}
    >
      <div className="amFollow__container">
        <div
          className={`amFollow__listFollow${
            props.list.length > 0 ? "" : " amNoFollow"
          }`}
        >
          {props.list && props.list.length > 0 ? (
            props.list
              .slice(length.minValue, length.maxValue)
              .map((value, index) => (
                <Card key={index} className="amFollow__itemOrg">
                  {console.log(value)}
                  <img
                    alt="logo"
                    src={value.logo === "" ? Images.NO_IMAGE : value.logo}
                  />
                  <div
                    className="amFollow__name"
                    onClick={
                      checkRoleUser() === "INVESTOR"
                        ? () => {
                            handleClickToDetail(
                              value.gmailOrganization,
                              value.idOrganization
                            );
                          }
                        : () => {
                            handleClickToDetail(value.gmail, value.idInvestor);
                          }
                    }
                  >
                    <span>
                      {checkRoleUser() === "INVESTOR"
                        ? value.name
                        : value.nameInvestor}
                    </span>
                  </div>
                  {checkRoleUser() === "INVESTOR" ? (
                    <>
                      <div className="amFollow__stage">
                        <span>{value.stage}</span>
                      </div>
                      <div className="amFollow__industries">
                        <span>{value.industries + ""}</span>
                      </div>
                      <div className="amFollow__province">
                        <span>{value.province + ""}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="amFollow__header">
                        <span>{value.headquarter}</span>
                      </div>
                      <div className="amFollow__web">
                        <span>{value.linkWebsite}</span>
                      </div>
                    </>
                  )}
                  {checkRoleUser() === "INVESTOR" ? (
                    <Button
                      className="amFollow__button"
                      type="primary"
                      size="large"
                      onClick={() =>
                        handleClickUnFollow(value.gmailOrganization, value.name)
                      }
                    >
                      {value.status}
                    </Button>
                  ) : (
                    <Button
                      className="amFollow__button"
                      type="primary"
                      size="large"
                      onClick={() =>
                        handleClickUnFollow(value.gmail, value.nameInvestor)
                      }
                    >
                      {value.status}
                    </Button>
                  )}
                </Card>
              ))
          ) : (
            <div className="amFollow__noData">
              <p>
                Bạn chưa theo dõi{" "}
                {checkRoleUser() === "INVESTOR"
                  ? "tổ chức nào."
                  : "nhà đầu tư nào."}
              </p>
              <Button type="primary" size="large" onClick={handleClickFollow}>
                Theo dõi
              </Button>
            </div>
          )}
        </div>
        <div className="amFollow__paging">
          {props.list.length > 8 ? (
            <Pagination
              defaultCurrent={1}
              defaultPageSize={8}
              onChange={handleChange}
              total={props.list.length}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(AccountManagementFollow);
