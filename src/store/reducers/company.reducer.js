import {
  GET_DETAIL_COMPANY_FAILED,
  GET_DETAIL_COMPANY_SUCCESS,
  GET_DETAIL_COMPANY_VIEW_FAILED,
  GET_DETAIL_COMPANY_VIEW_SUCCESS,
} from "../constants/company.const";

const initialState = {
  detailCompany: {},
  detailCompanyView: {},
  errors: [],
};
const detailCompanyReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_DETAIL_COMPANY_SUCCESS:
      return { ...state, detailCompany: payload };
    case GET_DETAIL_COMPANY_FAILED:
      return { ...state, errors: payload };
    case GET_DETAIL_COMPANY_VIEW_SUCCESS:
      return { ...state, detailCompanyView: payload };
    case GET_DETAIL_COMPANY_VIEW_FAILED:
      return { ...state, errors: payload };

    default:
      return state;
  }
};

export default detailCompanyReducer;
