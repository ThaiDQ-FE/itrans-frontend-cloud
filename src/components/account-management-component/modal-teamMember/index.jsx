import React from "react";
import { Button, Modal, Input, Tooltip, Spin } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import Images from "../../../assets/images/images";
import { storage } from "../../../configs/firebase";
import { getLocalStorage } from "../../../assets/helper/helper";
import { useState } from "react";
import configConstFirebase from "../../../assets/helper/firebase/firebase";
function ModalTeamMember(props) {
  const [loading, setLoading] = useState(false);
  const handleChangeAvata = (e) => {
    if (e.target.files[0]) {
      let image = e.target.files[0];
      if (image.type.includes("image/")) {
        if (image.size > configConstFirebase.size) {
          props.setAvataError(configConstFirebase.errorSize);
        } else {
          if (image.name.length > configConstFirebase.name) {
            props.setAvataError(configConstFirebase.nameError);
          }
          {
            const uploadImage = storage.ref(`images/${image.name}`).put(image);
            uploadImage.on(
              "state_changed",
              (snapshot) => {
                if (snapshot.state === "running") {
                  setLoading(true);
                }
              },
              (error) => {},
              () => {
                storage
                  .ref("images")
                  .child(image.name)
                  .getDownloadURL()
                  .then((url) => {
                    setLoading(false);
                    props.setAvataError("");
                    props.setUrlAvata(url);
                  });
              }
            );
          }
        }
      } else {
        props.setAvataError(configConstFirebase.errorTypeImage);
      }
    }
  };
  const handleChangeLinkCv = (e) => {
    let linkCV = e.target.files[0];
    const uploadImage = storage.ref(`images/${linkCV.name}`).put(linkCV);
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {},
      () => {
        storage
          .ref("images")
          .child(linkCV.name)
          .getDownloadURL()
          .then((url) => {
            props.setLinkCv(linkCV.name);
            props.setWebLinkCv(url);
          });
      }
    );
  };
  const checkUrlImage = () => {
    if (props.openEdit === false) {
      if (props.urlAvata === null) {
        return Images.NO_USER;
      } else {
        return props.urlAvata;
      }
    } else {
      if (props.urlAvata === "") {
        return Images.NO_USER;
      } else {
        return props.urlAvata;
      }
    }
  };
  return (
    <Modal
      className="modal__teamMember"
      visible={props.openOrClose}
      maskClosable={true}
      footer={null}
      closable={true}
      destroyOnClose={true}
      onCancel={props.closeModal}
    >
      <h3>
        {props.openEdit === false ? "Thêm thành viên" : "Cập nhật thông tin"}
      </h3>
      <div className="modal__TImage">
        <img
          src={checkUrlImage()}
          alt="user"
          className={`modal__TImageimg${
            props.avataError !== "" ? " modal__userAvata" : ""
          }`}
        />
        <input
          className="modal__file"
          type={loading === true ? "text" : "file"}
          id="file"
          accept="image/*"
          onChange={handleChangeAvata}
        />
        <Tooltip title={props.avataError} color="red" placement="left">
          <label
            htmlFor="file"
            className="modal__span"
            onChange={handleChangeAvata}
          >
            <img
              src={Images.CAMERA}
              alt="camera"
              className="modal__camera"
              onChange={handleChangeAvata}
            />
            {loading === true ? <Spin className="modal__teamlSpin" /> : <></>}
          </label>
        </Tooltip>
      </div>
      <div className="modal__THoTen">
        <label>Họ và Tên</label>
        <Tooltip title={props.nameError} color="red" placement="topRight">
          <Input
            className={props.nameError !== "" ? "member__nameError" : ""}
            type="text"
            size="middle"
            defaultValue={
              props.openEdit === false ? `` : getLocalStorage("objectTeam").name
            }
            placeholder="VD: Đặng Quốc Thái"
            name="name"
            onBlur={props.handleBlurName}
            onChange={props.handleChangeValue}
          />
        </Tooltip>
      </div>
      <div className="modal__TChucVu">
        <label>Chức vụ</label>
        <Tooltip title={props.chucVuError} color="red" placement="topRight">
          <Input
            className={props.chucVuError !== "" ? "member__chucVuError" : ""}
            type="text"
            size="middle"
            placeholder="VD: Giám đốc chiến lược"
            defaultValue={
              props.openEdit === false
                ? ``
                : getLocalStorage("objectTeam").position
            }
            name="chucVu"
            onBlur={props.handleBlurChucVu}
            onChange={props.handleChangeValue}
          />
        </Tooltip>
      </div>
      <div className="modal__TLinkCv">
        <label>Link CV</label>
        {props.openEdit === false ? (
          <Input
            name="linkcv"
            placeholder="Link CV"
            size="middle"
            value={props.linkCv}
            onChange={props.handleChangeInputLink}
          />
        ) : (
          <Input
            name="linkcv"
            placeholder="Link CV"
            size="middle"
            onChange={props.handleChangeInputLink}
            value={props.linkCv}
            defaultValue={
              props.openEdit === false
                ? ``
                : getLocalStorage("objectTeam").linkCv
            }
          />
        )}

        <div className="modal__upload">
          <input
            className="modal__uploadPDF"
            type="file"
            id="filePDF"
            accept="application/pdf"
            onChange={handleChangeLinkCv}
          />
          <label
            htmlFor="filePDF"
            className="modal__spanPDF"
            onChange={handleChangeLinkCv}
          >
            <img
              src={Images.UPLOAD}
              alt="icon upload"
              className="modal__uploadPNG"
              onChange={handleChangeLinkCv}
            />
          </label>
        </div>
      </div>
      <div className="modal__button">
        <Button
          type="primary"
          onClick={
            props.openEdit === false
              ? props.handleClickThem
              : props.handleClickUpdate
          }
          disabled={loading === true}
        >
          {props.openEdit === false ? "Thêm" : "Cập nhật"}
        </Button>
      </div>
    </Modal>
  );
}

export default ModalTeamMember;
