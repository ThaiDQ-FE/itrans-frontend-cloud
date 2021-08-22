import React from "react";
import { Input, Spin, Tooltip, Select, Popover } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import Images from "../../../../../assets/images/images";
import configConstFirebase from "../../../../../assets/helper/firebase/firebase";
import { storage } from "../../../../../configs/firebase";
function ModalAccountOrganizationBasic(props) {
  console.log(props.userStage);
  const { Option } = Select;
  let stage = [];
  for (let i = 0; i < props.userStage.length; i++) {
    stage.push(
      <Option
        key={props.userStage[i].idStage}
        value={props.userStage[i].idStage}
      >
        {props.userStage[i].name}
      </Option>
    );
  }
  console.log(props.basicInfoIn);
  const content = (
    <div>
      <p>Định dạng:</p>
      <p>- https://www.itrans.vn</p>
      <p>- www.itrans.vn</p>
      <p>- itrans.vn</p>
    </div>
  );
  const checkStage = () => {
    let boolen;
    const check = props.data.hasOwnProperty("check");
    if (check === true) {
      if (props.data.check === true) {
        boolen = false;
      } else {
        boolen = true;
      }
    }
    return boolen;
  };
  const handleChangeAvata = (e) => {
    if (e.target.files[0]) {
      let image = e.target.files[0];
      if (image.type.includes("image/")) {
        if (image.size > configConstFirebase.size) {
          props.setLogoError(configConstFirebase.errorSize);
        } else {
          if (image.name.length > configConstFirebase.name) {
            props.setLogoError(configConstFirebase.nameError);
          }
          {
            const uploadImage = storage.ref(`images/${image.name}`).put(image);
            uploadImage.on(
              "state_changed",
              (snapshot) => {
                if (snapshot.state === "running") {
                  props.setLoading(true);
                }
              },
              (error) => {},
              () => {
                storage
                  .ref("images")
                  .child(image.name)
                  .getDownloadURL()
                  .then((url) => {
                    props.setLoading(false);
                    props.setLogoError("");
                    props.setBasicInfo({
                      ...props.basicInfoIn,
                      logo: url,
                    });
                  });
              }
            );
          }
        }
      } else {
        props.setLogoError(configConstFirebase.errorTypeImage);
      }
    }
  };
  return (
    <>
      <div className="maob__imgWrapper">
        <label className="label__fontWeight">Hình đại diện</label>
        <div className="maob__image">
          <img
            src={
              props.basicInfoIn.logo === ""
                ? Images.NO_IMAGE
                : props.basicInfoIn.logo
            }
            alt="user"
            className={`maob__img${
              props.logoError !== "" ? " maob__userAvata" : ""
            }`}
          />
          <input
            className="maob__file"
            type={props.loading === true ? "text" : "file"}
            id="file"
            accept="image/*"
            onChange={handleChangeAvata}
          />
          <Tooltip title={props.logoError} color="red" placement="left">
            <label
              htmlFor="file"
              className="maob__span"
              onChange={handleChangeAvata}
            >
              <img
                src={Images.CAMERA}
                alt="camera"
                className="maob__camera"
                onChange={handleChangeAvata}
              />
              {props.loading === true ? (
                <Spin className="maob__teamlSpin" />
              ) : (
                <></>
              )}
            </label>
          </Tooltip>
        </div>
      </div>

      <div className="maob__info">
        <div className="maob__lineOne">
          <div className="maob__name">
            <label className="label__fontWeight">Tên tổ chức</label>
            <Tooltip title={props.nameError} color="red" placement="topRight">
              <Input
                className={props.nameError !== "" ? "input__error" : ""}
                type="text"
                size="large"
                name="name"
                onChange={props.handleChangeValue}
                onBlur={props.handleBlurName}
                defaultValue={props.basicInfoIn.name}
              />
            </Tooltip>
          </div>
          <div className="maob__emp">
            <label className="label__fontWeight">Số thành viên</label>
            <Tooltip
              title={props.numberOfEmpError}
              color="red"
              placement="topRight"
            >
              <Input
                className={props.numberOfEmpError !== "" ? "input__error" : ""}
                type="number"
                size="large"
                name="numberOfEmp"
                onChange={props.handleChangeValue}
                onBlur={props.handleBlurEmp}
                defaultValue={props.basicInfoIn.numberOfEmp}
              />
            </Tooltip>
          </div>
          <div className="maob__year">
            <label className="label__fontWeight">Năm thành lập</label>
            <Tooltip
              title={props.foundedYearError}
              color="red"
              placement="topRight"
            >
              <Input
                className={props.foundedYearError !== "" ? "input__error" : ""}
                type="number"
                size="large"
                name="foundedYear"
                onChange={props.handleChangeValue}
                onBlur={props.handleBlurYear}
                defaultValue={props.basicInfoIn.foundedYear}
              />
            </Tooltip>
          </div>
        </div>
        <div className="maob__lineTwo">
          <div className="maob__web">
            <label className="label__fontWeight">
              Link website{" "}
              <Popover content={content} title={null}>
                <span>(i)</span>
              </Popover>
            </label>
            <Tooltip
              title={props.websiteError}
              color="red"
              placement="topRight"
            >
              <Input
                className={props.websiteError !== "" ? "input__error" : ""}
                type="text"
                size="large"
                name="website"
                onChange={props.handleChangeValue}
                onBlur={props.handleBlurLink}
                defaultValue={props.basicInfoIn.website}
              />
            </Tooltip>
          </div>
          <div className="maob__selectIType">
            <label className="label__fontWeight">Giai đoạn hiện tại</label>
            <Select
              style={{ width: "100%" }}
              className="maib__select"
              dropdownClassName="modal__articleDrop"
              defaultValue={props.basicInfoIn.currentStage}
              onChange={props.handleChangeCurrent}
              size="large"
              disabled={checkStage()}
            >
              {stage}
            </Select>
          </div>
          {/* tax code */}
          <div className="maob__taxCode">
            <label className="label__fontWeight">Mã số thuế</label>
            <Input
              size="large"
              name="taxCode"
              defaultValue={props.basicInfoIn.taxCode}
              onChange={props.handleChangeValue}
            />
          </div>
          {/* end tax */}
        </div>
      </div>
    </>
  );
}

export default ModalAccountOrganizationBasic;
