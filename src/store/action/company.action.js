import axios from "axios";
import {
  GET_DETAIL_COMPANY_FAILED,
  GET_DETAIL_COMPANY_SUCCESS,
  GET_DETAIL_COMPANY_VIEW_FAILED,
  GET_DETAIL_COMPANY_VIEW_SUCCESS,
} from "../constants/company.const";
import { startLoading, stopLoading } from "./loading.action";

export const getDeatilCompany = (gmail, isLoading) => {
  return (dispatch) => {
    if (isLoading === true) {
      dispatch(startLoading());
    }
    axios({
      method: "GET",
      url: `https://itrans2021.herokuapp.com/api/v1/auth/company/${gmail}`,
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(getDetailCompaySuccess(res.data));
        console.log(res);
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getDetaileCompanyFailed(err));
      });
  };
};

export const getDeatilCompanyView = (gmail, isLoading) => {
  return (dispatch) => {
    if (isLoading === true) {
      dispatch(startLoading());
    }
    axios({
      method: "GET",
      url: `https://itrans2021.herokuapp.com/api/v1/auth/company/${gmail}`,
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(getDetailCompayViewSuccess(res.data));
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getDetaileCompanyViewFailed(err));
      });
  };
};

const getDetailCompayViewSuccess = (detailCompany) => {
  return {
    type: GET_DETAIL_COMPANY_VIEW_SUCCESS,
    payload: detailCompany,
  };
};

const getDetaileCompanyViewFailed = (err) => {
  return {
    type: GET_DETAIL_COMPANY_VIEW_FAILED,
    payload: err,
  };
};

const getDetailCompaySuccess = (detailCompany) => {
  return {
    type: GET_DETAIL_COMPANY_SUCCESS,
    payload: detailCompany,
  };
};

const getDetaileCompanyFailed = (err) => {
  return {
    type: GET_DETAIL_COMPANY_FAILED,
    payload: err,
  };
};
