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

const initialState = {
  listAllFreeTime: [],
  listFreeTime: [],
  listFreeTimeOfOrganization: [],
  errors: [],
  listFreeTimeDetailOfOrganization: [],
  listFreeTimeDetailOfInvestor: [],
  listFreeTimeOfInvestor: [],
  listFreeTimeByIdInvestor: [],
};

const freeTimeReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_FREE_TIME_LIST_SUCCESS:
      return { ...state, listFreeTime: payload };
    case GET_FREE_TIME_LIST_FAILED:
      return { ...state, errors: payload };
    case GET_FREE_TIME_LIST_OF_ORGANIZATION_SUCCESS:
      return { ...state, listFreeTimeOfOrganization: payload };
    case GET_FREE_TIME_LIST_OF_ORGANIZATION_FAIL:
      return { ...state, errors: payload };
    case GET_ALL_FREE_TIME_LIST_SUCCESS:
      return { ...state, listAllFreeTime: payload };
    case GET_ALL_FREE_TIME_LIST_FAILED:
      return { ...state, errors: payload };
    case GET_FREE_TIME_DETAIL_OF_ORGANIZATION_SUCCESS:
      return { ...state, listFreeTimeDetailOfOrganization: payload };
    case GET_FREE_TIME_DETAIL_OF_ORGANIZATION_FAIL:
      return { ...state, errors: payload };
    case GET_FREE_TIME_DETAIL_OF_INVESTOR_SUCCESS:
      return { ...state, listFreeTimeDetailOfInvestor: payload };
    case GET_FREE_TIME_DETAIL_OF_INVESTOR_FAIL:
      return { ...state, errors: payload };
    case GET_FREE_TIME_LIST_OF_INVESTOR_SUCCESS:
      return { ...state, listFreeTimeOfInvestor: payload };
    case GET_FREE_TIME_LIST_OF_INVESTOR_FAIL:
    case GET_LIST_FREE_TIME_SUCCESS:
      return { ...state, listFreeTimeByIdInvestor: payload };
    case GET_LIST_FREE_TIME_FAILED:
      return { ...state, errors: payload };
    default:
      return state;
  }
};

export default freeTimeReducer;
