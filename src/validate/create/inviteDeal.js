export const checkDes = (des, setDes) => {
  if (des.length > 1000) {
    return setDes("Nội dung tối đa 1000 ký tự");
  } else {
    setDes("");
  }
};
