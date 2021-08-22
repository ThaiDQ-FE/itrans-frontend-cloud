import {
  CHECK_REQUEST_DEAL_FAILED,
  CHECK_REQUEST_DEAL_SUCCESS,
  GET_CURRENT_DEAL_CANCEL_FAIL,
  GET_CURRENT_DEAL_CANCEL_SUCCESS,
  GET_CURRENT_DEAL_DONE_FAIL,
  GET_CURRENT_DEAL_DONE_SUCCESS,
  GET_CURRENT_DEAL_FAILD,
  GET_CURRENT_DEAL_SUCCESS,
  GET_DEAL_BY_ID_FAILD,
  GET_DEAL_BY_ID_SUCCESS,
  GET_DETAIL_DEAL_FAIL,
  GET_DETAIL_DEAL_SUCCESS,
  GET_LIST_INVITE_FAILED,
  GET_LIST_INVITE_SUCCESS,
} from "../constants/deal.const";

const initialState = {
  listDeal: [],
  errors: [],
  listDealCurrent: [],
  listDealDone: [],
  listDealCancel: [],
  detailDeal: {},
  listInvite: [],
  checkDeal: null,
};

const dealReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_DEAL_BY_ID_SUCCESS:
      return { ...state, listDeal: payload };
    case GET_DEAL_BY_ID_FAILD:
      return { ...state, errors: payload };
    case GET_CURRENT_DEAL_SUCCESS:
      return { ...state, listDealCurrent: payload };
    case GET_CURRENT_DEAL_FAILD:
      return { ...state, errors: payload };
    case GET_CURRENT_DEAL_DONE_SUCCESS:
      return { ...state, listDealDone: payload };
    case GET_CURRENT_DEAL_DONE_FAIL:
      return { ...state, errors: payload };
    case GET_CURRENT_DEAL_CANCEL_SUCCESS:
      return { ...state, listDealCancel: payload };
    case GET_CURRENT_DEAL_CANCEL_FAIL:
      return { ...state, errors: payload };
    case GET_DETAIL_DEAL_SUCCESS:
      return { ...state, detailDeal: payload };
    case GET_DETAIL_DEAL_FAIL:
      return { ...state, errors: payload };
    case CHECK_REQUEST_DEAL_SUCCESS:
      return { ...state, checkDeal: payload };
    case CHECK_REQUEST_DEAL_FAILED:
      return { ...state, errors: payload };
    case GET_LIST_INVITE_SUCCESS:
      return { ...state, listInvite: payload };
    case GET_LIST_INVITE_FAILED:
      return { ...state, errors: payload };
    default:
      return state;
  }
};

export default dealReducer;
