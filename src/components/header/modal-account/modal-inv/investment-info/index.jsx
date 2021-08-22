import React from "react";
import { Select, Input, Tooltip, Spin } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import { SyncDisabledTwoTone } from "@material-ui/icons";
function ModalAccountInvestorInvesment(props) {
  const { Option } = Select;
  const listIT = [];
  const listII = [];
  const listPI = [];
  const listRI = [];
  const listSI = [];
  for (let i = 0; i < props.listInvestorType.length; i++) {
    listIT.push(
      <Option
        key={props.listInvestorType[i].idInvestorType}
        value={props.listInvestorType[i].name}
        disabled={props.listInvestorType[i].name === "Nhà đầu tư thiên thần"}
      >
        {props.listInvestorType[i].name}
      </Option>
    );
  }
  for (let i = 0; i < props.listIndustry.length; i++) {
    listII.push(
      <Option
        key={props.listIndustry[i].idIndustry}
        value={props.listIndustry[i].name}
      >
        {props.listIndustry[i].name}
      </Option>
    );
  }
  for (let i = 0; i < props.listProvince.length; i++) {
    listPI.push(
      <Option
        key={props.listProvince[i].idProvince}
        value={props.listProvince[i].name}
      >
        {props.listProvince[i].name}
      </Option>
    );
  }
  for (let i = 0; i < props.listRegion.length; i++) {
    listRI.push(
      <Option
        key={props.listRegion[i].idRegion}
        value={props.listRegion[i].name}
      >
        {props.listRegion[i].name}
      </Option>
    );
  }
  for (let i = 0; i < props.listStage.length; i++) {
    listSI.push(
      <Option key={props.listStage[i].idStage} value={props.listStage[i].name}>
        {props.listStage[i].name}
      </Option>
    );
  }
  const checkDisable = () => {
    let boolen;
    props.arrayInv.map((item) => {
      if (item === "Nhà đầu tư thiên thần") {
        boolen = true;
      } else {
        boolen = false;
      }
    });
    return boolen;
  };
  console.log(props.typeError);
  return (
    <>
      <div className="maii__lineOne">
        <div className="maii__itype">
          <label className="label__fontWeight">Loại nhà đầu tư</label>
          <Tooltip title={props.typeError} color="red" placement="topRight">
            <Select
              className={`maill__selectit${
                props.typeError !== "" ? " input__error" : ""
              }`}
              mode="multiple"
              dropdownClassName="modal__articleDrop"
              defaultValue={props.arrayInv}
              size="large"
              bordered={false}
              onChange={props.handleChangeIType}
              dropdownAlign="top"
              disabled={checkDisable()}
              onBlur={props.handleBlurType}
            >
              {listIT}
            </Select>
          </Tooltip>
        </div>
        <div className="maii__iindustry">
          <label className="label__fontWeight">Lĩnh vục đầu tư</label>
          <Tooltip title={props.industryError} color="red" placement="topRight">
            <Select
              className={`maill__selectii${
                props.industryError !== "" ? " input__error" : ""
              }`}
              mode="multiple"
              dropdownClassName="modal__articleDrop"
              defaultValue={props.arrayIn}
              size="large"
              bordered={false}
              onChange={props.handleChangeIndustry}
              onBlur={props.handleBlurIndus}
            >
              {listII}
            </Select>
          </Tooltip>
        </div>
      </div>
      <div className="maii__lineTwo">
        <div className="maii__iRegion">
          <label className="label__fontWeight">Khu vực đầu tư</label>
          <Tooltip title={props.regionError} color="red" placement="topRight">
            <Select
              className={`maill__selectir${
                props.regionError !== "" ? " input__error" : ""
              }`}
              mode="multiple"
              dropdownClassName="modal__articleDrop"
              defaultValue={props.arrayRe}
              size="large"
              bordered={false}
              onChange={props.handleChangeRegion}
              onBlur={props.handleBlurRe}
            >
              {listRI}
            </Select>
          </Tooltip>
        </div>
        <div className="maii__iProvince">
          <label className="label__fontWeight">Vùng miền đầu tư</label>
          <Tooltip title={props.provinceError} color="red" placement="topRight">
            <Select
              className={`maill__selectip${
                props.provinceError !== "" ? " input__error" : ""
              }`}
              mode="multiple"
              dropdownClassName="modal__articleDrop"
              defaultValue={props.arayPro}
              size="large"
              bordered={false}
              onChange={props.handleChangeProvince}
              onBlur={props.handleBlurPro}
            >
              {listPI}
            </Select>
          </Tooltip>
        </div>
      </div>
      <div className="maii__lineThree">
        <div className="maii__iStage">
          <label className="label__fontWeight">Giai đoạn đầu tư</label>
          <Tooltip title={props.stageError} color="red" placement="topRight">
            <Select
              className={`maill__selectis${
                props.stageError !== "" ? " input__error" : ""
              }`}
              mode="multiple"
              dropdownClassName="modal__articleDrop"
              defaultValue={props.arrayS}
              size="large"
              bordered={false}
              onChange={props.handleChangeStage}
              onBlur={props.handleBlurStage}
            >
              {listSI}
            </Select>
          </Tooltip>
        </div>
        <div className="maii__iValue">
          <label className="label__fontWeight">Số tiền đầu tư</label>
          <div className="maii__minMax">
            <Tooltip
              title={props.minInvestmentError}
              color="red"
              placement="topRight"
            >
              <div className="maii__minValue">
                <Input
                  className={
                    props.minInvestmentError !== "" ? " input__error" : ""
                  }
                  defaultValue={props.data.minInvestment}
                  type="number"
                  size="large"
                  addonAfter="Tỷ VNĐ"
                  name="minInvestment"
                  onChange={props.handleChangeValue}
                  onBlur={props.handleBlurMin}
                />
              </div>
            </Tooltip>
            <div className="maii__space">
              <span>-</span>
            </div>
            <Tooltip
              title={props.maxInvestmentError}
              color="red"
              placement="topRight"
            >
              <div className="maii__maxValue">
                <Input
                  defaultValue={props.data.maxInvestment}
                  type="number"
                  size="large"
                  className={
                    props.maxInvestmentError !== "" ? " input__error" : ""
                  }
                  name="maxInvestment"
                  addonAfter="Tỷ VNĐ"
                  onChange={props.handleChangeValue}
                  onBlur={props.handleBlurMax}
                />
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalAccountInvestorInvesment;
