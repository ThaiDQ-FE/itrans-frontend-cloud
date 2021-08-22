import {
  GET_LIST_TEAM_FAILED,
  GET_LIST_TEAM_SUCCESS,
} from "../constants/team.const";

const initialState = {
  listTeamMember: [],
  errors: [],
};

const teamMemberReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_LIST_TEAM_SUCCESS:
      return { ...state, listTeamMember: payload };
    case GET_LIST_TEAM_FAILED:
      return { ...state, errors: payload };
    default:
      return state;
  }
};

export default teamMemberReducer;
