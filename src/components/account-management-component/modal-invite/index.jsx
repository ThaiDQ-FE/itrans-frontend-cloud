import React from "react";
import { Button, Input, Modal, Tooltip } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
function ModalInvite(props) {
  console.log(props.value);
  const { TextArea } = Input;
  return (
    <Modal
      className="modal__invite"
      visible={props.openModal}
      maskClosable={true}
      footer={null}
      closable={true}
      destroyOnClose={true}
      onCancel={props.closeModal}
    >
      <h2 className="mi__h2">Mời nhà đầu tư</h2>
      <span className="mi__span">Thông tin vòng gọi vốn</span>
      <div className="mi__info">
        <div className="mi__money">
          <label className="label__fontWeight">Số tiền kêu gọi</label>
          <Input
            readOnly
            defaultValue={props.value.fundingAmount}
            addonAfter="Tỷ VNĐ"
          />
        </div>
        <div className="mi__percent">
          <label className="label__fontWeight">Phần trăm cổ phần</label>
          <Input
            readOnly
            defaultValue={props.value.shareRequirement}
            addonAfter="%"
          />
        </div>
        <div className="mi__start">
          <label className="label__fontWeight">Ngày bắt đầu</label>
          <Input readOnly defaultValue={props.value.startDate} />
        </div>
        <div className="mi__end">
          <label className="label__fontWeight">Ngày kết thúc</label>
          <Input readOnly defaultValue={props.value.endDate} />
        </div>
      </div>
      <hr style={{ width: 100, margin: "20px auto 10px auto" }} />
      <span className="mi__des">Nội dung</span>
      <div className="mi__description">
        <Tooltip title={props.desError} color="red" placement="topRight">
          <TextArea
            className={`mi__desText${
              props.desError === "" ? "" : " mi__desTextError"
            }`}
            rows={5}
            name="description"
            onChange={props.handleChangeDes}
            onBlur={props.handleBlurDes}
          />
        </Tooltip>
      </div>
      <div className="mi__action">
        <Button type="primary" onClick={props.handleClickInvite}>
          Mời
        </Button>
      </div>
    </Modal>
  );
}

export default ModalInvite;
