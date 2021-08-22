import Swal from "sweetalert2";
import message from "../message/text";

export const checkRoleUser = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo !== null) return userInfo.role;
};
export const authorizationAccount = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo !== null) return userInfo.jwt;
};
export const checkIdUser = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo !== null) return userInfo.id;
};
export const checkEmailUser = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo !== null) return userInfo.gmail;
};
export const checkNameUser = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo !== null) return userInfo.name;
};
export const showMessage = (icon, mess) => {
  return Swal.fire({
    icon: icon,
    title: mess,
    heightAuto: true,
    timerProgressBar: false,
    showConfirmButton: false,
    timer: 2000,
    allowOutsideClick: false,
  });
};
export const showMessageHTML = (icon, mess, html) => {
  return Swal.fire({
    icon: icon,
    title: mess,
    html: html,
    heightAuto: true,
    timerProgressBar: false,
    showConfirmButton: false,
    timer: 2000,
    allowOutsideClick: false,
  });
};

export const convertNumber = (value) => {
  if (value !== null) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

export const countDecimals = (value) => {
  if (value !== "") {
    if (Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0;
  }
};

export const localStorages = (name, value) => {
  return localStorage.setItem(name, JSON.stringify(value));
};

export const getLocalStorage = (name) => {
  return JSON.parse(localStorage.getItem(name));
};

export const checkPathUrl = () => {
  const path = window.location.pathname;
  return path;
};

export const pathQuanLyTaiKhoan = () => {
  const path = "/quan-ly-tai-khoan";
  return path;
};

export const pathToChuc = () => {
  const path = "/to-chuc/chi-tiet";
  return path;
};

export const pathNhaDauTu = () => {
  const path = "/nha-dau-tu/chi-tiet";
  return path;
};

export const pathAdminTinTuc = () => {
  const path = "/admin/quan-ly-tin-tuc";
  return path;
};

export const pathAdminTinTucChiTiet = () => {
  const path = "/admin/quan-ly-tin-tuc/chi-tiet";
  return path;
};

export const sessionTimeOut = (err, history) => {
  if (err.message === "Request failed with status code 403") {
    Swal.fire({
      icon: "error",
      title: "Thời gian truy cập của bạn đã hết hãy đăng nhập lại",
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        localStorage.removeItem("userInfo");
        history.push("/dang-nhap");
      }
    });
  }
};

export const doccumentAddDis = (id) => {
  return document.getElementById(id).setAttribute("disabled", true);
};

export const doccumentRemoveDis = (id) => {
  return document.getElementById(id).removeAttribute("disabled");
};

export const doccumentAddClass = (id) => {
  return document.getElementById(id).classList.add("fr__defaulted");
};

export const doccumentRemoveClass = (id) => {
  return document.getElementById(id).classList.remove("fr__defaulted");
};

export const doccumentAddClassWeight = (id) => {
  return document.getElementById(id).classList.add("active__subrole");
};

export const doccumentRemoveClassWeight = (id) => {
  return document.getElementById(id).classList.remove("active__subrole");
};
