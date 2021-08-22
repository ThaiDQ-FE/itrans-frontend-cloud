import React from "react";
import "./styles.scss";
import Images from "../../assets/images/images";
import Messages from "../../assets/message/text";
import data from "./data.json";
import { useSelector } from "react-redux";
import { getLocalStorage } from "../../assets/helper/helper";
function UserFooter() {
  const { loading } = useSelector((state) => state.loading);
  if (getLocalStorage("userInfo") === null) {
    return <></>;
  } else {
    return (
      <div className={`uf__wrapper${loading === true ? " uf__loading" : ""}`}>
        <div className="uf__container">
          <div className="uf__logo">
            <img src={Images.LOGO_GREY} alt="" />
          </div>
          <div className="uf__contact">
            <div className="uf__HCM">
              <span className="uf__truSo">
                Sở Khoa học {"&"} Công nghệ Long An:
              </span>
              <span className="uf__diaChi">{Messages.TRUSOHCM}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default UserFooter;
