import axios from "axios";
import {
  authorizationAccount,
  sessionTimeOut,
  showMessage,
} from "../../assets/helper/helper";
import { defaultUrlAPI } from "../../configs/url";
import { updateAcceptDeal } from "./deal.action";
import { startLoadingComponent, stopLoadingComponent } from "./loading.action";
import { getListAccountNotConfirm } from "./user.action";

export const sendMailHTML = (content, title, gmail, history) => {
  return (dispatch) => {
    dispatch(startLoadingComponent());
    axios({
      method: "POST",
      url: defaultUrlAPI() + "send-mail/send-mail-html",
      data: {
        content: content,
        gmail: gmail,
        title: title,
      },
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        dispatch(stopLoadingComponent());
        if (res.status === 200) {
          showMessage("success", "Duyệt tài khoản thành công");
          dispatch(getListAccountNotConfirm());
          setTimeout(() => {
            history.push("/admin/quan-ly-tai-khoan");
          }, 2000);
        } else {
          showMessage("error", "Duyệt tài khoản thất bại");
        }
      })
      .catch((err) => {
        dispatch(stopLoadingComponent());
        sessionTimeOut(err, history);
      });
  };
};

export const sendMailDefaultHTML = (content, title, gmail) => {
  return (dispatch) => {
    axios({
      method: "POST",
      url: defaultUrlAPI() + "send-mail/send-mail-html",
      data: {
        content: content,
        gmail: gmail,
        title: title,
      },
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});
  };
};
export const sendMailDefaultHTMLV2 = (content, title, gmail) => {
  axios({
    method: "POST",
    url: defaultUrlAPI() + "send-mail/send-mail-html",
    data: {
      content: content,
      gmail: gmail,
      title: title,
    },
    headers: {
      Authorization: `Bearer ${authorizationAccount()}`,
    },
  })
    .then((res) => {})
    .catch((err) => {});
};

export const sendMailSpecial = (
  content,
  title,
  gmail,
  content2,
  title2,
  gmail2
) => {
  return (dispatch) => {
    axios({
      method: "POST",
      url: defaultUrlAPI() + "send-mail/send-mail-html",
      data: {
        content: content,
        gmail: gmail,
        title: title,
      },
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(sendMailDefaultHTML(content2, title2, gmail2));
        }
      })
      .catch((err) => {});
  };
};
