import {
  START_LOADING,
  START_LOADING_COMPONENT,
  STOP_LOADING,
  STOP_LOADING_COMPONENT,
} from "../constants/loading.const";
export const startLoading = () => {
  return {
    type: START_LOADING,
  };
};

export const stopLoading = () => {
  return {
    type: STOP_LOADING,
  };
};

export const startLoadingComponent = () => {
  return {
    type: START_LOADING_COMPONENT,
  };
};

export const stopLoadingComponent = () => {
  return {
    type: STOP_LOADING_COMPONENT,
  };
};
