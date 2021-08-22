import axios from "axios";
import Swal from "sweetalert2";
import {
  GET_FREE_TIME_DETAIL_OF_ORGANIZATION_FAIL,
  GET_FREE_TIME_DETAIL_OF_ORGANIZATION_SUCCESS,
  GET_ALL_FREE_TIME_LIST_FAILED,
  GET_ALL_FREE_TIME_LIST_SUCCESS,
  GET_FREE_TIME_LIST_FAILED,
  GET_FREE_TIME_LIST_OF_ORGANIZATION_FAIL,
  GET_FREE_TIME_LIST_OF_ORGANIZATION_SUCCESS,
  GET_FREE_TIME_LIST_SUCCESS,
  GET_FREE_TIME_DETAIL_OF_INVESTOR_SUCCESS,
  GET_FREE_TIME_DETAIL_OF_INVESTOR_FAIL,
  GET_FREE_TIME_LIST_OF_INVESTOR_SUCCESS,
  GET_FREE_TIME_LIST_OF_INVESTOR_FAIL,
  GET_LIST_FREE_TIME_SUCCESS,
  GET_LIST_FREE_TIME_FAILED,
} from "../constants/freeTime.const";
import { authorizationAccount } from "../../assets/helper/helper";

export const postFreeTime = (freeTime) => {
  return (dispatch) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo.jwt;
    axios({
      method: "POST",
      url: "https://itrans2021.herokuapp.com/api/v1/free-time",
      data: freeTime,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 202) {
          Swal.fire({
            icon: "error",
            title: res.data,
            heightAuto: true,
            timerProgressBar: false,
            showConfirmButton: true,
            timer: 2000,
          });
        } else if (res.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Đăng ký thời gian rãnh thành công",
            heightAuto: true,
            timerProgressBar: false,
            showConfirmButton: true,
            confirmButtonText: "Đồng ý",
          }).then(async (result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Đăng ký thời gian rãnh thất bại",
          heightAuto: true,
          timerProgressBar: false,
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };
};

export const getFreeTimeList = (investor, month) => {
  return (dispatch) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo.jwt;
    axios({
      method: "GET",
      url: `https://itrans2021.herokuapp.com/api/v1/free-time?idInvestor=${investor}&month=${month}`,
      data: null,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(getFreeTimeListSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getFreeTimeListFailed(err));
      });
  };
};
export const getAllFreeTimeList = (investor) => {
  return (dispatch) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo.jwt;
    axios({
      method: "GET",
      url: `https://itrans2021.herokuapp.com/api/v1/all-free-time/${investor}`,
      data: null,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(getAllFreeTimeListSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getAllFreeTimeListFailed(err));
      });
  };
};

