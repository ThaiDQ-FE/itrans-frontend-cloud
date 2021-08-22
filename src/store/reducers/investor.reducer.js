import {
  GET_LIST_INVESTOR_FILTER_FAILED,
  GET_LIST_INVESTOR_FILTER_SUCCESS,
  GET_LIST_INVESTOR_SUGGEST_FAILED,
  GET_LIST_INVESTOR_SUGGEST_SUCCESS,
} from "../constants/investor.const";

const initialState = {
  listInvestorFilter: [],
  listInvestorSuggest: [],
  errors: [],
};

const investorReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_LIST_INVESTOR_FILTER_SUCCESS:
      if (payload === "No Data") {
        return { ...state, listInvestorFilter: [] };
      } else {
        return { ...state, listInvestorFilter: payload };
      }
    case GET_LIST_INVESTOR_FILTER_FAILED:
      return { ...state, errors: payload };
    case GET_LIST_INVESTOR_SUGGEST_SUCCESS:
      return { ...state, listInvestorSuggest: payload };
    case GET_LIST_INVESTOR_SUGGEST_FAILED:
      return { ...state, errors: payload };
    default:
      return state;
  }
};

export default investorReducer;
