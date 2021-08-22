export const checkName = (name, setName) => {
  if (name === "") {
    return setName("Họ và Tên không được bỏ trống");
  } else {
    setName("");
  }
  if (name.length < 3) {
    return setName("Họ và Tên tối thiểu 3 ký tự");
  } else {
    setName("");
  }
  if (name.length > 50) {
    return setName("Họ và Tên tối đa 50 ký tự");
  } else {
    setName("");
  }
};

export const checkPos = (pos, setPos) => {
  if (pos === "") {
    return setPos("Chức vụ không được bỏ trống");
  } else {
    setPos("");
  }
  if (pos.length < 2) {
    return setPos("Chức vụ tối thiểu 2 ký tự");
  } else {
    setPos("");
  }
  if (pos.length > 50) {
    return setPos("Chức vụ tối đa 50 ký tự");
  } else {
    setPos("");
  }
};

export const checkImg = (img, setImg) => {
  if (img === null) {
    return setImg("Hình đại diện không được bỏ trống");
  } else {
    setImg("");
  }
};
