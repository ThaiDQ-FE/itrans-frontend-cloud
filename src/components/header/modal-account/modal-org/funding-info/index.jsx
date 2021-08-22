import React from "react";
import { Select, Input, Tooltip, Spin } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
function ModalAccountOrganizationFunding(props) {
  const { Option } = Select;
  const listII = [];
  const listPI = [];

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
  return (
    <>
      <div className="maof__lineOne">
        <div className="maof__itype">
          <label className="label__fontWeight">Khu vực hoạt động</label>
          <Tooltip title={props.provinceError} color="red" placement="topRight">
            <Select
              className={`maof__selectop${
                props.provinceError !== "" ? " input__error" : ""
              }`}
              mode="multiple"
              dropdownClassName="modal__articleDrop"
              defaultValue={props.arayPro}
              size="large"
              bordered={false}
              onBlur={props.handleBlurPro}
              onChange={props.handleChangeProvince}
              dropdownAlign="top"
            >
              {listPI}
            </Select>
          </Tooltip>
        </div>
        <div className="maof__iindustry">
          <label className="label__fontWeight">Lĩnh vực kinh doanh</label>
          <Tooltip title={props.industryError} color="red" placement="topRight">
            <Select
              className={`maof__selectoi${
                props.industryError !== "" ? " input__error" : ""
              }`}
              mode="multiple"
              dropdownClassName="modal__articleDrop"
              defaultValue={props.arrayIn}
              size="large"
              bordered={false}
              onBlur={props.handleBlurIndus}
              onChange={props.handleChangeIndustry}
              dropdownAlign="top"
            >
              {listII}
            </Select>
          </Tooltip>
        </div>
      </div>
    </>
  );
}

export default ModalAccountOrganizationFunding;
