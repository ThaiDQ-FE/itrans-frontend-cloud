import React, { useState } from "react";
import { Button, Modal, Input, Tooltip, Spin, Checkbox } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./styles.scss";
import ModalAccountOrganizationBasic from "./basic-info";
import ModalAccountOrganizationFunding from "./funding-info";
import { useSelector } from "react-redux";
function ModalAccountOrganization(props) {
  const { listProvince, listIndustry, listStage } = useSelector(
    (state) => state.register
  );
  const [loading, setLoading] = useState(false);
  const disable = () => {
    let boolen;
    if (
      props.logoError === "" &&
      props.nameError === "" &&
      props.numberOfEmpError === "" &&
      props.foundedYearError === "" &&
      props.websiteError === "" &&
      props.industryError === "" &&
      props.provinceError === ""
    ) {
      boolen = false;
    } else if (
      props.logoError === "" ||
      props.nameError === "" ||
      props.numberOfEmpError === "" ||
      props.foundedYearError === "" ||
      props.websiteError === "" ||
      props.industryError === "" ||
      props.provinceError === ""
    ) {
      boolen = true;
    }
    return boolen;
  };
  return (
    <Modal
      className="modalah__accountOrg"
      visible={props.open}
      maskClosable={true}
      footer={null}
      closable={true}
      destroyOnClose={true}
      onCancel={props.close}
    >
      <h2 style={{ textAlign: "center" }}>Cập nhật thông tin tài khoản</h2>
      <div className="modalo__wrapper">
        <div className="modalo__lineOne">
          <ModalAccountOrganizationBasic
            data={props.data}
            avataError={props.avataError}
            setAvataError={props.setAvataError}
            stage={listStage}
            setLogoError={props.setLogoError}
            loading={loading}
            setLoading={setLoading}
            //
            setBasicInfo={props.setBasicInfo}
            basicInfoIn={props.basicInfoIn}
            //
            logoError={props.logoError}
            nameError={props.nameError}
            numberOfEmpError={props.numberOfEmpError}
            foundedYearError={props.foundedYearError}
            websiteError={props.websiteError}
            //
            handleBlurName={props.handleBlurName}
            handleBlurEmp={props.handleBlurEmp}
            handleBlurYear={props.handleBlurYear}
            handleBlurLink={props.handleBlurLink}
            //
            handleChangeValue={props.handleChangeValue}
            handleChangeCurrent={props.handleChangeCurrent}
            //
            userStage={props.userStage}
          />
        </div>
        <hr className="modalo__hr" />
        <div className="modalo__lineTwo">
          <ModalAccountOrganizationFunding
            data={props.data}
            handleChangeProvince={props.handleChangeProvince}
            handleChangeIndustry={props.handleChangeIndustry}
            //
            arrayIndustry={props.arrayIndustry}
            arrayIn={props.arrayIn}
            arrayProvince={props.arrayProvince}
            arayPro={props.arayPro}
            //
            listProvince={listProvince}
            listIndustry={listIndustry}
            //
            handleBlurIndus={props.handleBlurIndus}
            handleBlurPro={props.handleBlurPro}
            //
            provinceError={props.provinceError}
            industryError={props.industryError}
          />
        </div>
        <div className="modalo__action">
          <Button
            className="modalo__update"
            type="primary"
            size="large"
            disabled={disable() === true || loading === true}
            onClick={props.handleUpdateOrg}
          >
            Cập nhật
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalAccountOrganization;
