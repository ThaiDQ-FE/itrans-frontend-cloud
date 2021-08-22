import { notification } from "antd";
import axios from "axios";
import {
  authorizationAccount,
  checkEmailUser,
  checkPathUrl,
  getLocalStorage,
  pathAdminTinTuc,
  pathAdminTinTucChiTiet,
  sessionTimeOut,
  showMessage,
} from "../../assets/helper/helper";
import message from "../../assets/message/text";
import {
  defaultUrlAPI,
  defaultUrlAPIAuthStringTemplate,
  defaultUrlAPIStringTemplate,
} from "../../configs/url";
import {
  GET_ANOTHER_ARTICLE_FAILED,
  GET_ANOTHER_ARTICLE_SUCCESS,
  GET_DETAIL_ARTICLE_BY_ID_FAILED,
  GET_DETAIL_ARTICLE_BY_ID_SUCCESS,
  GET_LIST_ARTICLE_FAILED,
  GET_LIST_ARTICLE_SUCCESS,
  GET_LIST_FOLLOWED_FAILED,
  GET_LIST_FOLLOWED_SUCCESS,
  GET_LIST_LINK_ARTICLE_FAILED,
  GET_LIST_LINK_ARTICLE_SUCCESS,
  GET_LIST_VIEW_ARTICLE_FAILED,
  GET_LIST_VIEW_ARTICLE_SUCCESS,
  SEARCH_ARTICLE_ADMIN_FAILED,
  SEARCH_ARTICLE_ADMIN_SUCCESS,
  SEARCH_ARTICLE_FAILED,
  SEARCH_ARTICLE_SUCCESS,
} from "../constants/article.const";
import { getValueArticle } from "./admin.action";
import { startLoading, stopLoading } from "./loading.action";

export const getListArticleByGmail = (gmail, isSelected) => {
  return (dispatch) => {
    if (isSelected === false) {
      dispatch(startLoading());
    }
    axios({
      method: "GET",
      url:
        defaultUrlAPIAuthStringTemplate() +
        `articles-by-account?gmail=${gmail}`,
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(getListArticleByGmailSuccess(res.data));
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getListArticleByGmailFailed(err));
      });
  };
};

const getListArticleByGmailSuccess = (listArticle) => {
  return {
    type: GET_LIST_ARTICLE_SUCCESS,
    payload: listArticle,
  };
};

const getListArticleByGmailFailed = (err) => {
  return {
    type: GET_LIST_ARTICLE_FAILED,
    payload: err,
  };
};

export const getListViewArticle = (gmail, isSelect, history) => {
  return (dispatch) => {
    if (isSelect === false) {
      dispatch(startLoading());
    }
    axios({
      method: "GET",
      url: defaultUrlAPIStringTemplate() + `articles-by-follow?gmail=${gmail}`,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        dispatch(stopLoading());
        if (res.status === 200) {
          dispatch(getListViewArticleSuccess(res.data));
        }
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getListViewArticleFailed(err));
        if (getLocalStorage("userInfo") !== null) {
          sessionTimeOut(err, history);
        }
      });
  };
};

const getListViewArticleSuccess = (list) => {
  return {
    type: GET_LIST_VIEW_ARTICLE_SUCCESS,
    payload: list,
  };
};

const getListViewArticleFailed = (err) => {
  return {
    type: GET_LIST_VIEW_ARTICLE_FAILED,
    payload: err,
  };
};

export const getDetailArticlesByID = (id, history, isLoading) => {
  return (dispatch) => {
    if (isLoading === true) {
      dispatch(startLoading());
    }
    axios({
      method: "GET",
      url: defaultUrlAPIStringTemplate() + `article/${id}`,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        dispatch(stopLoading());
        if (res.status === 200) {
          dispatch(getDetailArticlesByIDSuccess(res.data));
        }
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getDetailArticlesByIDFailed(err));
        if (getLocalStorage("userInfo") !== null) {
          sessionTimeOut(err, history);
        }
      });
  };
};

const getDetailArticlesByIDSuccess = (detail) => {
  return {
    type: GET_DETAIL_ARTICLE_BY_ID_SUCCESS,
    payload: detail,
  };
};

const getDetailArticlesByIDFailed = (err) => {
  return {
    type: GET_DETAIL_ARTICLE_BY_ID_FAILED,
    payload: err,
  };
};

export const getAnotherArticle = (id) => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: defaultUrlAPIStringTemplate() + `other-article?idArticle=${id}`,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        dispatch(getAnotherArticleSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getAnotherArticleFailed(err));
      });
  };
};

export const getAnotherArticleSuccess = (list) => {
  return {
    type: GET_ANOTHER_ARTICLE_SUCCESS,
    payload: list,
  };
};

