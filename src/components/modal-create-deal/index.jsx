import React from "react";
import { Modal, Button, Input } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import { convertNumber, getLocalStorage } from "../../assets/helper/helper";
function ModalCreateDeal(props) {
  const { TextArea } = Input;
  return (
    <Modal
      className="modal__createDeal"
      visible={props.openModal}
      footer={null}
      closable={true}
      destroyOnClose={true}
      onCancel={props.closeModal}
    >
      <div className="modal__wrapper">
        <h3>Tạo DEAL</h3>
        <div className="modal__top">
          <div className="modal__lineOne">
            <div className="modal__one">
              <small>Tên tổ chức</small>
              <Input defaultValue={getLocalStorage("nameOrg")} readOnly />
            </div>
            <div className="modal__two">
              <small>Giai đoạn gọi vốn</small>
              <Input defaultValue={getLocalStorage("stageOrg")} readOnly />
            </div>
          </div>
          <div className="modal__lineTwo">
            <div className="modal__three">
              <small>Số tiền kêu gọi</small>
              <Input
                defaultValue={
                  getLocalStorage("fundingAmount") >= 1000
                    ? convertNumber(getLocalStorage("fundingAmount"))
                    : getLocalStorage("fundingAmount") + ",000,000 VNĐ"
                }
                readOnly
              />
            </div>
            <div className="modal__four">
              <small>Phần trăm cổ phần</small>
              <Input
                defaultValue={getLocalStorage("shareReq") + "%"}
                readOnly
              />
            </div>
          </div>
          <div className="modal__lineThree">
            <div className="modal__five">
              <small>Mô tả</small>
              <TextArea
                style={{ resize: "none" }}
                size="large"
                rows={3}
                defaultValue={getLocalStorage("des")}
                readOnly
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="modal__bottom">
          <div className="modal__lineFour">
            <div className="modal__six">
              <small>Số tiền muốn đầu tư</small>
              <Input
                type="number"
                addonAfter=",000,000 VNĐ"
                name="soTienMuonDauTu"
                onChange={props.handleChangeData}
              />
            </div>
            <div className="modal__seven">
              <small>Phần trăm cổ phần</small>
              <Input
                type="number"
                addonAfter="%"
                name="phanTramCoPhan"
                onChange={props.handleChangeData}
              />
            </div>
          </div>
          <div className="modal__lineFive">
            <div className="modal__eight">
              <small>Mô tả</small>
              <TextArea
                style={{ resize: "none" }}
                size="large"
                rows={3}
                name="moTa"
                onChange={props.handleChangeData}
              />
            </div>
          </div>
        </div>
        <div className="modal__button">
          <Button type="primary" onClick={props.handleClickButton}>
            Tạo deal
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalCreateDeal;
