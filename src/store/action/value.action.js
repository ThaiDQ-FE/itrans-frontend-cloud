import axios from "axios";
import { defaultUrlAPIAuth } from "../../configs/url";
import {
  GET_VALUE_LIST_INDUSTRY_FAILED,
  GET_VALUE_LIST_INDUSTRY_SUCCESS,
  GET_VALUE_LIST_PROVINCE_FAILED,
  GET_VALUE_LIST_PROVINCE_SUCCESS,
  GET_VALUE_LIST_REGION_FAILED,
  GET_VALUE_LIST_REGION_SUCCESS,
  GET_VALUE_LIST_STAGE_FAILED,
  GET_VALUE_LIST_STAGE_SUCCESS,
} from "../constants/value.const";
import { startLoading, stopLoading } from "./loading.action";

//stage
export const getValueListStage = (path) => {
  return (dispatch) => {
    if (path === "Admin-stage") {
      dispatch(startLoading());
    }
    axios({
      method: "Get",
      url: defaultUrlAPIAuth() + "get-stage",
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(getValueListStageSuccess(res.data));
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getValueListStageFailed(err));
      });
  };
};

const getValueListStageSuccess = (listStage) => {
  return {
    type: GET_VALUE_LIST_STAGE_SUCCESS,
    payload: listStage,
  };
};
const getValueListStageFailed = (err) => {
  return {
    type: GET_VALUE_LIST_STAGE_FAILED,
    payload: err,
  };
};
// industry
export const getValueListIndustry = (path) => {
  return (dispatch) => {
    if (path === "Admin-industry") {
      dispatch(startLoading());
    }
    axios({
      method: "Get",
      url: defaultUrlAPIAuth() + "get-industry",
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(getValueListIndustrySuccess(res.data));
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getValueListIndustryFailed(err));
      });
  };
};
const getValueListIndustrySuccess = (listIndustry) => {
  return {
    type: GET_VALUE_LIST_INDUSTRY_SUCCESS,
    payload: listIndustry,
  };
};
const getValueListIndustryFailed = (err) => {
  return {
    type: GET_VALUE_LIST_INDUSTRY_FAILED,
    payload: err,
  };
};
//   province
export const getValueListProvince = (path) => {
  return (dispatch) => {
    if (path === "Admin-province") {
      dispatch(startLoading());
    }
    axios({
      method: "Get",
      url: defaultUrlAPIAuth() + "get-province",
    })
      .then((res) => {
        dispatch(getValueListProvinceSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getValueListProvinceFailed(err));
      });
  };
};

const getValueListProvinceSuccess = (province) => {
  return {
    type: GET_VALUE_LIST_PROVINCE_SUCCESS,
    payload: province,
  };
};
const getValueListProvinceFailed = (err) => {
  return {
    type: GET_VALUE_LIST_PROVINCE_FAILED,
    payload: err,
  };
};
//region
export const getValueListRegion = (path) => {
  return (dispatch) => {
    if (path === "Admin-region") {
      dispatch(startLoading());
    }
    axios({
      method: "GET",
      url: defaultUrlAPIAuth() + "get-region",
    })
      .then((res) => {
        dispatch(getValueListRegionSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getValueListRegionFailed(err));
      });
  };
};

const getValueListRegionSuccess = (listRegion) => {
  return {
    type: GET_VALUE_LIST_REGION_SUCCESS,
    payload: listRegion,
  };
};

const getValueListRegionFailed = (err) => {
  return {
    type: GET_VALUE_LIST_REGION_FAILED,
    payload: err,
  };
};
