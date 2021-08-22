import {
  START_LOADING,
  START_LOADING_COMPONENT,
  STOP_LOADING,
  STOP_LOADING_COMPONENT,
} from "../constants/loading.const";
const initialState = {
  loading: false,
  loadingComponent: false,
};

const loadingReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    case START_LOADING_COMPONENT:
      return { ...state, loadingComponent: true };
    case STOP_LOADING_COMPONENT:
      return { ...state, loadingComponent: false };
    default:
      return state;
  }
};
export default loadingReducer;
