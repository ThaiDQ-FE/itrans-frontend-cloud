export const checkMoney = (money, setMoney) => {
  const parseMoney = parseFloat(money);
  const finalMoney = parseMoney.toFixed(2);
  if (money === "") {
    return setMoney("Số tiền kêu gọi không được bỏ trống");
  } else {
    setMoney("");
  }
  if (finalMoney <= 0) {
    return setMoney("Số tiền kêu gọi không được nhỏ hơn hoặc bằng 0");
  } else {
    setMoney("");
  }
  if (finalMoney > 1000) {
    return setMoney("Số tiền kêu gọi tối đa 1000 Tỷ VNĐ");
  } else {
    setMoney("");
  }
};
export const checkPercent = (percent, setPercent) => {
  const parsePercent = parseFloat(percent);
  const finalPercent = parsePercent.toFixed(2);
  if (percent === "") {
    return setPercent("Phần trăm cố phần không được bỏ trống");
  } else {
    setPercent("");
  }
  if (finalPercent <= 0) {
    return setPercent("Phần trăm cổ phần không được nhỏ hơn hoặc bằng 0%");
  } else {
    setPercent("");
  }
  if (finalPercent > 100) {
    return setPercent("Phần trăm cổ phần không được lớn hơn 100%");
  } else {
    setPercent("");
  }
};

export const checkStart = (start, setStart) => {
  if (start === undefined) {
    return setStart("Ngày bắt đầu không được bỏ trống");
  } else {
    setStart("");
  }
};

export const checkEnd = (end, setEnd) => {
  if (end === undefined) {
    return setEnd("Ngày kết thúc không được bỏ trống");
  } else {
    setEnd("");
  }
};

export const checkSummary = (sum, setSum) => {
  if (sum === "") {
    return setSum("Mô tả sơ lược không được bỏ trông");
  } else {
    setSum("");
  }
  if (sum.length < 5) {
    return setSum("Mô tả sơ lược tối thiểu 5 ký tự");
  } else {
    setSum("");
  }
  if (sum.length > 500) {
    return setSum("Mô tả sơ lược tối đa 500 ký tự");
  } else {
    setSum("");
  }
};

export const checkThumb = (thumb, setThumb) => {
  if (thumb === "") {
    return setThumb("Hình mô tả không được để trống");
  } else {
    setThumb("");
  }
};
