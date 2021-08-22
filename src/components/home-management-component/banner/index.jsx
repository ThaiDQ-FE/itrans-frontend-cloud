import React from "react";
import "./styles.scss";
import Typed from "react-typed";
import { checkRoleUser } from "../../../assets/helper/helper";
import Images from "../../../assets/images/images";
import message from "../../../assets/message/text";
import { Button } from "antd";
import { withRouter } from "react-router-dom";
function Banner(props) {
  const handleClick = () => {
    if (checkRoleUser() === "INVESTOR") {
      props.history.push("/to-chuc");
    } else {
      props.history.push("/nha-dau-tu");
    }
  };
  return (
    <div className="banner__wrapper">
      <div className="banner__container">
        {/* <h1 className="banner__h1">Kết nối nhà đầu tư</h1>
        <h1 className="banner__h1">và tổ chức</h1>
        <p className="banner__sologan">
          <Typed strings={list} typeSpeed={30} backSpeed={8} loop />
        </p> */}
        <div className="banner__image">
          <img
            src={checkRoleUser() === "INVESTOR" ? Images.INVESTOR : Images.ORG}
            alt="banner-inves"
          />
          <p className="banner__hide"></p>
        </div>
        <div className="banner__info">
          <div className="banner__infoWrapper">
            <span className="banner__role">
              {checkRoleUser() === "INVESTOR"
                ? "NHÀ ĐẦU TƯ"
                : "TỔ CHỨC KHỞI NGHIỆP"}
            </span>
            <span className="banner__question">
              Bạn được gì khi tham gia vào ITRANS?
            </span>
            <p className="banner__answer">
              {checkRoleUser() === "INVESTOR"
                ? message.BANNER_WORD_INVESTOR
                : message.BANNER_WORD_ORG}
            </p>
            <Button
              type="primary"
              size="large"
              className="banner__button"
              onClick={handleClick}
            >
              {checkRoleUser() === "INVESTOR"
                ? "Tìm tổ chức khởi nghiệp"
                : "Tìm nhà đầu tư"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default withRouter(Banner);
