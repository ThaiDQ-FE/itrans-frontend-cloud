import React, { useState } from "react";
import { Select, Button, Skeleton } from "antd";
import "./styles.scss";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStorage } from "../../../assets/helper/helper";
import { getOrganizationFilter } from "../../../store/action/organization.action";

function FilterOrganizationComponent(props) {
  const { listStage, listRegion, listProvince, listIndustry } = useSelector(
    (state) => state.register
  );
  const { loading } = useSelector((state) => state.loading);
  const { Option } = Select;
  const dispatch = useDispatch();
  const stage = [];
  const region = [];
  const province = [];
  const industry = [];
  let arrayS = [];
  let arrayR = [];
  let arrayP = [];
  let arrayI = [];
  for (let i = 0; i < listStage.length; i++) {
    stage.push(
      <Option key={listStage[i].idStage} value={listStage[i].name}>
        {listStage[i].name}
      </Option>
    );
  }
  for (let i = 0; i < listRegion.length; i++) {
    region.push(
      <Option key={listRegion[i].idRegion} value={listRegion[i].name}>
        {listRegion[i].name}
      </Option>
    );
  }
  for (let i = 0; i < listProvince.length; i++) {
    province.push(
      <Option key={listProvince[i].idProvince} value={listProvince[i].name}>
        {listProvince[i].name}
      </Option>
    );
  }
  for (let i = 0; i < listIndustry.length; i++) {
    industry.push(
      <Option key={listIndustry[i].idIndustry} value={listIndustry[i].name}>
        {listIndustry[i].name}
      </Option>
    );
  }

  const handleChangeStage = (value, action) => {
    for (let i = 0; i < action.length; i++) {
      arrayS.push(Number(action[i].key));
    }
    props.setSelectedStage(arrayS);
    props.setSelectedS(value);
  };

  const handleChangeRegion = (value, action) => {
    for (let i = 0; i < action.length; i++) {
      arrayR.push(Number(action[i].key));
    }
    props.setSelectedRegion(arrayR);
    props.setSelectedR(value);
  };
  const handleChangeProvince = (value, action) => {
    for (let i = 0; i < action.length; i++) {
      arrayP.push(Number(action[i].key));
    }
    props.setSelectedProvince(arrayP);
    props.setSelectedP(value);
  };
  const handleChangeIndustry = (value, action) => {
    for (let i = 0; i < action.length; i++) {
      arrayI.push(Number(action[i].key));
    }
    props.setSelectedIndustry(arrayI);
    props.setSelectedI(value);
  };
  const renderSelect = (placeholder, value, change, child) => {
    return (
      <Select
        mode="multiple"
        placeholder={placeholder}
        style={{ width: "100%" }}
        onChange={change}
        value={value}
        // maxTagCount="responsive"
      >
        {child}
      </Select>
    );
  };
  const handleFilterData = () => {
    const userLogin = getLocalStorage("userInfo");
    if (userLogin === null) {
      dispatch(
        getOrganizationFilter(
          props.selectedIndustry,
          props.selectedProvince,
          props.selectedRegion,
          props.selectedStage,
          `""`,
          true
        )
      );
    } else if (userLogin !== null) {
      dispatch(
        getOrganizationFilter(
          props.selectedIndustry,
          props.selectedProvince,
          props.selectedRegion,
          props.selectedStage,
          userLogin.gmail,
          true
        )
      );
    }
  };
  const handleClear = () => {
    props.setSelectedStage([]);
    props.setSelectedRegion([]);
    props.setSelectedProvince([]);
    props.setSelectedIndustry([]);
    props.setSelectedS([]);
    props.setSelectedR([]);
    props.setSelectedP([]);
    props.setSelectedI([]);
    arrayI = [];
    arrayP = [];
    arrayR = [];
    arrayS = [];
    const userLogin = getLocalStorage("userInfo");
    let tempIndustry = [];
    let tempProvince = [];
    let tempRegion = [];
    let tempStage = [];
    if (userLogin === null) {
      dispatch(
        getOrganizationFilter(
          tempIndustry,
          tempProvince,
          tempRegion,
          tempStage,
          `""`,
          true
        )
      );
    } else if (userLogin !== null) {
      dispatch(
        getOrganizationFilter(
          tempIndustry,
          tempProvince,
          tempRegion,
          tempStage,
          userLogin.gmail,
          true
        )
      );
    }
  };

  return (
    <div className="foc__wrapper">
      <div className="foc__container">
        <div className="foc__dislayGrid">
          <div className="box">
            <small className="label__fontWeight">Giai đoạn</small>
            {loading === true ? (
              <Skeleton.Input style={{ width: 120 }} active />
            ) : (
              renderSelect(
                "Chọn giai đoạn",
                props.selectedS,
                handleChangeStage,
                stage
              )
            )}
          </div>
          <div className="box">
            <small className="label__fontWeight">Tỉnh/thành</small>
            {loading === true ? (
              <Skeleton.Input style={{ width: 260 }} active />
            ) : (
              renderSelect(
                "Chọn tỉnh/thành",
                props.selectedP,
                handleChangeProvince,
                province
              )
            )}
          </div>
          <div className="box">
            <small className="label__fontWeight">Khu vực</small>
            {loading === true ? (
              <Skeleton.Input style={{ width: 260 }} active />
            ) : (
              renderSelect(
                "Chọn khu vục",
                props.selectedR,
                handleChangeRegion,
                region
              )
            )}
          </div>
          <div className="box">
            <small className="label__fontWeight">Lĩnh vực </small>
            {loading === true ? (
              <Skeleton.Input style={{ width: 440 }} active />
            ) : (
              renderSelect(
                "Chọn lĩnh vực",
                props.selectedI,
                handleChangeIndustry,
                industry
              )
            )}
            <div className="foc__button">
              <Button
                className="foc__ads"
                type="primary"
                onClick={handleFilterData}
              >
                Áp dụng
              </Button>
              <Button className="foc__ht" type="primary" onClick={handleClear}>
                Hoàn tác
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterOrganizationComponent;
