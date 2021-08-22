import React from "react";
import { Button, Modal, Input, Tooltip, Form, Space } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import { getLocalStorage } from "../../assets/helper/helper";
function ModalUpdateIntroduce(props) {
  const { TextArea } = Input;
  return (
    <Modal
      className="modal__editIntro"
      visible={props.editIntro}
      maskClosable={true}
      footer={null}
      closable={true}
      destroyOnClose={true}
      onCancel={props.closeModal}
    >
      <h3 style={{ textAlign: "center" }}>Chỉnh sửa tiêu đề - nội dung</h3>
      <div className="modal__editIntroWrapper">
        <div className="modal__editTitle">
          <label>Tiêu đề</label>
          <Tooltip placement="topRight" title={props.titleError}>
            <TextArea
              style={{ resize: "none" }}
              defaultValue={
                props.editIntro === true
                  ? getLocalStorage("infoEditIntro").title
                  : ``
              }
              onBlur={props.handleBlurTitle}
              onChange={props.handleChangeValue}
              name="title"
            />
          </Tooltip>
        </div>
        <div className="modal__editContent">
          <label>Nội dung</label>
          <Tooltip placement="topRight" title={props.contentError}>
            <TextArea
              style={{ resize: "none" }}
              rows={5}
              defaultValue={
                props.editIntro === true
                  ? getLocalStorage("infoEditIntro").content
                  : ``
              }
              onBlur={props.handleBlurContent}
              onChange={props.handleChangeValue}
              name="content"
            />
          </Tooltip>
        </div>
        <div className="modal__editAction">
          <Button type="primary" onClick={props.onSubmit}>
            Cập nhật
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalUpdateIntroduce;
