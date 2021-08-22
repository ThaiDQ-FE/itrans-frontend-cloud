import React, { useEffect, useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./styles.scss";
import logo from "../../assets/images/logo-grey.png";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Images from "../../assets/images/images";
import {
  authorizationAccount,
  checkEmailUser,
  checkIdUser,
  checkRoleUser,
  getLocalStorage,
  sessionTimeOut,
  showMessage,
} from "../../assets/helper/helper";
import { useDispatch, useSelector } from "react-redux";
import ModalAccountHome from "./modal-account";
import ModalResetAccountPass from "./modal-reset";
import {
  checkNew,
  checkOld,
  checkReNew,
} from "../../validate/changePass/rePass";
import { changePassword, userGetStage } from "../../store/action/user.action";
import Swal from "sweetalert2";
import {
  checkEmp,
  checkIndus,
  checkLink,
  checkMax,
  checkMin,
  checkName,
  checkPro,
  checkRe,
  checkStage,
  checkType,
  checkYear,
} from "../../validate/update/investor";
import { checkLinkWeb } from "../../configs/regex";
import axios from "axios";
import { defaultUrlAPI } from "../../configs/url";
import message from "../../assets/message/text";
import { getDeatilCompany } from "../../store/action/company.action";
import { Tooltip } from "antd";
import {
  getListIndustry,
  getListInvestorType,
  getListProvince,
  getListProvinceInvestor,
  getListRegion,
  getListRegionInvestor,
  getListStage,
} from "../../store/action/register.action";
function Header({ history }) {
  const { detailCompany } = useSelector((state) => state.detailCompany);
  const { listStage } = useSelector((state) => state.user);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openReset, setOpenReset] = useState(false);
  const [changePass, setChangePass] = useState({
    oldPassword: "",
    newPassword: "",
    reNew: "",
  });
  // error
  const [oldError, setOldError] = useState("");
  const [newError, setNewError] = useState("");
  const [reNewError, setReNewError] = useState("");
  //
  const [headQuater, setHeadQuater] = useState("");
  const [basicInfoIn, setBasicInfo] = useState({
    logo: "",
    name: "",
    numberOfEmp: "",
    foundedYear: "",
    website: "",
    idHeadQuarter: "",
    headQuarter: "",
    minInvestment: "",
    maxInvestment: "",
    currentStage: "",
    currentStageId: "",
    taxCode: "",
  });
  const [logoError, setLogoError] = useState("");
  const [nameError, setNameError] = useState("");
  const [numberOfEmpError, setNumberOfEmpError] = useState("");
  const [foundedYearError, setFoundedYearError] = useState("");
  const [websiteError, setWebsiteError] = useState("");
  const [minInvestmentError, setMinInvestmentError] = useState("");
  const [maxInvestmentError, setMaxInvestmentError] = useState("");
  const [stageError, setStageError] = useState("");
  const [regionError, setRegionError] = useState("");
  const [provinceError, setProvinceError] = useState("");
  const [industryError, setIndustryError] = useState("");
  const [typeError, setTypeError] = useState("");
  //
  const [arrayProvince, setArrayProvince] = useState([]);
  const [arayPro, setArayPro] = useState([]);
  const [arrayRegion, setArrayRegion] = useState([]);
  const [arrayRe, setArrayRe] = useState([]);
  const [arrayStage, setArrayStage] = useState([]);
  const [arrayS, setArrayS] = useState([]);
  const [arrayIndustry, setArrayIndustry] = useState([]);
  const [arrayIn, setArrayIn] = useState([]);
  const [arrayInvestorType, setArrayInvestorType] = useState([]);
  const [arrayInv, setArrayInv] = useState([]);
  //
  useEffect(() => {
    dispatch(getListProvince());
    dispatch(getListRegion());
    dispatch(getListIndustry());
    dispatch(getListStage());
    dispatch(getListInvestorType());
    if (checkRoleUser() === "ORGANIZATION") {
      dispatch(userGetStage(checkIdUser(), history));
    }
  }, []);
  //
  const handleCloseMenu = () => {
    setOpenMenu(null);
  };
  const handleCloseModal = () => {
    setOpenReset(false);
    setOpenEdit(false);
    setChangePass({
      oldPassword: "",
      newPassword: "",
      reNew: "",
    });
    setOldError("");
    setNewError("");
    setReNewError("");
    //
    setArrayInv([]);
    setArrayInvestorType([]);
    setArrayIndustry([]);
    setArrayIn([]);
    setArrayProvince([]);
    setArayPro([]);
    setArrayRegion([]);
    setArrayRe([]);
    setArrayStage([]);
    setArrayS([]);
    //
    setBasicInfo({
      logo: "",
      name: "",
      numberOfEmp: "",
      foundedYear: "",
      website: "",
      idHeadQuarter: "",
      headQuarter: "",
      minInvestment: "",
      maxInvestment: "",
      currentStage: "",
      currentStageId: "",
    });
    setLogoError("");
    setNameError("");
    setNumberOfEmpError("");
    setFoundedYearError("");
    setWebsiteError("");
    setMinInvestmentError("");
    setMaxInvestmentError("");
    setStageError("");
    setRegionError("");
    setProvinceError("");
    setIndustryError("");
    setTypeError("");
    setHeadQuater("");
  };
  const handleOpenModalResetPass = () => {
    setOpenMenu(null);
    setOpenReset(true);
  };
  const handleOpenMenu = (event) => {
    setOpenMenu(event.currentTarget);
  };

  const handleOpenModal = () => {
    setOpenMenu(null);
    setOpenEdit(true);
    for (let i = 0; i < detailCompany.industries.length; i++) {
      arrayIndustry.push(detailCompany.industries[i].idIndustry);
      arrayIn.push(detailCompany.industries[i].name);
    }
    for (let i = 0; i < detailCompany.provinces.length; i++) {
      arrayProvince.push(detailCompany.provinces[i].idProvince);
      arayPro.push(detailCompany.provinces[i].name);
    }
    let url =
      "https://itrans2021.herokuapp.com/api/v1/auth/get-region-investor?";
    let urlNone = "";
    arrayProvince.map((value, index) => {
      let params = `idProvince=${value}`;
      if (index === arrayProvince.length - 1) {
        urlNone = urlNone + params;
      } else {
        urlNone = urlNone + params + `&`;
      }
    });
    dispatch(getListRegionInvestor(url, urlNone));
    if (checkRoleUser() === "INVESTOR") {
      for (let i = 0; i < detailCompany.investorTypes.length; i++) {
        arrayInvestorType.push(detailCompany.investorTypes[i].idInvestorType);
        arrayInv.push(detailCompany.investorTypes[i].name);
      }
      for (let i = 0; i < detailCompany.regions.length; i++) {
        arrayRegion.push(detailCompany.regions[i].idRegion);
        arrayRe.push(detailCompany.regions[i].name);
      }
      let url =
        "https://itrans2021.herokuapp.com/api/v1/auth/get-province-investor?";
      let urlNone = "";
      arrayRegion.map((value, index) => {
        let params = `idRegion=${value}`;
        if (index === arrayRegion.length - 1) {
          urlNone = urlNone + params;
        } else {
          urlNone = urlNone + params + `&`;
        }
      });
      dispatch(getListProvinceInvestor(url, urlNone));

      for (let i = 0; i < detailCompany.stages.length; i++) {
        arrayStage.push(detailCompany.stages[i].idStage);
        arrayS.push(detailCompany.stages[i].name);
      }
    }
    setBasicInfo({
      logo: detailCompany.logo,
      name: detailCompany.name,
      numberOfEmp: detailCompany.numberOfEmp,
      foundedYear: detailCompany.foundedYear,
      website: detailCompany.website,
      headQuarter: detailCompany.headQuarter,
      idHeadQuarter: detailCompany.idHeadQuarter,
      minInvestment: detailCompany.minInvestment,
      maxInvestment: detailCompany.maxInvestment,
      currentStage: detailCompany.currentStage,
      currentStageId: detailCompany.idCurrentStage,
      taxCode: detailCompany.taxCode,
    });
    setHeadQuater(detailCompany.idHeadQuarter);
  };
  const handleChangeValue = (event) => {
    const { name, value } = event.target;
    setBasicInfo({
      ...basicInfoIn,
      [name]: value,
    });
  };
  const handleChangeIType = (value, action) => {
    let array = [];
    for (let i = 0; i < action.length; i++) {
      array.push(Number(action[i].key));
    }
    if (array.length > 5) {
      setArrayInvestorType(array);
      setArrayInv(value);
    } else {
      setArrayInvestorType(array);
      setArrayInv(value);
    }
  };
  const handleChangeIndustry = (value, action) => {
    let array = [];
    for (let i = 0; i < action.length; i++) {
      array.push(Number(action[i].key));
    }
    if (array.length > 5) {
      setArrayIndustry(array);
      setArrayIn(value);
    } else {
      setArrayIndustry(array);
      setArrayIn(value);
    }
  };
  const handleChangeProvince = (value, action) => {
    let array = [];
    for (let i = 0; i < action.length; i++) {
      array.push(Number(action[i].key));
    }
    if (array.length > 5) {
      setArrayProvince(array);
      setArayPro(value);
    } else {
      setArrayProvince(array);
      setArayPro(value);
    }
    let url =
      "https://itrans2021.herokuapp.com/api/v1/auth/get-region-investor?";
    let urlNone = "";
    array.map((value, index) => {
      let params = `idProvince=${value}`;
      if (index === array.length - 1) {
        urlNone = urlNone + params;
      } else {
        urlNone = urlNone + params + `&`;
      }
    });
    dispatch(getListRegionInvestor(url, urlNone));
  };
  const handleChangeRegion = (value, action) => {
    let array = [];
    for (let i = 0; i < action.length; i++) {
      array.push(Number(action[i].key));
    }
    let url =
      "https://itrans2021.herokuapp.com/api/v1/auth/get-province-investor?";
    let urlNone = "";
    array.map((value, index) => {
      let params = `idRegion=${value}`;
      if (index === array.length - 1) {
        urlNone = urlNone + params;
      } else {
        urlNone = urlNone + params + `&`;
      }
    });
    dispatch(getListProvinceInvestor(url, urlNone));
    if (array.length > 5) {
      setArrayRegion(array);
      setArrayRe(value);
    } else {
      setArrayRegion(array);
      setArrayRe(value);
    }
  };
  const handleChangeStage = (value, action) => {
    let array = [];
    for (let i = 0; i < action.length; i++) {
      array.push(Number(action[i].key));
    }
    if (array.length > 5) {
      setArrayStage(array);
      setArrayS(value);
    } else {
      setArrayStage(array);
      setArrayS(value);
    }
  };
  const handleChangeHead = (value) => {
    setBasicInfo({
      ...basicInfoIn,
      idHeadQuarter: value,
    });
  };

  const handleChangeCurrent = (value) => {
    console.log(value);
    setBasicInfo({
      ...basicInfoIn,
      currentStageId: value,
    });
  };

  const handleChangePass = (event) => {
    const { name, value } = event.target;
    setChangePass({
      ...changePass,
      [name]: value,
    });
  };
  // blur
  const handleBlurOld = () => {
    checkOld(changePass.oldPassword, setOldError);
  };
  const handleBlurNew = () => {
    checkNew(changePass.newPassword, setNewError);
  };
  const handleBlurOReNew = () => {
    checkReNew(changePass.reNew, setReNewError, changePass.newPassword);
  };
  const handleBlurName = () => {
    checkName(basicInfoIn.name, setNameError);
  };
  const handleBlurEmp = () => {
    checkEmp(basicInfoIn.numberOfEmp, setNumberOfEmpError);
  };
  const handleBlurYear = () => {
    checkYear(basicInfoIn.foundedYear, setFoundedYearError);
  };
  const handleBlurLink = () => {
    checkLink(basicInfoIn.website, setWebsiteError);
  };
  const handleBlurType = () => {
    checkType(arrayInvestorType, setTypeError);
  };
  const handleBlurIndus = () => {
    checkIndus(arrayIndustry, setIndustryError);
  };
  const handleBlurPro = () => {
    checkPro(arrayProvince, setProvinceError, arrayRegion);
  };
  const handleBlurRe = () => {
    checkRe(arrayRegion, setRegionError, arrayProvince);
  };
  const handleBlurStage = () => {
    checkStage(arrayStage, setStageError);
  };
  const handleBlurMin = () => {
    checkMin(basicInfoIn.minInvestment, setMinInvestmentError);
  };
  const handleBlurMax = () => {
    checkMax(
      basicInfoIn.minInvestment,
      basicInfoIn.maxInvestment,
      setMaxInvestmentError
    );
  };
  const handleClickUpdateIn = () => {
    checkName(basicInfoIn.name, setNameError);
    checkEmp(basicInfoIn.numberOfEmp, setNumberOfEmpError);
    checkYear(basicInfoIn.foundedYear, setFoundedYearError);
    checkLink(basicInfoIn.website, setWebsiteError);
    checkType(arrayInvestorType, setTypeError);
    checkIndus(arrayIndustry, setIndustryError);
    checkPro(arrayProvince, setProvinceError, arrayRegion);
    checkRe(arrayRegion, setRegionError, arrayProvince);
    checkStage(arrayStage, setStageError);
    checkMin(basicInfoIn.minInvestment, setMinInvestmentError);
    checkMax(
      basicInfoIn.minInvestment,
      basicInfoIn.maxInvestment,
      setMaxInvestmentError
    );
    if (
      logoError === "" &&
      nameError === "" &&
      numberOfEmpError === "" &&
      foundedYearError === "" &&
      websiteError === "" &&
      typeError === "" &&
      industryError === "" &&
      provinceError === "" &&
      regionError === "" &&
      stageError === "" &&
      maxInvestmentError === "" &&
      minInvestmentError === "" &&
      arrayIndustry.length !== 0 &&
      arrayInvestorType.length !== 0 &&
      Number(basicInfoIn.minInvestment) < Number(basicInfoIn.maxInvestment) &&
      arrayStage.length !== 0 &&
      (arrayProvince.length !== 0 || arrayRegion.length !== 0)
    ) {
      const object = {
        foundedYear: Number(basicInfoIn.foundedYear),
        idHeadQuarter: basicInfoIn.idHeadQuarter,
        idIndustries: arrayIndustry,
        idInvestor: checkIdUser(),
        idInvestorType: arrayInvestorType,
        idProvinces: arrayProvince,
        idRegions: arrayRegion,
        idStages: arrayStage,
        logo: basicInfoIn.logo,
        maxInvestment: Number(basicInfoIn.maxInvestment).toFixed(2),
        minInvestment: Number(basicInfoIn.minInvestment).toFixed(2),
        name: basicInfoIn.name,
        numberOfEmp: Number(basicInfoIn.numberOfEmp),
        website: basicInfoIn.website,
        taxCode: basicInfoIn.taxCode,
      };
      handleUpdateInvestor(object);
      console.log(object);
    }
  };
  const handleUpdateOrg = () => {
    handleBlurName();
    handleBlurEmp();
    handleBlurYear();
    handleBlurLink();
    handleBlurIndus();
    handleBlurPro();
    if (
      logoError === "" &&
      nameError === "" &&
      numberOfEmpError === "" &&
      foundedYearError === "" &&
      websiteError === "" &&
      industryError === "" &&
      provinceError === "" &&
      arrayIndustry.length !== 0 &&
      arrayProvince.length !== 0
    ) {
      const object = {
        foundedYear: Number(basicInfoIn.foundedYear),
        idIndustries: arrayIndustry,
        idOrganization: checkIdUser(),
        idProvinces: arrayProvince,
        idStage: basicInfoIn.currentStageId,
        logo: basicInfoIn.logo,
        name: basicInfoIn.name,
        numberOfEmp: Number(basicInfoIn.numberOfEmp),
        website: basicInfoIn.website,
        taxCode: basicInfoIn.taxCode,
      };
      handleUpdateOrganization(object);
      console.log(object);
    }
  };
  const handleUpdateOrganization = (object) => {
    axios({
      method: "PUT",
      url: defaultUrlAPI() + "organization",
      data: object,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          handleCloseModal();
          showMessage("success", "Cập nhật thông tin tài khoản thành công");
          dispatch(getDeatilCompany(checkEmailUser(), false));
        } else {
          showMessage("error", "Cập nhật thông tin tài khoản thất bại");
        }
      })
      .catch((err) => {
        sessionTimeOut(err, history);
      });
  };
  const handleUpdateInvestor = (object) => {
    axios({
      method: "PUT",
      url: defaultUrlAPI() + "investor",
      data: object,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          handleCloseModal();
          showMessage("success", "Cập nhật thông tin tài khoản thành công");
          dispatch(getDeatilCompany(checkEmailUser(), false));
        } else {
          showMessage("error", "Cập nhật thông tin tài khoản thất bại");
        }
      })
      .catch((err) => {
        sessionTimeOut(err, history);
      });
  };
  //
  const handleChangePassClick = () => {
    handleBlurOld();
    handleBlurNew();
    handleBlurOReNew();
    if (
      changePass.oldPassword !== "" &&
      changePass.newPassword !== "" &&
      changePass.reNew !== ""
    ) {
      Swal.fire({
        icon: "question",
        title: "Bạn chắc chắn muốn đổi mật khẩu ?",
        heightAuto: true,
        timerProgressBar: false,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        confirmButtonColor: "#1890ff",
        cancelButtonColor: "red",
      }).then((result) => {
        if (result.isConfirmed) {
          const object = {
            gmail: checkEmailUser(),
            newPassword: changePass.newPassword,
            oldPassword: changePass.oldPassword,
          };
          dispatch(changePassword(object, history));
        }
      });
    }
  };
  const handleLogoutAccount = () => {
    setOpenMenu(null);
    localStorage.removeItem("userInfo");
    history.push("/dang-nhap");
  };
  const renderTabs = () => {
    const userLogin = getLocalStorage("userInfo");
    if (userLogin !== null) {
      if (userLogin.role === "INVESTOR") {
        return (
          <>
            <li className="header__features__li">
              <NavLink
                activeClassName="active-mid"
                className="header__trangchu"
                to="/"
                exact={true}
              >
                Trang chủ
              </NavLink>
            </li>
            <li className="header__features__li">
              <NavLink
                activeClassName="active-mid"
                className="header__vgv"
                to="/to-chuc"
                exact={true}
              >
                Tổ chức khởi nghiệp
              </NavLink>
            </li>
            <li className="header__features__li">
              <NavLink
                activeClassName="active-mid"
                className="header__vgv"
                to="/vong-goi-von"
                exact={true}
              >
                Vòng gọi vốn
              </NavLink>
            </li>
          </>
        );
      } else if (userLogin.role === "ORGANIZATION") {
        return (
          <>
            <li className="header__features__li">
              <NavLink
                activeClassName="active-mid"
                className="header__trangchu"
                to="/"
                exact={true}
              >
                Trang chủ
              </NavLink>
            </li>
            <li className="header__features__li">
              <NavLink
                activeClassName="active-mid"
                className="header__vgv"
                to="/nha-dau-tu"
                exact={true}
              >
                Nhà đầu tư
              </NavLink>
            </li>
          </>
        );
      }
    }
  };
  console.log(checkLinkWeb.test(basicInfoIn.website));
  return (
    <div
      className={`header__container${
        getLocalStorage("userInfo") === null || checkRoleUser() === "ADMIN"
          ? " class_disable"
          : ""
      }`}
    >
      <div className="header__logo">
        <NavLink
          activeClassName="active-nav-link"
          className="header__navlink__dangky"
          to="/"
          exact={true}
        >
          <img src={logo} alt="logo" />
        </NavLink>
      </div>
      <div
        className={`header__features${
          checkRoleUser() === "ORGANIZATION" ? " header__featuresRole" : ""
        }`}
      >
        <ul className="header__features__ul">{renderTabs()}</ul>
      </div>
      <div className="header__login">
        {user !== null ? (
          <div className="header__logined" onClick={handleOpenMenu}>
            <img src={user !== null ? user.logo : ""} alt="" />
            <Tooltip title={user.name} placement="bottomRight">
              <span>{user !== null ? user.name : ""}</span>
            </Tooltip>
          </div>
        ) : (
          <ul className="header__login__ul">
            <li className="header__login__li">
              <NavLink
                activeClassName="active-nav-link"
                className="header__navlink__dangky"
                to="/dang-ky"
                exact={true}
              >
                Đăng ký
              </NavLink>
            </li>
            <li className="header__login__li">
              <NavLink
                activeClassName="active-nav-link"
                className="header__navlink__dangnhap"
                to="/dang-nhap"
                exact={true}
              >
                Đăng nhập
              </NavLink>
            </li>
          </ul>
        )}
      </div>
      <Menu
        id="simple-menu"
        anchorEl={openMenu}
        keepMounted
        open={Boolean(openMenu)}
        onClose={handleCloseMenu}
        className="menu__navbar"
      >
        <MenuItem>
          <NavLink
            activeClassName="active-nav-link"
            className="header__navlink__quanLyTaiKhoan"
            to="/quan-ly-tai-khoan"
            exact={false}
          >
            <div className="header__menuAccount">
              <img src={Images.BUILDINGS} alt="" />
              <span>Trang cá nhân</span>
            </div>
          </NavLink>
        </MenuItem>
        <hr className="header__hr" />
        <MenuItem>
          <div className="header__menuAccount" onClick={handleOpenModal}>
            <img src={Images.SETTING_COLOR} alt="" />
            <span>Chỉnh sửa thông tin</span>
          </div>
        </MenuItem>
        <hr className="header__hr" />
        <MenuItem>
          <div
            className="header__menuAccount"
            onClick={handleOpenModalResetPass}
          >
            <img src={Images.KEY} alt="" />
            <span>Đổi mật khẩu</span>
          </div>
        </MenuItem>
        <hr className="header__hr" />
        <MenuItem onClick={handleLogoutAccount}>
          <div className="header__menuLogout">
            <img src={Images.LOGOUT} alt="" />
            <span>Thoát</span>
          </div>
        </MenuItem>
      </Menu>
      <ModalAccountHome
        arrayProvince={arrayProvince}
        arayPro={arayPro}
        arrayRegion={arrayRegion}
        arrayRe={arrayRe}
        arrayStage={arrayStage}
        arrayS={arrayS}
        arrayIndustry={arrayIndustry}
        setArrayIn={setArrayIn}
        arrayIn={arrayIn}
        arrayInvestorType={arrayInvestorType}
        arrayInv={arrayInv}
        //
        openEdit={openEdit}
        close={handleCloseModal}
        data={detailCompany}
        // errror
        logoError={logoError}
        nameError={nameError}
        numberOfEmpError={numberOfEmpError}
        foundedYearError={foundedYearError}
        websiteError={websiteError}
        minInvestmentError={minInvestmentError}
        maxInvestmentError={maxInvestmentError}
        stageError={stageError}
        regionError={regionError}
        provinceError={provinceError}
        industryError={industryError}
        typeError={typeError}
        //
        setLogoError={setLogoError}
        //
        setBasicInfo={setBasicInfo}
        basicInfoIn={basicInfoIn}
        //
        handleChangeIType={handleChangeIType}
        handleChangeStage={handleChangeStage}
        handleChangeRegion={handleChangeRegion}
        handleChangeProvince={handleChangeProvince}
        handleChangeIndustry={handleChangeIndustry}
        handleChangeValue={handleChangeValue}
        handleChangeHead={handleChangeHead}
        handleChangeCurrent={handleChangeCurrent}
        handleClickUpdateIn={handleClickUpdateIn}
        handleUpdateOrg={handleUpdateOrg}
        // blur
        handleBlurName={handleBlurName}
        handleBlurEmp={handleBlurEmp}
        handleBlurYear={handleBlurYear}
        handleBlurLink={handleBlurLink}
        handleBlurType={handleBlurType}
        handleBlurIndus={handleBlurIndus}
        handleBlurPro={handleBlurPro}
        handleBlurRe={handleBlurRe}
        handleBlurStage={handleBlurStage}
        handleBlurMin={handleBlurMin}
        handleBlurMax={handleBlurMax}
        //
        userStage={listStage}
      />
      <ModalResetAccountPass
        handleChangePass={handleChangePass}
        open={openReset}
        close={handleCloseModal}
        handleBlurOld={handleBlurOld}
        handleBlurNew={handleBlurNew}
        handleBlurOReNew={handleBlurOReNew}
        oldError={oldError}
        newError={newError}
        reNewError={reNewError}
        handleChangePassClick={handleChangePassClick}
      />
    </div>
  );
}
export default withRouter(Header);
