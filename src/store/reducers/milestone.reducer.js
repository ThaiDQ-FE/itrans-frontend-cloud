import {
  GET_LIST_MILESTONE_FAILED,
  GET_LIST_MILESTONE_SUCCESS,
} from "../constants/milestone.const";

const initialState = {
  listMilestone: [],
  errors: [],
};

const milestoneReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_LIST_MILESTONE_SUCCESS:
      return { ...state, listMilestone: payload };
    case GET_LIST_MILESTONE_FAILED:
      return { ...state, errors: payload };
    default:
      return state;
  }
};

export default milestoneReducer;
