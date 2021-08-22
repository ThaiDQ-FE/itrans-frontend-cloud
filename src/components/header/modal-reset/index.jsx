import React from "react";
import { Button, Modal, Input, Tooltip, Spin, Checkbox } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./styles.scss";
function ModalResetAccountPass(props) {
  return (
    <Modal
      className="modalah__accountReset"
      visible={props.open}
      maskClosable={true}
      footer={null}
      closable={true}
      destroyOnClose={true}
      onCancel={props.close}
    >
      <h2 style={{ textAlign: "center" }}>Đổi mật khẩu</h2>
      <div className="mrap__old">
        <label className="label__fontWeight">Mật khẩu cũ</label>
        <Tooltip title={props.oldError} color="red" placement="topRight">
          <Input.Password
            className={props.oldError === "" ? "" : "mrap__inputError"}
            placeholder="*****"
            size="large"
            name="oldPassword"
            onChange={props.handleChangePass}
            onBlur={props.handleBlurOld}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Tooltip>
      </div>
      <div className="mrap__new">
        <label className="label__fontWeight">Mật khẩu mới</label>
        <Tooltip title={props.newError} color="red" placement="topRight">
          <Input.Password
            className={props.newError === "" ? "" : "mrap__inputError"}
            placeholder="*****"
            size="large"
            name="newPassword"
            onChange={props.handleChangePass}
            onBlur={props.handleBlurNew}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Tooltip>
      </div>
      <div className="mrap__reNew">
        <label className="label__fontWeight">Nhập lại mật khẩu mới</label>
        <Tooltip title={props.reNewError} color="red" placement="topRight">
          <Input.Password
            className={props.reNewError === "" ? "" : "mrap__inputError"}
            placeholder="*****"
            size="large"
            name="reNew"
            onChange={props.handleChangePass}
            onBlur={props.handleBlurOReNew}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Tooltip>
      </div>
      <div className="mrap__action">
        <Button
          type="primary"
          size="large"
          className="mrap__capnhat"
          onClick={props.handleChangePassClick}
          disabled={
            props.oldError !== "" ||
            props.newError !== "" ||
            props.reNewError !== ""
          }
        >
          Cập nhật
        </Button>
      </div>
    </Modal>
  );
}

export default ModalResetAccountPass;
