import axios from "axios";
import {
  authorizationAccount,
  checkIdUser,
  sessionTimeOut,
  showMessage,
} from "../../assets/helper/helper";
import message from "../../assets/message/text";
import {
  GET_LIST_MILESTONE_FAILED,
  GET_LIST_MILESTONE_SUCCESS,
} from "../constants/milestone.const";
import { startLoading, stopLoading } from "./loading.action";

export const getListMilestone = (idOrg, isLoading) => {
  return (dispatch) => {
    if (isLoading === true) {
      dispatch(startLoading());
    }
    axios({
      method: "GET",
      url: `https://itrans2021.herokuapp.com/api/v1/auth/get-milestoneByOrganizationId/${idOrg}`,
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(getListMilestoneSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getListMilestoneFailed(err));
        dispatch(stopLoading());
      });
  };
};

export const deleteMilestoneById = (id, history) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: "PUT",
      url: `https://itrans2021.herokuapp.com/api/v1/delete-milestone?id=${id}`,
      data: null,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          showMessage("success", "Xóa cột mốc thành công");
          dispatch(getListMilestone(checkIdUser(), false));
        }
      })
      .catch((err) => {
        sessionTimeOut(err, history);
      });
  };
};

const getListMilestoneSuccess = (listMilestone) => {
  return {
    type: GET_LIST_MILESTONE_SUCCESS,
    payload: listMilestone,
  };
};

const getListMilestoneFailed = (err) => {
  return {
    type: GET_LIST_MILESTONE_FAILED,
    payload: err,
  };
};
