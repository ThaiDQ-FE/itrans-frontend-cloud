import { Input, Spin, Tooltip, Select, Popover } from "antd";
import React, { useEffect } from "react";
import Images from "../../../../../assets/images/images";
import "antd/dist/antd.css";
import "./styles.scss";
import configConstFirebase from "../../../../../assets/helper/firebase/firebase";
import { storage } from "../../../../../configs/firebase";
function ModalAccountInvestorBasic(props) {
  const { Option } = Select;
  const listHead = [];
  for (let i = 0; i < props.listProvince.length; i++) {
    listHead.push(
      <Option
        key={props.listProvince[i].idProvince}
        value={props.listProvince[i].idProvince}
      >
        {props.listProvince[i].name}
      </Option>
    );
  }
  const content = (
    <div>
      <p>Định dạng:</p>
      <p>- https://www.itrans.vn</p>
      <p>- www.itrans.vn</p>
      <p>- itrans.vn</p>
    </div>
  );
  const handleChangeAvata = (e) => {
    if (e.target.files[0]) {
      let image = e.target.files[0];
      if (image.type.includes("image/")) {
        if (image.size > configConstFirebase.size) {
          props.setLogoError(configConstFirebase.errorSize);
        } else {
          if (image.name.length > configConstFirebase.name) {
            props.setLogoError(configConstFirebase.errorName);
          } else {
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
  console.log(props.basicInfoIn);
  return (
    <>
      <div className="maib__imgWrapper">
        <label className="label__fontWeight">Hình đại diện</label>
        <div className="maib__image">
          <img
            src={
              props.basicInfoIn.logo === ""
                ? Images.NO_IMAGE
                : props.basicInfoIn.logo
            }
            alt="user"
            className={`maib__img${
              props.logoError !== "" ? " maib__userAvata" : ""
            }`}
          />
          <input
            className="maib__file"
            type={props.loading === true ? "text" : "file"}
            id="file"
            accept="image/*"
            onChange={handleChangeAvata}
          />
          <Tooltip title={props.logoError} color="red" placement="left">
            <label
              htmlFor="file"
              className="maib__span"
              onChange={handleChangeAvata}
            >
              <img
                src={Images.CAMERA}
                alt="camera"
                className="maib__camera"
                onChange={handleChangeAvata}
              />
              {props.loading === true ? (
                <Spin className="maib__teamlSpin" />
              ) : (
                <></>
              )}
            </label>
          </Tooltip>
        </div>
      </div>

      <div className="maib__info">
        <div className="maib__lineOne">
          <div className="maib__name">
            <label className="label__fontWeight">Tên nhà/quỹ đầu tư</label>
            <Tooltip title={props.nameError} color="red" placement="topRight">
              <Input
                className={props.nameError !== "" ? "input__error" : ""}
                type="text"
                size="large"
                name="name"
                defaultValue={props.basicInfoIn.name}
                onChange={props.handleChangeValue}
                onBlur={props.handleBlurName}
              />
            </Tooltip>
          </div>
          <div className="maib__emp">
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
                defaultValue={props.basicInfoIn.numberOfEmp}
                onChange={props.handleChangeValue}
                onBlur={props.handleBlurEmp}
              />
            </Tooltip>
          </div>
          <div className="maib__year">
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
                defaultValue={props.basicInfoIn.foundedYear}
                onChange={props.handleChangeValue}
                onBlur={props.handleBlurYear}
              />
            </Tooltip>
          </div>
        </div>
        <div className="maib__lineTwo">
          <div className="maib__web">
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
                defaultValue={props.basicInfoIn.website}
                onChange={props.handleChangeValue}
                onBlur={props.handleBlurLink}
              />
            </Tooltip>
          </div>
          <div className="maib__selectIType">
            <label className="label__fontWeight">Trụ sở chính</label>
            <Select
              className="maib__select"
              dropdownClassName="modal__articleDrop"
              defaultValue={props.basicInfoIn.headQuarter}
              size="large"
              onChange={props.handleChangeHead}
            >
              {listHead}
            </Select>
          </div>
          {/* tax code */}
          <div className="maib__taxCode">
            <label className="label__fontWeight">Mã số thuế </label>
            <Tooltip
              // title={props.websiteError}
              color="red"
              placement="topRight"
            >
              <Input size="large"
              name="taxCode"
              defaultValue={props.basicInfoIn.taxCode}
              onChange={props.handleChangeValue}
              />
            </Tooltip>
          </div>
          {/* tax code */}
        </div>
      </div>
    </>
  );
}

export default ModalAccountInvestorBasic;
