import {
  GET_ALL_LIST_ROUND_ACCTIVE_FAILED,
  GET_ALL_LIST_ROUND_ACTIVE_SUCCESS,
  GET_LIST_QUESTION_AND_ANSWER_FAIL,
  GET_LIST_QUESTION_AND_ANSWER_SUCCESS,
  GET_LIST_ALL_ROUND_FAILED,
  GET_LIST_ALL_ROUND_SUCCESS,
  GET_LIST_ROUND_ACTIVE_BY_ID_ORGANIZATION_FAILED,
  GET_LIST_ROUND_ACTIVE_BY_ID_ORGANIZATION_SUCCESS,
  GET_LIST_ROUND_BY_ID_INVESTOR_FAILED,
  GET_LIST_ROUND_BY_ID_INVESTOR_SUCCESS,
  GET_LIST_ROUND_BY_ID_ORGANIZATION_FAILED,
  GET_LIST_ROUND_BY_ID_ORGANIZATION_SUCCESS,
  GET_LIST_ROUND_PASS_BY_ID_ORGANIZATION_FAILED,
  GET_LIST_ROUND_PASS_BY_ID_ORGANIZATION_SUCCESS,
  GET_LIST_ROUND_PENDING_BY_ID_ORGANIZATION_FAILED,
  GET_LIST_ROUND_PENDING_BY_ID_ORGANIZATION_SUCCESS,
  GET_ROUND_AND_ORGANIZATION_SUCCESS,
  GET_ROUND_AND_ORGANIZATION_FAIL,
  GET_LIST_DEAL_BY_ROUND_SUCCESS,
  GET_LIST_DEAL_BY_ROUND_FAIL,
  GET_ROUND_SUGGEST_SUCCESS,
  GET_ROUND_SUGGEST_FAILED,
  GET_ROUND_ACTIVE_SUCCESS_V2,
  GET_ROUND_ACTIVE_FAILED_V2,
  GET_ALL_ROUND_ACTIVE_SUCCESS_V2,
  GET_ALL_ROUND_ACTIVE_FAILED_V2,
} from "../constants/round.const";

const initialState = {
  listRoundActive: [],
  listRoundPending: [],
  listRoundPass: [],
  listAllRoundActive: [],
  listRoundByIdInvestor: [],
  listRoundByIdOrganization: [],
  listQuestionAndAnswer: [],
  listAllRound: [],
  roundAndOrganization: {},
  listDealByRound: [],
  listRoundSuggest: [],
  roundActiveV2: {},
  listAllRoundV2: [],
  errors: [],
};

const roundReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_LIST_ROUND_ACTIVE_BY_ID_ORGANIZATION_SUCCESS:
      return { ...state, listRoundActive: payload };
    case GET_LIST_ROUND_ACTIVE_BY_ID_ORGANIZATION_FAILED:
      return { ...state, errors: payload };
    case GET_LIST_ROUND_PENDING_BY_ID_ORGANIZATION_SUCCESS:
      return { ...state, listRoundPending: payload };
    case GET_LIST_ROUND_PENDING_BY_ID_ORGANIZATION_FAILED:
      return { ...state, errors: payload };
    case GET_LIST_ROUND_PASS_BY_ID_ORGANIZATION_SUCCESS:
      return { ...state, listRoundPass: payload };
    case GET_LIST_ROUND_PASS_BY_ID_ORGANIZATION_FAILED:
      return { ...state, errors: payload };
    case GET_ALL_LIST_ROUND_ACTIVE_SUCCESS:
      if (payload === "No Data") {
        return { ...state, listAllRoundActive: [] };
      } else {
        return { ...state, listAllRoundActive: payload };
      }
    case GET_ALL_LIST_ROUND_ACCTIVE_FAILED:
      return { ...state, errors: payload };
    // ver 2
    case GET_LIST_ROUND_BY_ID_INVESTOR_SUCCESS:
      if (payload === "No Data") {
        return { ...state, listRoundByIdInvestor: [] };
      } else {
        return { ...state, listRoundByIdInvestor: payload };
      }
    case GET_LIST_ROUND_BY_ID_INVESTOR_FAILED:
      return { ...state, errors: payload };
    case GET_LIST_ROUND_BY_ID_ORGANIZATION_SUCCESS:
      if (payload === "No Data") {
        return { ...state, listRoundByIdOrganization: [] };
      } else {
        return { ...state, listRoundByIdOrganization: payload };
      }
    case GET_LIST_ROUND_BY_ID_ORGANIZATION_FAILED:
      return { ...state, errors: payload };
    case GET_LIST_QUESTION_AND_ANSWER_SUCCESS:
      return { ...state, listQuestionAndAnswer: payload };
    case GET_LIST_QUESTION_AND_ANSWER_FAIL:
    case GET_LIST_ALL_ROUND_SUCCESS:
      if (payload === "No Data") {
        return { ...state, listAllRound: [] };
      } else {
        return { ...state, listAllRound: payload };
      }
    case GET_LIST_ALL_ROUND_FAILED:
      return { ...state, errors: payload };
    case GET_ROUND_AND_ORGANIZATION_SUCCESS:
      return { ...state, roundAndOrganization: payload };
    case GET_ROUND_AND_ORGANIZATION_FAIL:
      return { ...state, errors: payload };
    case GET_LIST_DEAL_BY_ROUND_SUCCESS:
      return { ...state, listDealByRound: payload };
    case GET_LIST_DEAL_BY_ROUND_FAIL:
      return { ...state, errors: payload };
    case GET_ROUND_SUGGEST_SUCCESS:
      return { ...state, listRoundSuggest: payload };
    case GET_ROUND_SUGGEST_FAILED:
      return { ...state, errors: payload };
    case GET_ROUND_ACTIVE_SUCCESS_V2:
      return { ...state, roundActiveV2: payload };
    case GET_ROUND_ACTIVE_FAILED_V2:
      return { ...state, errors: payload };
    case GET_ALL_ROUND_ACTIVE_SUCCESS_V2:
      return { ...state, listAllRoundV2: payload };
    case GET_ALL_ROUND_ACTIVE_FAILED_V2:
      return { ...state, errors: payload };
    default:
      return state;
  }
};

export default roundReducer;
