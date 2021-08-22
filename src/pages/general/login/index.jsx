import React, { useState } from "react";
import "./styles.scss";
import { Button, Input, Tooltip } from "antd";
import "antd/dist/antd.css";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import HeaderGeneral from "../../../components/header-general";
import { useDispatch } from "react-redux";
import { postCheckLogin } from "../../../store/action/user.action";
import { useHistory } from "react-router";
import { validGmail } from "../../../configs/regex";
import Messages from "../../../assets/message/text";
import { withRouter } from "react-router-dom";
import NotAuth from "../../error/auth";
import { getLocalStorage } from "../../../assets/helper/helper";
import { checkGamil, checkPassword } from "../../../validate/login/login";
function Login(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [gmailErr, setGmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [user, setUser] = useState({
    gmail: "",
    password: "",
  });
  const handleChange = (event) => {
    const { value, name } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleGmailBlur = () => {
    checkGamil(user.gmail, setGmailErr);
  };
  const handlePasswordBlur = () => {
    checkPassword(user.password, setPasswordErr);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleGmailBlur();
    handlePasswordBlur();
    if (
      user.gmail !== "" &&
      user.password !== "" &&
      gmailErr === "" &&
      passwordErr === ""
    ) {
      dispatch(postCheckLogin(user.gmail, user.password, history));
    }
  };

  return (
    <div className="login__wrapper">
      <div className="login__container">
        <HeaderGeneral />
        <div className="login__form">
          <div className="login__title">Đăng nhập</div>
          <form>
            <div className="wrapper__gmail">
              <label className="login__inputLabel">Mail</label>
              <Tooltip title={gmailErr} color="red" placement="topRight">
                <Input
                  className={gmailErr !== "" ? "login_iInput" : ""}
                  type="text"
                  name="gmail"
                  size="large"
                  placeholder="VD: taikhoan@gmail.com"
                  onChange={handleChange}
                  onBlur={handleGmailBlur}
                />
              </Tooltip>
            </div>
            <div className="wrapper__password">
              <label className="login__inputLabel">Mật khẩu</label>
              <Tooltip title={passwordErr} color="red" placement="topRight">
                <Input.Password
                  className={passwordErr !== "" ? "login_iInput" : ""}
                  placeholder="**********"
                  name="password"
                  size="large"
                  onChange={handleChange}
                  onBlur={handlePasswordBlur}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Tooltip>
            </div>
            <div className="login__button">
              <Button
                onClick={handleSubmit}
                className="login__loginButton"
                type="primary"
                size="large"
              >
                Đăng nhập
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default withRouter(Login);
