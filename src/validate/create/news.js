import { checkLinkWeb } from "../../configs/regex";

export const checkTitle = (title, setTitle) => {
  if (title === "") {
    return setTitle("Tiêu đề không được bỏ trống");
  } else {
    setTitle("");
  }
  if (title.length < 10) {
    return setTitle("Tiêu đề tối thiểu 10 ký tự");
  } else {
    setTitle("");
  }
  if (title.length > 200) {
    return setTitle("Tiêu đề tối đa 200 ký tự");
  } else {
    setTitle("");
  }
};

export const checkSummary = (sum, setSum) => {
  if (sum === "") {
    return setSum("Tóm tắt không được bỏ trống");
  } else {
    setSum("");
  }
  if (sum.length < 10) {
    return setSum("Tóm tắt tối thiểu 10 ký tự");
  } else {
    setSum("");
  }
  if (sum.length > 400) {
    return setSum("Tóm tắt tối đa 400 ký tự");
  } else {
    setSum("");
  }
};

export const checkHash = (hash, setHash) => {
  if (hash.length > 5) {
    return setHash("Chỉ được chọn tối đa 5 hashtag");
  } else {
    setHash("");
  }
};

export const checkThumbnail = (thum, setThum) => {
  if (thum === "") {
    return setThum("Hình mô tả không được bỏ trống");
  } else {
    setThum("");
  }
};

export const checkLinkTitle = (title, setT) => {
  if (title === "") {
    return setT("Tiêu đề không được bỏ trống");
  } else {
    setT("");
  }
  if (title.length > 200) {
    return setT("Tiêu đề tối đa 200 ký tự");
  } else {
    setT("");
  }
};

export const checkLinkDate = (date, setD) => {
  if (date === undefined) {
    return setD("Ngày đăng tải không được bỏ trống");
  } else {
    setD("");
  }
};

export const checkResource = (resource, setR) => {
  if (resource === "") {
    return setR("Nguồn bài viết không được bỏ trống");
  } else {
    setR("");
  }
  if (resource.length > 50) {
    return setR("Nguồn bài viết tối đa 50 ký tự");
  } else {
    setR("");
  }
};

export const checkLink = (link, setL) => {
  if (link === "") {
    return setL("Link bài viết không được bỏ trống");
  } else {
    setL("");
  }
  if (link.length > 400) {
    return setL("Link bài viết tối đa 400 ký tự");
  } else {
    setL("");
  }
  if (checkLinkWeb.test(link) === false) {
    return setL("Link không đúng định dạng.(Nhấn (i) để xem chi tiết)");
  } else {
    setL("");
  }
};
