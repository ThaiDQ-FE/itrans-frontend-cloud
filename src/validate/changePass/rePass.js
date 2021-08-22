export const checkOld = (old, setOld) => {
  if (old.length === 0) {
    return setOld("Mật khẩu cũ không được bỏ trông");
  } else {
    setOld("");
  }
};
export const checkNew = (newPass, setNewPass) => {
  if (newPass.length === 0) {
    return setNewPass("Mật khẩu mới không được bỏ trống");
  } else {
    setNewPass("");
  }
  if (newPass.length < 8) {
    return setNewPass("Mật khẩu mới tối thiểu 8 ký tự");
  } else {
    setNewPass("");
  }
  if (newPass.length > 30) {
    return setNewPass("Mật khẩu mới tối đa 30 ký tự");
  } else {
    setNewPass("");
  }
};

export const checkReNew = (reNew, setReNew, newPass) => {
  if (reNew.length === 0) {
    return setReNew("Nhập lại mật khẩu không được bỏ trống");
  } else {
    setReNew("");
  }
  if (reNew.length < 8) {
    return setReNew("Mật khẩu mới tối thiểu 8 ký tự");
  } else {
    setReNew("");
  }
  if (reNew.length > 30) {
    return setReNew("Mật khẩu mới tối đa 30 ký tự");
  } else {
    setReNew("");
  }
  if (reNew !== newPass) {
    return setReNew("Nhập lại mật khẩu phải giống mật khẩu mới");
  } else {
    return setReNew("");
  }
};
