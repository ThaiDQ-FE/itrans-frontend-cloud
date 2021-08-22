import {
  GET_LIST_MEDIA_BY_ID_FAILED,
  GET_LIST_MEDIA_BY_ID_SUCCESS,
} from "../constants/media.const";

const initialState = {
  listMedia: [],
  errors: [],
};

const mediaReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_LIST_MEDIA_BY_ID_SUCCESS:
      return { ...state, listMedia: payload };
    case GET_LIST_MEDIA_BY_ID_FAILED:
      return { ...state, errors: payload };

    default:
      return state;
  }
};

export default mediaReducer;
