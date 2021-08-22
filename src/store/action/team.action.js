import axios from "axios";
import {
  authorizationAccount,
  checkEmailUser,
  showMessage,
} from "../../assets/helper/helper";
import {
  GET_LIST_TEAM_FAILED,
  GET_LIST_TEAM_SUCCESS,
} from "../constants/team.const";
import { startLoading, stopLoading } from "./loading.action";

export const getListTeamMember = (gmail, isSelect) => {
  return (dispatch) => {
    if (isSelect === false) {
      dispatch(startLoading());
    }
    const token = authorizationAccount();
    axios({
      method: "GET",
      url: `https://itrans2021.herokuapp.com/api/v1/team-by-gmail?gmail=${gmail}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(getListTeamMemberSuccess(res.data));
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getListTeamMemberFailed(err));
      });
  };
};

export const deleteTeamMember = (id) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: "PUT",
      url: `https://itrans2021.herokuapp.com/api/v1/delete-member?idMember=${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          showMessage("success", "Xóa thành viên thành công");
          dispatch(getListTeamMember(checkEmailUser(), true));
        } else {
          showMessage("error", "Xoá thành viên thất bại");
        }
      })
      .catch((err) => {
        showMessage("error", "Máy chủ đang bị lỗi. Hãy thử lại sau");
      });
  };
};

const getListTeamMemberSuccess = (listTeamMember) => {
  return {
    type: GET_LIST_TEAM_SUCCESS,
    payload: listTeamMember,
  };
};

const getListTeamMemberFailed = (err) => {
  return {
    type: GET_LIST_TEAM_FAILED,
    payload: err,
  };
};
