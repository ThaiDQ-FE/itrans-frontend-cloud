import { checkRoleUser } from "../../assets/helper/helper";
import { checkLinkWeb } from "../../configs/regex";

export const checkName = (name, setName) => {
  if (name.length === 0) {
    if (checkRoleUser() === "INVESTOR") {
      return setName("Tên nhà/quỹ đầu tư không được bỏ trống");
    } else {
      return setName("Tên tổ chức không được bỏ trống");
    }
  } else {
    setName("");
  }
  if (name.length > 100) {
    if (checkRoleUser() === "INVESTOR") {
      return setName("Tên nhà/quỹ đầu tư tối đa 100 ký tự");
    } else {
      return setName("Tên tổ chức tối đa 100 ký tự");
    }
  } else {
    setName("");
  }
};

export const checkEmp = (emp, setEmp) => {
  const parseNumber = Number(emp);
  if (emp.length === 0) {
    return setEmp("Số thành viên không được bỏ trống");
  } else {
    setEmp("");
  }
  if (parseNumber >= 10000) {
    return setEmp("Số thành viên tối đa 9999 người");
  } else {
    setEmp("");
  }
  if (parseNumber % 1 !== 0) {
    return setEmp("Số thành viên phải là số nguyên dương");
  } else {
    setEmp("");
  }
};

export const checkYear = (year, setYear) => {
  const parseNumber = Number(year);
  if (year.length === 0) {
    return setYear("Năm thành lập không được bỏ trống");
  } else {
    setYear("");
  }
  if (parseNumber < 1900) {
    return setYear("Năm thành lập phải lớn hơn 1900");
  } else {
    setYear("");
  }
  if (parseNumber > 2021) {
    return setYear("Năm thành lập phải từ năm hiện tại trở về trước");
  } else {
    setYear("");
  }
  if (parseNumber % 1 !== 0) {
    return setYear("Năm thành lập phải là số nguyên dương");
  } else {
    setYear("");
  }
};

export const checkLink = (link, setLink) => {
  if (link.length === 0) {
    return setLink("Link website không được bỏ trống");
  } else {
    setLink("");
  }
  if (checkLinkWeb.test(link) === false) {
    return setLink("Link không đúng định dạng.(Nhấn (i) để xem chi tiết)");
  } else {
    setLink("");
  }
  if (link.length > 50) {
    return setLink("Link website tối đa 50 ký tự");
  } else {
    setLink("");
  }
};

export const checkType = (type, setType) => {
  if (type.length === 0) {
    return setType("Nhà đầu tư không được bỏ trống");
  } else {
    setType("");
  }
};

export const checkIndus = (indus, setIndus) => {
  if (indus.length === 0) {
    if (checkRoleUser() === "INVESTOR") {
      return setIndus("Lĩnh vực đầu tư không được bỏ trống");
    } else {
      return setIndus("Lĩnh vực kinh doanh không được bỏ trống");
    }
  } else {
    setIndus("");
  }
};

export const checkPro = (pro, setPro, re) => {
  if (pro.length === 0) {
    if (checkRoleUser() === "INVESTOR") {
      if (pro.length === 0 && re.length === 0) {
        return setPro("Khu vực hoặc vùng miền đầu tư không được bỏ trống");
      } else {
        setPro("");
      }
    } else {
      return setPro("Khu vực hoạt động không được bỏ trống");
    }
  } else {
    setPro("");
  }
};

export const checkRe = (re, setRe, pro) => {
  if (re.length === 0 && pro.length === 0) {
    return setRe("Khu vực hoặc vùng miền đầu tư không được bỏ trống");
  } else {
    setRe("");
  }
};

export const checkStage = (stage, setStage) => {
  if (stage.length === 0) {
    return setStage("Giai đoạn đầu tư không được bỏ trống");
  } else {
    setStage("");
  }
};

export const checkMin = (min, setMin) => {
  const parseNumber = Number(min).toFixed(2);
  if (min.length === 0) {
    return setMin("Số tiền đầu tư thấp nhất không được bỏ trống");
  } else {
    setMin("");
  }
  if (parseNumber < 0) {
    return setMin("Số tiền đầu tư thấp nhất phải lớn hơn 0");
  } else {
    setMin("");
  }
  if (parseNumber > 1000) {
    return setMin("Số tiền đầu tư thấp nhất tối đa 1000");
  } else {
    setMin("");
  }
};

export const checkMax = (min, max, setMax) => {
  const parseNumber = Number(max).toFixed(2);
  const parseNumberMin = Number(min).toFixed(2);
  if (max.length === 0) {
    return setMax("Số tiền đầu tư cao nhất không được bỏ trống ");
  } else {
    setMax("");
  }
  if (parseNumber < 0) {
    return setMax("Số tiền đầu tư cao nhất phải lớn hơn 0");
  } else {
    setMax("");
  }
  if (parseNumber > 1000) {
    return setMax("Số tiền đầu tư cao nhất tối đa 1000");
  } else {
    setMax("");
  }
  if (parseNumber <= parseNumberMin) {
    return setMax(
      "Số tiền đầu tư cao nhất phải lớn hơn số tiền đầu tư thấp nhất"
    );
  } else {
    setMax("");
  }
};
