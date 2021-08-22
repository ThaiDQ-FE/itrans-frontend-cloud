import React, { useState } from "react";
import { Button, Modal, Input, Tooltip, Spin, Checkbox } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./styles.scss";
import ModalAccountInvestorBasic from "./basic-info";
import { useSelector } from "react-redux";
import ModalAccountInvestorInvesment from "./investment-info";
function ModalAccountInvestor(props) {
  const {
    listProvince,
    listRegion,
    listStage,
    listIndustry,
    listInvestorType,
    listProvinceInvestor,
    listRegionInvestor,
  } = useSelector((state) => state.register);
  const [loading, setLoading] = useState(false);
  const disable = () => {
    let boolen;
    if (
      props.logoError === "" &&
      props.nameError === "" &&
      props.numberOfEmpError === "" &&
      props.foundedYearError === "" &&
      props.websiteError === "" &&
      props.typeError === "" &&
      props.industryError === "" &&
      props.stageError === "" &&
      props.maxInvestmentError === "" &&
      props.minInvestmentError === "" &&
      (props.provinceError === "" || props.regionError === "")
    ) {
      boolen = false;
    } else if (
      props.logoError === "" ||
      props.nameError === "" ||
      props.numberOfEmpError === "" ||
      props.foundedYearError === "" ||
      props.websiteError === "" ||
      props.typeError === "" ||
      props.industryError === "" ||
      props.provinceError === "" ||
      props.regionError === "" ||
      props.stageError === "" ||
      props.maxInvestmentError === "" ||
      props.minInvestmentError === "" ||
      (props.arrayProvince.length === 0 && props.arrayRegion.length === 0)
    ) {
      boolen = true;
    }
    return boolen;
  };
  return (
    <Modal
      className="modalah__accountInv"
      visible={props.open}
      maskClosable={true}
      footer={null}
      closable={true}
      destroyOnClose={true}
      onCancel={props.close}
    >
      <h2 style={{ textAlign: "center" }}>Cập nhật thông tin tài khoản</h2>
      <div className="modali__wrapper">
        <div className="modali__lineOne">
          <ModalAccountInvestorBasic
            data={props.data}
            loading={loading}
            setLoading={setLoading}
            listProvince={listProvince}
            setBasicInfo={props.setBasicInfo}
            basicInfoIn={props.basicInfoIn}
            handleChangeValue={props.handleChangeValue}
            handleChangeHead={props.handleChangeHead}
            //error
            logoError={props.logoError}
            nameError={props.nameError}
            numberOfEmpError={props.numberOfEmpError}
            foundedYearError={props.foundedYearError}
            websiteError={props.websiteError}
            //
            setLogoError={props.setLogoError}
            // blur
            handleBlurName={props.handleBlurName}
            handleBlurEmp={props.handleBlurEmp}
            handleBlurYear={props.handleBlurYear}
            handleBlurLink={props.handleBlurLink}
          />
        </div>
        <hr className="modali__hr" />
        <div className="modali__lineTwo">
          <ModalAccountInvestorInvesment
            data={props.data}
            arrayProvince={props.arrayProvince}
            arayPro={props.arayPro}
            arrayRegion={props.arrayRegion}
            arrayRe={props.arrayRe}
            arrayStage={props.arrayStage}
            arrayS={props.arrayS}
            arrayIndustry={props.arrayIndustry}
            arrayIn={props.arrayIn}
            arrayInvestorType={props.arrayInvestorType}
            arrayInv={props.arrayInv}
            //
            listProvince={listProvinceInvestor}
            listRegion={listRegionInvestor}
            listStage={listStage}
            listIndustry={listIndustry}
            listInvestorType={listInvestorType}
            //
            basicInfoIn={props.basicInfoIn}
            //
            handleChangeIType={props.handleChangeIType}
            handleChangeStage={props.handleChangeStage}
            handleChangeRegion={props.handleChangeRegion}
            handleChangeProvince={props.handleChangeProvince}
            handleChangeIndustry={props.handleChangeIndustry}
            handleChangeValue={props.handleChangeValue}
            //
            minInvestmentError={props.minInvestmentError}
            maxInvestmentError={props.maxInvestmentError}
            stageError={props.stageError}
            regionError={props.regionError}
            provinceError={props.provinceError}
            industryError={props.industryError}
            typeError={props.typeError}
            // blur
            handleBlurType={props.handleBlurType}
            handleBlurIndus={props.handleBlurIndus}
            handleBlurPro={props.handleBlurPro}
            handleBlurRe={props.handleBlurRe}
            handleBlurStage={props.handleBlurStage}
            handleBlurMin={props.handleBlurMin}
            handleBlurMax={props.handleBlurMax}
          />
        </div>
        <div className="modali__action">
          <Button
            className="modali__update"
            type="primary"
            size="large"
            onClick={props.handleClickUpdateIn}
            disabled={disable()}
          >
            Cập nhật
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalAccountInvestor;
