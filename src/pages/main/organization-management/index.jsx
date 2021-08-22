import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import message from "../../../assets/message/text";
import { getOrganizationFilter } from "../../../store/action/organization.action";
import OrganizationManagementComponent from "../../../components/organization-management";
import "./styles.scss";
import { checkRoleUser, getLocalStorage } from "../../../assets/helper/helper";
import {
  getListIndustry,
  getListProvince,
  getListRegion,
  getListStage,
} from "../../../store/action/register.action";
import NotAuth from "../../error/auth";
import Images from "../../../assets/images/images";
function OrganizationManagement(props) {
  const dispatch = useDispatch();
  const getData = (isLoading) => {
    const arrayIndustry = [0];
    const arrayProvince = [0];
    const arrayRegion = [0];
    const arrayStage = [0];
    const userLogin = getLocalStorage("userInfo");
    if (userLogin === null) {
      dispatch(
        getOrganizationFilter(
          arrayIndustry,
          arrayProvince,
          arrayRegion,
          arrayStage,
          `""`
        )
      );
    } else if (userLogin !== null) {
      dispatch(
        getOrganizationFilter(
          arrayIndustry,
          arrayProvince,
          arrayRegion,
          arrayStage,
          userLogin.gmail,
          isLoading
        )
      );
    }
    dispatch(getListStage());
    dispatch(getListProvince());
    dispatch(getListRegion());
    dispatch(getListIndustry());
  };
  useEffect(() => {
    getData();
  }, []);
  if (getLocalStorage("userInfo") === null) {
    return <NotAuth />;
  } else if (
    checkRoleUser() === "ADMIN" ||
    checkRoleUser() === "ORGANIZATION"
  ) {
    return <NotAuth />;
  } else {
    return (
      <div className="om__wrapper">
        <div className="om__banner">
          <img className="om__img" src={Images.BANNER_ORG} alt="banner" />
          <div className="om__titleWrapper">
            <div className="om__titleSolo">
              <div className="om__title">{message.OM_TITLE}</div>
              <div className="om__slo">
                Tìm kiếm tổ chức khởi nghiệp bạn yêu thích, trở thành Nhà đầu tư
                và cùng nhau đi đến thành công.
              </div>
              <div className="om__slogan">
                "{message.OM_SLOGAN}" {message.OM_SLOGAN_TAIL}
              </div>
            </div>
          </div>
        </div>
        <OrganizationManagementComponent getData={getData} />
      </div>
    );
  }
}

export default OrganizationManagement;
