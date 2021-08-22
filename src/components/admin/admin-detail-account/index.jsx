import React from "react";
import { Button, Spin, Tooltip } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import Images from "../../../assets/images/images";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStorage } from "../../../assets/helper/helper";
import { putAccountToConfirm } from "../../../store/action/user.action";
import { useHistory } from "react-router-dom";
import AdminDetailInfo from "./admin-detail-info";
function AdminDetailAccount(props) {
  const { loadingComponent, loading } = useSelector((state) => state.loading);
  const history = useHistory();
  const dispatch = useDispatch();
  const renderListMember = () => {
    if (props.team.length === 0) {
      const local = getLocalStorage("adminDetailAccount");
      if (local.role === "ORGANIZATION") {
        return (
          <div className="ada__noTeam">
            Tổ chức này chưa đăng tải thành viên chủ chốt
          </div>
        );
      } else {
        return (
          <div className="ada__noTeam">
            Nhà đầu tư này chưa đăng tải thành viên chủ chốt
          </div>
        );
      }
    } else {
      return props.team.map((item, index) => {
        if (item.linkCv === "") {
          return (
            <div className="ada__rightBoxNo" key={index}>
              <img
                className="ada__rightBoxImg"
                src={item.image === "" ? Images.NO_USER : item.image}
                alt="logo user"
              />
              <div className="ada__rigtName">
                <span>{item.name}</span>
              </div>
              <div className="ada__rightChucVu">
                <span>{item.position}</span>
              </div>
            </div>
          );
        } else {
          return (
            <a
              href={item.linkCv}
              target="_blank"
              rel="noreferrer"
              className="ada__rightLink"
              key={index}
            >
              <div className="ada__rightBox">
                <img
                  className="ada__rightBoxImg"
                  src={item.image === "" ? Images.NO_USER : item.image}
                  alt="logo user"
                />
                <div className="ada__rigtName">
                  <span>{item.name}</span>
                </div>
                <div className="ada__rightChucVu">
                  <span>{item.position}</span>
                </div>
              </div>
            </a>
          );
        }
      });
    }
  };

  const handleConfirmAccount = () => {
    Swal.fire({
      icon: "warning",
      title: "Bạn chắc chắn muốn duyệt tài khoản này ?",
      heightAuto: true,
      timerProgressBar: false,
      showConfirmButton: true,
      confirmButtonText: "Đồng ý",
      showCancelButton: true,
      cancelButtonText: "Hủy",
      cancelButtonColor: "red",
      confirmButtonColor: "#1890ff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(
          putAccountToConfirm(props.detail.email, history, props.detail)
        );
      }
    });
  };
  console.log(props);
  return (
    <div className="ada__wrapper">
      {loadingComponent === true || loading ? (
        <div className="ada__loadingWrapper">
          <Spin className="ada__loading" />
        </div>
      ) : (
        <></>
      )}

      <div className="ada__infoTop">
        <div className="ada__itLeft">
          <img
            className="ada__logo"
            src={props.detail.logo === "" ? Images.NO_IMAGE : props.detail.logo}
            alt="logo"
          />
        </div>
        <div className="ada__itRight">
          <div className="ada__name">{props.detail.name}</div>
          <div className="ada__yearMemGmail">
            <div className="ada__first">
              <div className="ada__year">
                <img
                  src={Images.CALENDAR}
                  alt="calendar"
                  className="ada__yearImg"
                />
                <div className="ada__yearSpan">
                  Năm thành lập: {props.detail.foundedYear}
                </div>
              </div>
              <div className="ada__member">
                <img
                  src={Images.EMPLOYEES}
                  alt="employees"
                  className="ada__memberImg"
                />
                <div className="ada__memberSpan">
                  {props.detail.numberOfEmp} thành viên
                </div>
              </div>
            </div>
            <div className="ada__second">
              <div className="ada__gmail">
                <img src={Images.GMAIL} alt="gmail" className="ada__gmailImg" />
                <div className="ada__gmailSpan">{props.detail.email}</div>
              </div>
              <div className="ada__website">
                <img
                  src={Images.WEBSITE}
                  alt="website"
                  className="ada__websiteImg"
                />
                <a href={props.detail.website} target="_blank" rel="noreferrer">
                  <div className="ada__websiteSpan">{props.detail.website}</div>
                </a>
              </div>
            </div>
            <div className="ada__third"></div>
          </div>
        </div>
      </div>
      <hr className="ada__hr" />
      <div className="ada__infoBottom">
        <AdminDetailInfo
          detail={props.detail}
          indus={props.indus}
          pro={props.pro}
          stage={props.stage}
          region={props.region}
          type={props.type}
        />
        <div
          className={`ada__ibRight${
            props.team.length === 0 ? " ada__ibNoTeam" : ""
          }`}
        >
          {renderListMember()}
        </div>
      </div>
      <div className="ada__action">
        {/* <Button className="ada__aHuy" size="large" type="primary">
          Hủy
        </Button> */}
        <Button
          className="ada__aDuyet"
          size="large"
          type="primary"
          onClick={handleConfirmAccount}
        >
          Duyệt tài khoản
        </Button>
      </div>
    </div>
  );
}

export default AdminDetailAccount;
