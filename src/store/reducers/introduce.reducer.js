import {
  GET_LIST_DOCUMENT_BY_ROUND_FAILED,
  GET_LIST_DOCUMENT_BY_ROUND_SUCCESS,
  GET_LIST_INTRODUCE_BY_ROUND_FAILED,
  GET_LIST_INTRODUCE_BY_ROUND_SUCCESS,
  GET_LIST_INTRODUCE_FAILED,
  GET_LIST_INTRODUCE_SUCCESS,
} from "../constants/introduce.const";

const initialState = {
  listIntroduce: [],
  listIntroduceByRound: [],
  listDocumentByRound: [],
  errors: [],
};

const introduceReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_LIST_INTRODUCE_SUCCESS:
      return { ...state, listIntroduce: payload };
    case GET_LIST_INTRODUCE_FAILED:
      return { ...state, errors: payload };
    case GET_LIST_INTRODUCE_BY_ROUND_SUCCESS:
      return { ...state, listIntroduceByRound: payload };
    case GET_LIST_INTRODUCE_BY_ROUND_FAILED:
      return { ...state, errors: payload };
    case GET_LIST_DOCUMENT_BY_ROUND_SUCCESS:
      return { ...state, listDocumentByRound: payload };
    case GET_LIST_DOCUMENT_BY_ROUND_FAILED:
      return { ...state, errors: payload };

    default:
      return state;
  }
};

export default introduceReducer;
