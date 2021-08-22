import React from "react";
import "./styles.scss";
import ModalAccountInvestor from "./modal-inv";
import ModalAccountOrganization from "./modal-org";
function ModalAccountHome(props) {
  const checkRole = props.data.hasOwnProperty("idInvestor");
  if (checkRole === true) {
    return (
      <ModalAccountInvestor
        open={props.openEdit}
        close={props.close}
        data={props.data}
        //
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
        setBasicInfo={props.setBasicInfo}
        basicInfoIn={props.basicInfoIn}
        //
        handleChangeIType={props.handleChangeIType}
        handleChangeStage={props.handleChangeStage}
        handleChangeRegion={props.handleChangeRegion}
        handleChangeProvince={props.handleChangeProvince}
        handleChangeIndustry={props.handleChangeIndustry}
        handleChangeValue={props.handleChangeValue}
        handleChangeHead={props.handleChangeHead}
        handleClickUpdateIn={props.handleClickUpdateIn}
        // error
        logoError={props.logoError}
        nameError={props.nameError}
        numberOfEmpError={props.numberOfEmpError}
        foundedYearError={props.foundedYearError}
        websiteError={props.websiteError}
        minInvestmentError={props.minInvestmentError}
        maxInvestmentError={props.maxInvestmentError}
        stageError={props.stageError}
        regionError={props.regionError}
        provinceError={props.provinceError}
        industryError={props.industryError}
        typeError={props.typeError}
        //
        setLogoError={props.setLogoError}
        // blur
        handleBlurName={props.handleBlurName}
        handleBlurEmp={props.handleBlurEmp}
        handleBlurYear={props.handleBlurYear}
        handleBlurLink={props.handleBlurLink}
        handleBlurType={props.handleBlurType}
        handleBlurIndus={props.handleBlurIndus}
        handleBlurPro={props.handleBlurPro}
        handleBlurRe={props.handleBlurRe}
        handleBlurStage={props.handleBlurStage}
        handleBlurMin={props.handleBlurMin}
        handleBlurMax={props.handleBlurMax}
      />
    );
  } else {
    return (
      <ModalAccountOrganization
        open={props.openEdit}
        close={props.close}
        data={props.data}
        avataError={props.avataError}
        setAvataError={props.setAvataError}
        //
        handleChangeProvince={props.handleChangeProvince}
        handleChangeIndustry={props.handleChangeIndustry}
        handleChangeValue={props.handleChangeValue}
        handleChangeCurrent={props.handleChangeCurrent}
        handleUpdateOrg={props.handleUpdateOrg}
        //
        arrayIndustry={props.arrayIndustry}
        arrayIn={props.arrayIn}
        arrayProvince={props.arrayProvince}
        arayPro={props.arayPro}
        //
        //
        setBasicInfo={props.setBasicInfo}
        basicInfoIn={props.basicInfoIn}
        //
        logoError={props.logoError}
        nameError={props.nameError}
        numberOfEmpError={props.numberOfEmpError}
        foundedYearError={props.foundedYearError}
        websiteError={props.websiteError}
        provinceError={props.provinceError}
        industryError={props.industryError}
        //
        setLogoError={props.setLogoError}
        //
        handleBlurName={props.handleBlurName}
        handleBlurEmp={props.handleBlurEmp}
        handleBlurYear={props.handleBlurYear}
        handleBlurLink={props.handleBlurLink}
        handleBlurIndus={props.handleBlurIndus}
        handleBlurPro={props.handleBlurPro}
        //
        userStage={props.userStage}
      />
    );
  }
}

export default ModalAccountHome;
