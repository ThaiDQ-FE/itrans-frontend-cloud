import axios from "axios";
import {
  authorizationAccount,
  sessionTimeOut,
  showMessage,
} from "../../assets/helper/helper";
import { defaultUrlAPI, defaultUrlAPIStringTemplate } from "../../configs/url";
import "antd/dist/antd.css";
import { notification } from "antd";
import { getValueListIndustry, getValueListStage } from "./value.action";
import message from "../../assets/message/text";
import {
  GET_VALUE_ACCOUNT_FAILED,
  GET_VALUE_ACCOUNT_SUCCESS,
  GET_VALUE_ARTICLE_FAILED,
  GET_VALUE_ARTICLE_SUCCESS,
} from "../constants/value.const";
import { startLoading, stopLoading } from "./loading.action";
export const updateStage = (object) => {
  return (dispatch) => {
    axios({
      method: "PUT",
      url: defaultUrlAPI() + "update-stage",
      data: object,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          notification["success"]({
            message: "Cập nhật giai đoạn " + object.name + " thành công",
          });
          dispatch(getValueListStage("Admin-stage"));
        } else {
          notification["error"]({
            message: "Cập nhật giai đoạn thất bại",
          });
        }
      })
      .catch((err) => {
        notification["error"]({
          message: message.CACTH_ERROR,
        });
      });
  };
};

export const createStage = (object) => {
  return (dispatch) => {
    axios({
      method: "POST",
      url: defaultUrlAPI() + "create-stage",
      data: object,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          notification["success"]({
            message: "Giai đoạn " + object.name + " đã được tạo thành công",
          });
          dispatch(getValueListStage("Admin-stage"));
        } else {
          if (res.data === "Đã tồn tại") {
            notification["error"]({
              message: "Giai đoạn " + object.name + " " + res.data,
            });
          } else {
            notification["error"]({
              message: "Giai đoạn " + object.name + " tạo không thành công",
            });
          }
        }
      })
      .catch((err) => {
        notification["error"]({
          message: message.CACTH_ERROR,
        });
      });
  };
};

export const deleteStage = (object) => {
  return (dispatch) => {
    axios({
      method: "PUT",
      url:
        defaultUrlAPIStringTemplate() +
        `delete-stage?idStage=${object.idStage}`,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          notification["success"]({
            message: "Giai đoạn " + object.name + " đã được xóa thành công",
          });
          dispatch(getValueListStage("Admin-stage"));
        } else {
          notification["error"]({
            message: "Giai đoạn " + object.name + " xóa không thành công",
          });
        }
      })
      .catch((err) => {
        notification["error"]({
          message: message.CACTH_ERROR,
        });
      });
  };
};

export const updateIndustry = (object) => {
  return (dispatch) => {
    axios({
      method: "PUT",
      url: defaultUrlAPI() + "update-industry",
      data: object,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          notification["success"]({
            message: "Cập nhật ngành nghề " + object.name + " thành công",
          });
          dispatch(getValueListIndustry("Admin-industry"));
        } else {
          notification["error"]({
            message: "Cập nhật ngành nghề thất bại",
          });
        }
      })
      .catch((err) => {
        notification["error"]({
          message: message.CACTH_ERROR,
        });
      });
  };
};

export const createIndustry = (object) => {
  return (dispatch) => {
    axios({
      method: "POST",
      url: defaultUrlAPI() + "create-industry",
      data: object,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          notification["success"]({
            message: "Ngành nghề " + object.name + " đã được tạo thành công",
          });
          dispatch(getValueListIndustry("Admin-industry"));
        } else {
          if (res.data === "Đã tồn tại") {
            notification["error"]({
              message: "Ngành nghề " + object.name + " " + res.data,
            });
          } else {
            notification["error"]({
              message: "Ngành nghề " + object.name + " tạo không thành công",
            });
          }
        }
      })
      .catch((err) => {
        notification["error"]({
          message: message.CACTH_ERROR,
        });
      });
  };
};

export const deleteIndustry = (object) => {
  return (dispatch) => {
    axios({
      method: "PUT",
      url:
        defaultUrlAPIStringTemplate() +
        `delete-industry?idIndustry=${object.idIndustry}`,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          notification["success"]({
            message: "Ngành nghề " + object.name + " đã được xóa thành công",
          });
          dispatch(getValueListIndustry("Admin-industry"));
        } else {
          notification["error"]({
            message: "Ngành nghề " + object.name + " xóa không thành công",
          });
        }
      })
      .catch((err) => {
        notification["error"]({
          message: message.CACTH_ERROR,
        });
      });
  };
};

export const getValueArticle = (isLoading, history) => {
  return (dispatch) => {
    if (isLoading === true) {
      dispatch(startLoading());
    }
    axios({
      method: "GET",
      url: defaultUrlAPI() + "all-article-active",
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        dispatch(stopLoading());
        if (res.status === 200) {
          dispatch(getValueArticleSuccess(res.data));
        }
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getValueArticleFailed(err));
        sessionTimeOut(err, history);
      });
  };
};

const getValueArticleSuccess = (list) => {
  return {
    type: GET_VALUE_ARTICLE_SUCCESS,
    payload: list,
  };
};

const getValueArticleFailed = (err) => {
  return {
    type: GET_VALUE_ARTICLE_FAILED,
    payload: err,
  };
};

export const getValueAccount = (history, isLoading) => {
  return (dispatch) => {
    if (isLoading === true) {
      dispatch(startLoading());
    }
    axios({
      method: "GET",
      url: defaultUrlAPI() + "account-confirmed",
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getValueAccountSuccess(res.data));
        } else {
          notification["error"]({
            message: message.CACTH_ERROR,
          });
        }
      })
      .catch((err) => {
        dispatch(getValueAccountFailed(err));
        sessionTimeOut(err, history);
      });
  };
};

export const getValueAccountSuccess = (list) => {
  return {
    type: GET_VALUE_ACCOUNT_SUCCESS,
    payload: list,
  };
};

export const getValueAccountFailed = (err) => {
  return {
    type: GET_VALUE_ACCOUNT_FAILED,
    payload: err,
  };
};

export const adminBlockAccoutn = (gmail, name, history) => {
  return (dispatch) => {
    axios({
      method: "PUT",
      url: defaultUrlAPIStringTemplate() + `block-account?gmail=${gmail}`,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          notification["success"]({
            message: "Khóa tài khoản " + name + " thành công",
          });
          dispatch(getValueAccount(history, false));
        } else {
          notification["error"]({
            message: "Khóa tài khoản " + name + " thất bại",
          });
        }
      })
      .catch((err) => {
        sessionTimeOut(err, history);
      });
  };
};

export const adminOpenAccount = (gmail, name, history) => {
  return (dispatch) => {
    axios({
      method: "PUT",
      url: defaultUrlAPIStringTemplate() + `open-account?gmail=${gmail}`,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          notification["success"]({
            message: "Mở khóa tài khoản " + name + " thành công",
          });
          dispatch(getValueAccount(history, false));
        } else {
          notification["error"]({
            message: "Mở khóa tài khoản " + name + " thất bại",
          });
        }
      })
      .catch((err) => {
        sessionTimeOut(err, history);
      });
  };
};
