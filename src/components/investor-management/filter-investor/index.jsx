import React, { useState } from "react";
import { Select, Button, Skeleton, Input } from "antd";
import "./styles.scss";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import { checkEmailUser, getLocalStorage } from "../../../assets/helper/helper";
import {
  getInvestorFilter,
  getInvestorFilterV2,
} from "../../../store/action/investor.action";
function FilterInvestorComponent(props) {
  const { listProvince, listInvestorType, listStage, listIndustry } =
    useSelector((state) => state.register);
  const { loading } = useSelector((state) => state.loading);
  const { Option } = Select;
  const dispatch = useDispatch();

  const head = [];
  const industry = [];
  const stage = [];
  const province = [];
  const type = [];
  let arrayIn = [];
  let arrayS = [];
  let arrayH = [];
  let arrayP = [];
  let arrayT = [];
  for (let i = 0; i < listProvince.length; i++) {
    head.push(
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
  for (let i = 0; i < listProvince.length; i++) {
    province.push(
      <Option key={listProvince[i].idProvince} value={listProvince[i].name}>
        {listProvince[i].name}
      </Option>
    );
  }
  for (let i = 0; i < listStage.length; i++) {
    stage.push(
      <Option key={listStage[i].idStage} value={listStage[i].name}>
        {listStage[i].name}
      </Option>
    );
  }
  for (let i = 0; i < listInvestorType.length; i++) {
    type.push(
      <Option
        key={listInvestorType[i].idInvestorType}
        value={listInvestorType[i].name}
      >
        {listInvestorType[i].name}
      </Option>
    );
  }
  const handleChangeHead = (value, action) => {
    for (let i = 0; i < action.length; i++) {
      arrayH.push(Number(action[i].key));
    }
    props.setSelectedHead(arrayH);
    props.setSelectedH(value);
  };
  const handleChangeIndustry = (value, action) => {
    for (let i = 0; i < action.length; i++) {
      arrayIn.push(Number(action[i].key));
    }
    props.setSelectedIndustry(arrayIn);
    props.setSelectedIn(value);
  };
  const handleChangeProvince = (value, action) => {
    for (let i = 0; i < action.length; i++) {
      arrayP.push(Number(action[i].key));
    }
    props.setSelectedProvince(arrayP);
    props.setSelectedP(value);
  };
  const handleChangeStage = (value, action) => {
    for (let i = 0; i < action.length; i++) {
      arrayS.push(Number(action[i].key));
    }
    props.setSelectedStage(arrayS);
    props.setSelectedS(value);
  };
  const handleChangeType = (value, action) => {
    for (let i = 0; i < action.length; i++) {
      arrayT.push(Number(action[i].key));
    }
    props.setSelectedType(arrayT);
    props.setSelectedT(value);
  };
  const renderSelect = (change, child, value) => {
    return (
      <Select
        loading={loading}
        mode="multiple"
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
        getInvestorFilterV2(
          props.amount,
          props.selectedHead,
          props.selectedIndustry,
          props.selectedProvince,
          props.selectedStage,
          props.selectedType,
          ` `,
          false
        )
      );
    } else if (userLogin !== null) {
      dispatch(
        getInvestorFilterV2(
          props.amount,
          props.selectedHead,
          props.selectedIndustry,
          props.selectedProvince,
          props.selectedStage,
          props.selectedType,
          checkEmailUser(),
          false
        )
      );
    }
  };
  const handleClear = () => {
    props.setSelectedP([]);
    props.setSelectedT([]);
    props.setAmount("");
    props.setSelectedHead([]);
    props.setSelectedH([]);
    props.setSelectedIndustry([]);
    props.setSelectedIn([]);
    props.setSelectedP([]);
    props.setSelectedStage([]);
    props.setSelectedS([]);
    props.setSelectedProvince([]);
    props.setSelectedType([]);
    props.setSelectedT([]);
    arrayIn = [];
    arrayS = [];
    arrayH = [];
    arrayP = [];
    arrayT = [];
    const userLogin = getLocalStorage("userInfo");
    let tempHead = [];
    let tempIndus = [];
    let tempProvince = [];
    let tempStage = [];
    let tempType = [];
    let tempAmount = NaN;
    if (userLogin === null) {
      dispatch(
        getInvestorFilter(
          tempAmount,
          tempHead,
          tempIndus,
          tempProvince,
          tempStage,
          tempType,
          ` `,
          false
        )
      );
    } else if (userLogin !== null) {
      dispatch(
        getInvestorFilterV2(
          tempAmount,
          tempHead,
          tempIndus,
          tempProvince,
          tempStage,
          tempType,
          checkEmailUser(),
          false
        )
      );
    }
  };
  return (
    <div className="filter__wrapper">
      <div className="filter__container">
        <div className="filter__displayGrid">
          <div className="box">
            <small className="label__fontWeight">Trụ sở chính</small>
            {renderSelect(handleChangeHead, head, props.selectedH)}
          </div>
          <div className="box">
            <small className="label__fontWeight">Lĩnh vực đầu tư</small>
            {renderSelect(handleChangeIndustry, industry, props.selectedIn)}
          </div>
          <div className="box">
            <small className="label__fontWeight">Khu vực đầu tư</small>
            {renderSelect(handleChangeProvince, province, props.selectedP)}
          </div>
          <div className="box">
            <small className="label__fontWeight">Giai đoạn đầu tư</small>
            {renderSelect(handleChangeStage, stage, props.selectedS)}
          </div>
          <div className="box">
            <small className="label__fontWeight">Loại nhà đầu tư</small>
            {renderSelect(handleChangeType, type, props.selectedT)}
          </div>
          <div className="box">
            <small className="label__fontWeight">Số tiền đầu tư</small>
            <Input
              type="number"
              addonAfter="Tỷ VNĐ"
              onChange={props.handleChangeAmount}
              value={props.amount}
            />
          </div>
          <div className="filter__button">
            <Button
              className="filter__ads"
              type="primary"
              onClick={handleFilterData}
            >
              Áp dụng
            </Button>
            <Button className="filter__ht" type="primary" onClick={handleClear}>
              Hoàn tác
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterInvestorComponent;
