import React, { useState } from "react";
import { Button, Modal, Cascader } from "antd";
import Images from "../../assets/images/images";
import "./styles.scss";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";
import { showMessage } from "../../assets/helper/helper";
function ModalAcceptDeal(props) {
  const { listFreeTimeByIdInvestor } = useSelector((state) => state.freeTime);
  const showOption = () => {
    if (listFreeTimeByIdInvestor !== []) {
      var arrayOption = [];
      listFreeTimeByIdInvestor.map((item) => {
        const arrayTime = [];
        item.listTime.map((time) => {
          const objectTime = {
            value: time.time + time.idFreeTime,
            label: time.time,
            id: time.id,
          };
          arrayTime.push(objectTime);
        });
        const objectOption = {
          value: item.date,
          label: item.date,
          children: arrayTime,
        };
        arrayOption.push(objectOption);
      });
      return arrayOption;
    }
  };

  const onChange = (value) => {
    const finalDateTime = value.toString();
    const replaceFinalDateTime = finalDateTime.replace(",", " ");
    const id = replaceFinalDateTime.slice(16, replaceFinalDateTime.length);
    props.setValue(id);
  };
  const displayRender = (labels) => {
    const array = [];
    labels.map((item) => {
      array.push(item);
    });
    const toStrings = array.toString();
    const show = toStrings.replace(",", " ");
    return show;
  };
  if (listFreeTimeByIdInvestor === "") {
    const nameInvestor = JSON.parse(localStorage.getItem("nameInvestor"));
    return (
      <Modal
        className="modal__acceptEmpty"
        footer={null}
        visible={props.openModalAccept}
        closable={false}
      >
        <div className="modal__oops">
          <img src={Images.OOPS} alt="oops" />
        </div>
        <div className="modal__info">
          <h4>
            Nhà đầu tư <b>"{nameInvestor}" </b>hiện chưa có thời gian rãnh.
          </h4>
        </div>
        <div className="modal__retry">
          <Button
            type="primary"
            className="button__retry"
            size="large"
            onClick={props.closeModalAccept}
          >
            Đồng ý
          </Button>
        </div>
      </Modal>
    );
  } else {
    return (
      <Modal
        className="modal__accept"
        title="Modal Accept"
        maskClosable={true}
        footer={null}
        closable={true}
        destroyOnClose={true}
        visible={props.openModalAccept}
        onCancel={props.closeModalAccept}
      >
        <div className="modal__title">
          <h4>Đặt lịch hẹn với nhà đầu tư</h4>
        </div>
        <div className="modal__cascader">
          <Cascader
            options={showOption()}
            onChange={onChange}
            placeholder="Lựa chọn ngày và giờ"
            displayRender={displayRender}
            allowClear={false}
          />
          <Button
            className="modal__button"
            type="primary"
            onClick={props.handleClickButtonModalAccept}
          >
            Xác nhận
          </Button>
        </div>
      </Modal>
    );
  }
}
export default ModalAcceptDeal;
