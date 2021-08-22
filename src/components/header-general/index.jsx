import React from "react";
import "./styles.scss";
import Images from "../../assets/images/images";
import Messages from "../../assets/message/text";
import { NavLink } from "react-router-dom";

function HeaderGeneral() {
  const pathName = window.location.pathname;
  return (
    <div className="headerGeneral__wrapper">
      <div className="headerGeneral__logo">
        <NavLink to="/" className="headerGeneral__link">
          <img src={Images.LOGO_GREY} alt="" />
        </NavLink>
      </div>
      <div className="headerGeneral__login">
        <NavLink to={pathName === "/dang-nhap" ? "/dang-ky" : "/dang-nhap"}>
          {pathName === "/dang-nhap"
            ? Messages.REGISTER_BUTTON
            : Messages.LOGIN_BUTTON}
        </NavLink>
      </div>
    </div>
  );
}
export default HeaderGeneral;