export const getValidateForButtonThem = (freeTime, investor) => {
  return async (dispatch) => {
    const token = authorizationAccount();

    const response = await axios({
      method: "GET",
      url: `https://itrans2021.herokuapp.com/api/v1/validate/free-time?dateTime=${freeTime}&idInvestor=${investor}`,
      data: {
        freeTime,
        investor,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
};

export const getValidateForButtonSubmit = (freeTime) => {
  return async (dispatch) => {
    const token = authorizationAccount();
    const response = await axios({
      method: "GET",
      url: `https://itrans2021.herokuapp.com/api/v1/validate/free-times?dateTimes=${freeTime}`,
      data: { freeTime },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
};

export const getListFreeTimeActive = (id) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: "GET",
      url: `https://itrans2021.herokuapp.com/api/v1/free-time-active?idInvestor=${id}`,
      data: id,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(getListFreeTimeActiveSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getListFreeTimeActiveFail(err));
      });
  };
};
const getListFreeTimeActiveSuccess = (listFreeTime) => {
  return {
    type: GET_LIST_FREE_TIME_SUCCESS,
    payload: listFreeTime,
  };
};

const getListFreeTimeActiveFail = (err) => {
  return {
    type: GET_LIST_FREE_TIME_FAILED,
    payload: err,
  };
};
const getAllFreeTimeListSuccess = (allFreeTimeList) => {
  return {
    type: GET_ALL_FREE_TIME_LIST_SUCCESS,
    payload: allFreeTimeList,
  };
};

const getAllFreeTimeListFailed = (err) => {
  return {
    type: GET_ALL_FREE_TIME_LIST_FAILED,
    payload: err,
  };
};

const getFreeTimeListSuccess = (freeTimeList) => {
  return {
    type: GET_FREE_TIME_LIST_SUCCESS,
    payload: freeTimeList,
  };
};

const getFreeTimeListFailed = (err) => {
  return {
    type: GET_FREE_TIME_LIST_FAILED,
    payload: err,
  };
};

export const getFreeTimeListOfOrganization = (organization) => {
  return (dispatch) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo.jwt;
    axios({
      method: "GET",
      url: `https://itrans2021.herokuapp.com/api/v1/view-schedule-organization-by-week?idOrganization=${organization}`,
      data: null,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(getFreeTimeListOfOrganizationSucess(res.data));
      })
      .catch((err) => {
        dispatch(getFreeTimeListOfOrganizationFail(err));
      });
  };
};

const getFreeTimeListOfOrganizationSucess = (listFreeTimeOfOrganization) => {
  return {
    type: GET_FREE_TIME_LIST_OF_ORGANIZATION_SUCCESS,
    payload: listFreeTimeOfOrganization,
  };
};

const getFreeTimeListOfOrganizationFail = (err) => {
  return {
    type: GET_FREE_TIME_LIST_OF_ORGANIZATION_FAIL,
    payload: err,
  };
};

export const getFreeTimeDetailOfOrganization = (detail) => {
  return (dispatch) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo.jwt;
    axios({
      method: "GET",
      url: `https://itrans2021.herokuapp.com/api/v1/schedule/get-all/` + detail,
      data: null,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(getFreeTimeListDetailOfOrganizationSucess(res.data));
      })
      .catch((err) => {
        dispatch(getFreeTimeListDetailOfOrganizationFail(err));
      });
  };
};
const getFreeTimeListDetailOfOrganizationSucess = (
  listFreeTimeOfOrganization
) => {
  return {
    type: GET_FREE_TIME_DETAIL_OF_ORGANIZATION_SUCCESS,
    payload: listFreeTimeOfOrganization,
  };
};

const getFreeTimeListDetailOfOrganizationFail = (err) => {
  return {
    type: GET_FREE_TIME_DETAIL_OF_ORGANIZATION_FAIL,
    payload: err,
  };
};

export const getFreeTimeDetailOfInvestor = (detail) => {
  return (dispatch) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo.jwt;
    axios({
      method: "GET",
      url:
        `https://itrans2021.herokuapp.com/api/v1/schedule/get-all-investor/` +
        detail,
      data: null,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(getFreeTimeListDetailOfInvestorSucess(res.data));
      })
      .catch((err) => {
        dispatch(getFreeTimeListDetailOfInvestorFail(err));
      });
  };
};
const getFreeTimeListDetailOfInvestorSucess = (listFreeTimeOfInvestor) => {
  return {
    type: GET_FREE_TIME_DETAIL_OF_INVESTOR_SUCCESS,
    payload: listFreeTimeOfInvestor,
  };
};

const getFreeTimeListDetailOfInvestorFail = (err) => {
  return {
    type: GET_FREE_TIME_DETAIL_OF_INVESTOR_FAIL,
    payload: err,
  };
};

export const getFreeTimeListOfInvestor = (investor) => {
  return (dispatch) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo.jwt;
    axios({
      method: "GET",
      url: `https://itrans2021.herokuapp.com/api/v1/view-schedule-investor-by-week?idInvestor=${investor}`,
      data: null,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(getFreeTimeListOfInvestorSucess(res.data));
      })
      .catch((err) => {
        dispatch(getFreeTimeListOfInvestorFail(err));
      });
  };
};

const getFreeTimeListOfInvestorSucess = (listFreeTimeOfInvestor) => {
  return {
    type: GET_FREE_TIME_LIST_OF_INVESTOR_SUCCESS,
    payload: listFreeTimeOfInvestor,
  };
};

const getFreeTimeListOfInvestorFail = (err) => {
  return {
    type: GET_FREE_TIME_LIST_OF_INVESTOR_FAIL,
    payload: err,
  };
};
