import React from "react";
import { Button, Modal, DatePicker, Input, Tooltip, Popover } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import { getLocalStorage } from "../../assets/helper/helper";
import moment from "moment";
function ModalUpdateRound(props) {
  const { TextArea } = Input;
  const content = (
    <div>
      <span>Hệ thống sẽ tự làm tròn số.</span>
      <br />
      <span>Ví dụ:</span>
      <br />
      <span>15.156 {"-->"} 15.16</span>
      <br />
      <span>0.001 {"-->"} 0.00</span>
      <br />
      <span>15. {"-->"} 15</span>
    </div>
  );
  return (
    <Modal
      className="modal__update__round"
      visible={props.urModal}
      maskClosable={true}
      footer={null}
      closable={true}
      destroyOnClose={true}
      onCancel={props.closeModal}
    >
      <h3 style={{ textAlign: "center" }}>Chỉnh sửa vòng gọi vốn</h3>
      <form className="ur__form">
        <div className="ur__line1">
          <div className="ur__money">
            <small className="label__fontWeight">
              Số tiền kêu gọi
              <Popover content={content} title={null}>
                {" "}
                (i)
              </Popover>
            </small>
            <Tooltip title={props.titleError} color="red" placement="topRight">
              <Input
                className="ur__inputRight"
                type="text"
                defaultValue={getLocalStorage("fundingAmount")}
                onChange={props.handleChangeValue}
                name="fundingAmount"
                addonAfter="Tỷ VNĐ"
              />
            </Tooltip>
          </div>
          <div className="ur__percent">
            <small className="label__fontWeight">
              Phần trăm cổ phần
              <Popover content={content} title={null}>
                {" "}
                (i)
              </Popover>
            </small>
            <Tooltip>
              <Input
                className="ur__inputRight"
                type="text"
                defaultValue={getLocalStorage("shareRequirement")}
                onChange={props.handleChangeValue}
                name="shareRequirement"
                addonAfter="%"
              />
            </Tooltip>
          </div>
          <div className="ur__startDate">
            <small className="label__fontWeight">Ngày bắt đầu</small>
            <Tooltip>
              <DatePicker
                dropdownClassName="ur__dropdown"
                defaultValue={moment(
                  getLocalStorage("dateStart"),
                  props.dateFormat
                )}
                allowClear={false}
                onChange={props.setDateStart}
                format={props.dateFormat}
              />
            </Tooltip>
          </div>
          <div className="ur__endDate">
            <small className="label__fontWeight">Ngày kết thúc</small>
            <Tooltip>
              <DatePicker
                dropdownClassName="ur__dropdown"
                defaultValue={moment(
                  getLocalStorage("dateEnd"),
                  props.dateFormat
                )}
                allowClear={false}
                onChange={props.setDateEnd}
                format={props.dateFormat}
              />
            </Tooltip>
          </div>
        </div>

        <div className="ur__content">
          <small className="label__fontWeight">Tổng quan</small>
          <TextArea
            style={{ resize: "none" }}
            rows={5}
            onChange={props.handleChangeValue}
            name="contentSumary"
            defaultValue={getLocalStorage("contentSumary")}
          />
        </div>
        <div className="ur__button">
          <Button type="primary" onClick={props.handleUpdate}>
            Cập nhật
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default ModalUpdateRound;
