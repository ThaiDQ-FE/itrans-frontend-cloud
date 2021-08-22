import axios from "axios";
import {
  authorizationAccount,
  checkEmailUser,
  sessionTimeOut,
  showMessage,
} from "../../assets/helper/helper";
import message from "../../assets/message/text";
import {
  CREATE_INTRODUCE_FAILED,
  CREATE_INTRODUCE_SUCCESS,
  GET_LIST_DOCUMENT_BY_ROUND_FAILED,
  GET_LIST_DOCUMENT_BY_ROUND_SUCCESS,
  GET_LIST_INTRODUCE_BY_ROUND_FAILED,
  GET_LIST_INTRODUCE_BY_ROUND_SUCCESS,
  GET_LIST_INTRODUCE_FAILED,
  GET_LIST_INTRODUCE_SUCCESS,
  UPDATE_INTRODUCE_FAILED,
  UPDATE_INTRODUCE_SUCCESS,
} from "../constants/introduce.const";
import { startLoading, stopLoading } from "./loading.action";

export const getListIntroduceByGmail = (gmail, isLoading) => {
  return (dispatch) => {
    if (isLoading === true) {
      dispatch(startLoading());
    }
    axios({
      method: "GET",
      url: `https://itrans2021.herokuapp.com/api/v1/auth/introduces/${gmail}`,
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(getListIntroduceByGmailSuccess(res.data));
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getListIntroduceByGmailFailed(err));
      });
  };
};

export const deleteIntroduceById = (id, history) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: "PUT",
      url: `https://itrans2021.herokuapp.com/api/v1/delete-introduce?idIntroduce=${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          showMessage("success", "Xóa tiêu đề - nội dung thành công");
          dispatch(getListIntroduceByGmail(checkEmailUser(), false));
        } else {
          showMessage("error", "Xóa tiêu đề nội dung thất bại");
        }
      })
      .catch((err) => {
        sessionTimeOut(err, history);
      });
  };
};

const getListIntroduceByGmailSuccess = (listIntroduce) => {
  return {
    type: GET_LIST_INTRODUCE_SUCCESS,
    payload: listIntroduce,
  };
};

const getListIntroduceByGmailFailed = (err) => {
  return {
    type: GET_LIST_INTRODUCE_FAILED,
    payload: err,
  };
};

export const getListIntroduceByRoundId = (idRound) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: "GET",
      url: `https://itrans2021.herokuapp.com/api/v1/introduces-by-round?idRound=${idRound}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(getListIntroduceByRoundIdSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getListIntroduceByRoundIdFailed(err));
      });
  };
};

const getListIntroduceByRoundIdSuccess = (listIntroduceByrRound) => {
  return {
    type: GET_LIST_INTRODUCE_BY_ROUND_SUCCESS,
    payload: listIntroduceByrRound,
  };
};

const getListIntroduceByRoundIdFailed = (err) => {
  return {
    type: GET_LIST_INTRODUCE_BY_ROUND_FAILED,
    payload: err,
  };
};

export const getListDocumentByRoundId = (idRound) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: "GET",
      url: `https://itrans2021.herokuapp.com/api/v1/document?idRound=${idRound}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(getListDocumentByRoundIdSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getListDocumentByRoundIdFailed(err));
      });
  };
};

const getListDocumentByRoundIdSuccess = (listDocumentByRound) => {
  return {
    type: GET_LIST_DOCUMENT_BY_ROUND_SUCCESS,
    payload: listDocumentByRound,
  };
};

const getListDocumentByRoundIdFailed = (err) => {
  return {
    type: GET_LIST_DOCUMENT_BY_ROUND_FAILED,
    payload: err,
  };
};

export const updateIntroduce = (idIntroduce, object, idRound) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: "PUT",
      url: `https://itrans2021.herokuapp.com/api/v1/introduce?idIntroduce=${idIntroduce}`,
      data: object,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(updateIntroduceSuccess(res.data));
        dispatch(getListIntroduceByRoundId(idRound));
      })
      .catch((err) => {
        dispatch(updateIntroduceFailed(err));
      });
  };
};

const updateIntroduceSuccess = (listIntroduce) => {
  return {
    type: UPDATE_INTRODUCE_SUCCESS,
    payload: listIntroduce,
  };
};

const updateIntroduceFailed = (err) => {
  return {
    type: UPDATE_INTRODUCE_FAILED,
    payload: err,
  };
};

export const deleteIntroduce = (idIntroduce, idRound) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: "PUT",
      url: `https://itrans2021.herokuapp.com/api/v1/delete-introduce?idIntroduce=${idIntroduce}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(getListIntroduceByRoundId(idRound));
      })
      .catch((err) => {});
  };
};

export const createIntroduce = (object, idRound) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: "POST",
      url: `https://itrans2021.herokuapp.com/api/v1/introduce-round?idRound=${idRound}`,
      data: object,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(createIntroduceSuccess(res.data));
        dispatch(getListIntroduceByRoundId(idRound));
      })
      .catch((err) => {
        dispatch(createIntroduceFailed(err));
      });
  };
};

const createIntroduceSuccess = (listIntroduce) => {
  return {
    type: CREATE_INTRODUCE_SUCCESS,
    payload: listIntroduce,
  };
};

const createIntroduceFailed = (err) => {
  return {
    type: CREATE_INTRODUCE_FAILED,
    payload: err,
  };
};
