import { validGmail } from "../../configs/regex";

export const checkGamil = (gmail, setG) => {
  if (gmail === "") {
    return setG("Mail không được bỏ trống");
  } else {
    setG("");
  }
  if (!gmail.includes("admin")) {
    if (validGmail.test(gmail) === false) {
      return setG("Sai định dạng. VD: dangvana@gmail.com");
    } else {
      setG("");
    }
  } else {
    setG("");
  }
};

export const checkPassword = (pass, setP) => {
  if (pass === "") {
    return setP("Mật khẩu không được bỏ trống");
  } else {
    setP("");
  }
};