export const getAnotherArticleFailed = (err) => {
  return {
    type: GET_ANOTHER_ARTICLE_FAILED,
    payload: err,
  };
};

export const deleleArticleById = (id, history) => {
  return (dispatch) => {
    axios({
      method: "PUT",
      url: defaultUrlAPIStringTemplate() + `delete-article?idArticle=${id}`,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          if (checkPathUrl() === pathAdminTinTuc()) {
            notification["success"]({
              message: "Xóa bài viết thành công",
            });
            dispatch(getValueArticle(false, history));
          } else if (checkPathUrl().includes(pathAdminTinTucChiTiet())) {
            showMessage("success", "Xóa bài viết thành công");
            setTimeout(() => {
              history.push("/admin/quan-ly-tin-tuc");
            }, 2000);
          } else {
            showMessage("success", "Xóa bài viết thành công");
            dispatch(getListArticleByGmail(checkEmailUser(), true));
          }
        } else {
          if (checkPathUrl() === pathAdminTinTuc()) {
            notification["error"]({
              message: "Xóa bài viết thất bại",
            });
          } else {
            showMessage("error", "Xóa bài viết thất bại");
          }
        }
      })
      .catch((err) => {
        sessionTimeOut(err, history);
      });
  };
};

export const searchArticle = (gmail, title, history) => {
  return (dispacth) => {
    dispacth(startLoading());
    axios({
      method: "GET",
      url:
        defaultUrlAPIStringTemplate() +
        `search-article?gmail=${gmail}&title=${title}`,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        dispacth(stopLoading());
        if (res.status === 200) {
          dispacth(searchArticleSuccess(res.data));
        } else {
          showMessage("error", message.CACTH_ERROR);
        }
      })
      .catch((err) => {
        dispacth(stopLoading());
        dispacth(searchArticleFailed(err));
        sessionTimeOut(err, history);
      });
  };
};

const searchArticleSuccess = (list) => {
  return {
    type: SEARCH_ARTICLE_SUCCESS,
    payload: list,
  };
};
const searchArticleFailed = (err) => {
  return {
    type: SEARCH_ARTICLE_FAILED,
    payload: err,
  };
};

export const searchArticleAdmin = (title, history) => {
  return (dispacth) => {
    dispacth(startLoading());
    axios({
      method: "GET",
      url:
        defaultUrlAPIStringTemplate() +
        `search-article-of-admin?title=${title}`,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        dispacth(stopLoading());
        if (res.status === 200) {
          dispacth(searchArticleAdminSuccess(res.data));
        } else {
          showMessage("error", message.CACTH_ERROR);
        }
      })
      .catch((err) => {
        dispacth(stopLoading());
        dispacth(searchArticleAdminFailed(err));
        sessionTimeOut(err, history);
      });
  };
};

const searchArticleAdminSuccess = (list) => {
  return {
    type: SEARCH_ARTICLE_ADMIN_SUCCESS,
    payload: list,
  };
};
const searchArticleAdminFailed = (err) => {
  return {
    type: SEARCH_ARTICLE_ADMIN_FAILED,
    payload: err,
  };
};

export const getListFollowed = (gmail, isLoading, history) => {
  return (dispatch) => {
    if (isLoading === true) {
      dispatch(startLoading());
    }
    axios({
      method: "GET",
      url: defaultUrlAPIStringTemplate() + `my-follow?gmail=${gmail}`,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        dispatch(stopLoading());
        if (res.status === 200) {
          dispatch(getListFollowedSuccess(res.data));
        } else {
          showMessage("error", message.CACTH_ERROR);
        }
      })
      .catch((err) => {
        dispatch(stopLoading);
        dispatch(getListFollowedFailed(err));
        sessionTimeOut(err, history);
      });
  };
};

const getListFollowedSuccess = (list) => {
  return {
    type: GET_LIST_FOLLOWED_SUCCESS,
    payload: list,
  };
};

const getListFollowedFailed = (err) => {
  return {
    type: GET_LIST_FOLLOWED_FAILED,
    payload: err,
  };
};

export const getListLinkArticle = (gmail, isSelected) => {
  return (dispatch) => {
    if (isSelected === false) {
      dispatch(startLoading());
    }
    axios({
      method: "GET",
      url: defaultUrlAPIStringTemplate() + `news?gmail=${gmail}`,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(getListLinkArticleSuccess(res.data));
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getListLinkArticleFailed(err));
      });
  };
};

const getListLinkArticleSuccess = (listArticle) => {
  return {
    type: GET_LIST_LINK_ARTICLE_SUCCESS,
    payload: listArticle,
  };
};

const getListLinkArticleFailed = (err) => {
  return {
    type: GET_LIST_LINK_ARTICLE_FAILED,
    payload: err,
  };
};
