export const checkTitleMile = (title, setT) => {
  if (title === "") {
    return setT("Tiêu đề không được bỏ trống");
  } else {
    setT("");
  }
  if (title.length < 5) {
    return setT("Tiêu đề tối thiểu 5 ký tự");
  } else {
    setT("");
  }
  if (title.length > 50) {
    return setT("Tiêu đề tối đa 50 ký tự");
  } else {
    setT("");
  }
};

export const checkDateMile = (date, setD) => {
  if (date === undefined) {
    return setD("Tiêu đề không được bỏ trống");
  } else {
    setD("");
  }
};

export const checkContentMile = (content, setC) => {
  if (content.length > 500) {
    return setC("Nội dung tối đa 500 ký tự");
  } else {
    setC("");
  }
};
