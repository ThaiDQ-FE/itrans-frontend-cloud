import React from "react";
import Images from "../../../assets/images/images";
import { NavLink, withRouter } from "react-router-dom";
import "./styles.scss";
import { checkRoleUser, getLocalStorage } from "../../../assets/helper/helper";
import authMessage from "../../../validate/message/authMessage";
function NotAuth() {
  const checkMess = () => {
    if (getLocalStorage("userInfo") === null) {
      return authMessage.not_login;
    } else {
      const path = window.location.pathname;
      if (
        path.includes("/to-chuc") &&
        (checkRoleUser() === "ADMIN" || checkRoleUser() === "ORGANIZATION")
      ) {
        return authMessage.wrong_role;
      }
      if (
        path.includes("/nha-dau-tu") &&
        (checkRoleUser() === "ADMIN" || checkRoleUser() === "INVESTOR")
      ) {
        return authMessage.wrong_role;
      }
      if (path === "/dang-nhap") {
        return authMessage.logined;
      } else {
        return authMessage.wrong_role;
      }
    }
  };
  return (
    <div className="notAuth__wrapper">
      <div className="notAuth__container">
        <h2>{authMessage.default}</h2>
        <h5>{checkMess()}</h5>
        <img src={Images.OOPSS} alt="error" />
        <h5>
          Nhấn{" "}
          <NavLink
            activeClassName="active-nav-link-header"
            className="notAuth__nav"
            to={
              getLocalStorage("userInfo") === null
                ? "/dang-nhap"
                : checkRoleUser() === "ADMIN"
                ? "/admin"
                : "/"
            }
            exact={true}
          >
            trở lại
          </NavLink>
          {getLocalStorage("userInfo") === null
            ? authMessage.back_login
            : authMessage.back_home}
        </h5>
      </div>
      ;
    </div>
  );
}

export default withRouter(NotAuth);
