import React from "react";
import { Modal, Input, Tooltip, DatePicker, Popover, Button } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import moment from "moment";
function ModalImpNews(props) {
  const content = (
    <div>
      <p>Định dạng:</p>
      <p>- https://www.itrans.vn</p>
      <p>- www.itrans.vn</p>
      <p>- itrans.vn</p>
    </div>
  );
  return (
    <Modal
      className="modal__impNews"
      visible={props.open}
      maskClosable={true}
      footer={null}
      closable={true}
      destroyOnClose={true}
      onCancel={props.close}
    >
      <div className="modal__impWrapper">
        <div className="modal__impOne">
          <div className="modal__impTitle">
            <label className="label__fontWeightV2">Tiêu đề</label>
            <Tooltip
              title={props.linkTitleError}
              placement="topRight"
              color="red"
            >
              <Input
                className={props.linkTitleError === "" ? "" : "inputError"}
                type="text"
                placeholder="Ví dụ: Công ty ABC xin cơ chế ưu tiên"
                onChange={props.handleChangeValueLink}
                onBlur={props.handleBlurLinkTitle}
                name="linkTitle"
                defaultValue={props.linkTitle}
              />
            </Tooltip>
          </div>
          <div className="modal__impDate">
            <label className="label__fontWeightV2">Ngày đăng tải</label>
            <Tooltip
              title={props.linkDateError}
              placement="topRight"
              color="red"
            >
              {props.open === true && props.openUpdate === true ? (
                <DatePicker
                  className={props.linkDateError === "" ? "" : "inputError"}
                  dropdownClassName="round__dropdown"
                  onChange={props.setLinkDate}
                  size="middle"
                  style={{ width: "100%" }}
                  placeholder=""
                  allowClear={false}
                  format={props.format}
                  defaultValue={moment(props.linkDate, props.format)}
                  onBlur={props.handleBlurLinkDate}
                />
              ) : (
                <DatePicker
                  className={props.linkDateError === "" ? "" : "inputError"}
                  dropdownClassName="round__dropdown"
                  value={props.linkDate}
                  onChange={props.setLinkDate}
                  size="middle"
                  style={{ width: "100%" }}
                  placeholder=""
                  allowClear={false}
                  format={props.format}
                  onBlur={props.handleBlurLinkDate}
                />
              )}
            </Tooltip>
          </div>
        </div>
        <div className="modal__impTwo">
          <div className="modal__impResource">
            <label className="label__fontWeightV2">Nguồn bài viết</label>
            <Tooltip
              title={props.linkResourceError}
              placement="topRight"
              color="red"
            >
              <Input
                className={props.linkResourceError === "" ? "" : "inputError"}
                type="text"
                placeholder="Ví dụ: Cafef"
                onChange={props.handleChangeValueLink}
                onBlur={props.handleBlurLinkResource}
                name="linkResource"
                defaultValue={props.linkResource}
              />
            </Tooltip>
          </div>
          <div className="modal__impLink">
            <label className="label__fontWeightV2">
              Link bài viết
              <Popover content={content} title={null}>
                <span>(i)</span>
              </Popover>
            </label>
            <Tooltip
              title={props.linkLinkError}
              placement="topRight"
              color="red"
            >
              <Input
                className={props.linkLinkError === "" ? "" : "inputError"}
                type="text"
                placeholder="Ví dụ: https://cafef.vn/doanh-nghiep.chn"
                onChange={props.handleChangeValueLink}
                onBlur={props.handleBlurLinkLink}
                name="linkLink"
                defaultValue={props.linkLink}
              />
            </Tooltip>
          </div>
        </div>
        <div className="modal__impButton">
          {props.open === true && props.openUpdate === true ? (
            <Button
              type="primary"
              size="large"
              onClick={props.handleUpdateLinkNew}
            >
              Cập nhật bài viết
            </Button>
          ) : (
            <Button
              type="primary"
              size="large"
              onClick={props.handleCreteLinkNew}
            >
              Tạo bài viết
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default ModalImpNews;
