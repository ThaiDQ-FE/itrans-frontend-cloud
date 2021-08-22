import axios from "axios";
import {
  authorizationAccount,
  checkPathUrl,
  checkRoleUser,
  pathQuanLyTaiKhoan,
  sessionTimeOut,
  showMessage,
  showMessageHTML,
} from "../../assets/helper/helper";
import { defaultUrlAPI, defaultUrlAPIStringTemplate } from "../../configs/url";
import {
  GET_ORG_OR_INV_NOT_FOLLOW_FAILED,
  GET_ORG_OR_INV_NOT_FOLLOW_SUCCESS,
} from "../constants/interest.const";
import { getListFollowed, getListViewArticle } from "./artical.action";
import { getInvestorFilter, getInvestorFilterV2 } from "./investor.action";
import { startLoading, stopLoading } from "./loading.action";
import { getOrganizationFilter } from "./organization.action";

export const postFollow = (object, objectDispath, name, history) => {
  return (dispatch) => {
    axios({
      method: "POST",
      url: defaultUrlAPI() + "follow",
      data: object,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          const path = window.location.pathname;
          if (path === "/") {
            if (checkRoleUser() === "INVESTOR") {
              showMessageHTML("success", name, "Đã được theo dõi thành công");
            } else {
              showMessageHTML("success", name, "Đã được theo dõi thành công");
            }
            dispatch(getListViewArticle(object.follow, true));
            dispatch(getOrgOrInvNotFollow(object.follow, false));
          } else {
            if (checkRoleUser() === "ORGANIZATION") {
              dispatch(
                getInvestorFilterV2(
                  objectDispath.amount,
                  objectDispath.listHead,
                  objectDispath.listIndus,
                  objectDispath.listPro,
                  objectDispath.listStages,
                  objectDispath.listType,
                  object.follow,
                  false
                )
              );
            } else {
              dispatch(
                getOrganizationFilter(
                  objectDispath.arrayIndustry,
                  objectDispath.arrayProvince,
                  objectDispath.arrayRegion,
                  objectDispath.arrayStage,
                  object.follow,
                  false
                )
              );
            }
          }
        }
      })
      .catch((err) => {
        sessionTimeOut(err, history);
      });
  };
};

export const putUnfollow = (object, objectDispath, history) => {
  return (dispatch) => {
    axios({
      method: "PUT",
      url: defaultUrlAPI() + "unfollow",
      data: object,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          if (checkPathUrl() === pathQuanLyTaiKhoan()) {
            dispatch(getListFollowed(object.follow, false));
          } else {
            if (checkRoleUser() === "ORGANIZATION") {
              dispatch(
                getInvestorFilterV2(
                  objectDispath.amount,
                  objectDispath.listHead,
                  objectDispath.listIndus,
                  objectDispath.listPro,
                  objectDispath.listStages,
                  objectDispath.listType,
                  object.follow,
                  false
                )
              );
            } else {
              dispatch(
                getOrganizationFilter(
                  objectDispath.arrayIndustry,
                  objectDispath.arrayProvince,
                  objectDispath.arrayRegion,
                  objectDispath.arrayStage,
                  object.follow,
                  false
                )
              );
            }
          }
        }
      })
      .catch((err) => {
        sessionTimeOut(err, history);
      });
  };
};

export const getOrgOrInvNotFollow = (gmail, isLoading) => {
  return (dispatch) => {
    if (isLoading === true) {
      dispatch(startLoading());
    }
    axios({
      method: "GET",
      url: defaultUrlAPIStringTemplate() + `get-org-inv?gmail=${gmail}`,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        dispatch(stopLoading());
        if (res.status === 200) {
          dispatch(getOrgOrInvNotFollowSuccess(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
        dispatch(getOrgOrInvNotFollowFailed(err));
      });
  };
};

const getOrgOrInvNotFollowSuccess = (list) => {
  return {
    type: GET_ORG_OR_INV_NOT_FOLLOW_SUCCESS,
    payload: list,
  };
};

const getOrgOrInvNotFollowFailed = (err) => {
  return {
    type: GET_ORG_OR_INV_NOT_FOLLOW_FAILED,
    payload: err,
  };
};
