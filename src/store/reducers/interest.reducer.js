import {
  GET_ORG_OR_INV_NOT_FOLLOW_FAILED,
  GET_ORG_OR_INV_NOT_FOLLOW_SUCCESS,
} from "../constants/interest.const";

const initialState = {
  listOrgOrInvNotFollow: [],
  errors: [],
};

const interestRuducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ORG_OR_INV_NOT_FOLLOW_SUCCESS:
      return { ...state, listOrgOrInvNotFollow: payload };
    case GET_ORG_OR_INV_NOT_FOLLOW_FAILED:
      return { ...state, errors: payload };
    default:
      return state;
  }
};

export default interestRuducer;
