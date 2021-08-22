import React from "react";
import { Button, Popover, Modal, Input, DatePicker } from "antd";
import Images from "../../assets/images/images";
import "./styles.scss";
import "antd/dist/antd.css";
function ModalCreateRound(props) {
  const { TextArea } = Input;
  return (
    <>
      <Modal
        className="cfr__modal"
        title="Basic Modal"
        maskClosable={true}
        footer={null}
        closable={true}
        destroyOnClose={true}
        visible={props.openModal}
        onCancel={props.closeModal}
      >
        <h3 style={{ textAlign: "center" }}>Tạo vòng gọi vốn</h3>
        <form className="cfr__form" id="cfr__form">
          <div className="cfr__lineOne">
            <div className="cfr__wrapperSTKG">
              <Input
                id="cfr__formSTKG"
                size="large"
                type="number"
                className="cfr__formSTKG"
                addonAfter=".000.000 VNĐ"
                placeholder="Số tiền kêu gọi"
                onChange={props.handleChangeValue}
                name="soTienKeuGoi"
              />
              {props.STKGE !== "" ? (
                <small style={{ color: "red" }}>{props.STKGE}</small>
              ) : (
                ""
              )}
            </div>
            <div className="cfr__wrapperPTCP">
              <Input
                size="large"
                type="number"
                className="cfr__formPTCP"
                addonAfter="%"
                placeholder="Phần trăm cổ phần"
                onChange={props.handleChangeValue}
                name="phanTramCoPhan"
              />
              {props.PTCPE !== "" ? (
                <small style={{ color: "red" }}>{props.PTCPE}</small>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="cfr__lineArea">
            <TextArea
              className="cfr__formMT"
              size="large"
              rows={5}
              placeholder="Mô tả"
              onChange={props.handleChangeValue}
              name="moTa"
            />
          </div>
          <div className="cfr__datePicker">
            <div className="cfr__startDate">
              <DatePicker
                value={props.startDate}
                onChange={props.setStartDate}
                className="cfr__dpngv"
                dropdownClassName="cfr__dpngvdrop"
                placeholder="Ngày gọi vốn"
                size="large"
                format={props.dateFormat}
              />
              {props.startDateE !== "" ? (
                <small style={{ color: "red" }}>{props.startDateE}</small>
              ) : (
                ""
              )}
            </div>
            <div className="cfr__startDate">
              <DatePicker
                className="cfr__dpnkt"
                value={props.endDate}
                onChange={props.setEndDate}
                dropdownClassName="cfr__dpnktdrop"
                placeholder="Ngày kết thúc"
                size="large"
                format={props.dateFormat}
              />
              {props.endDateE !== "" ? (
                <small style={{ color: "red" }}>{props.endDateE}</small>
              ) : (
                ""
              )}
            </div>
            <div className="cfr__warningSign">
              <Popover placement="topRight" content={props.rule}>
                <img src={Images.WARNING} alt="warning" />
              </Popover>
            </div>
          </div>
          <div className="cfr__submitForm">
            <Button
              onClick={props.handleCreateRoundForm}
              className="cfr__sfTao"
              type="primary"
              size="large"
            >
              Xác nhận
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
export default ModalCreateRound;
