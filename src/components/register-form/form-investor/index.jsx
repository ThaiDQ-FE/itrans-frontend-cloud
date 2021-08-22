import React, { useEffect, useState } from "react";
import "./styles.scss";
import axios from "axios";
import "antd/dist/antd.css";
import { Input, Select, Tooltip, Spin } from "antd";
import Messages from "../../../assets/message/text";
import Images from "../../../assets/images/images";
import { useDispatch, useSelector } from "react-redux";
import {
  getListIndustry,
  getListProvince,
  getListProvinceInvestor,
  getListRegion,
  getListRegionInvestor,
  getListStage,
} from "../../../store/action/register.action";
import { storage } from "../../../configs/firebase";
import { getLocalStorage } from "../../../assets/helper/helper";
function FormInvestor(props) {
  const { Option } = Select;
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const {
    listProvince,
    listStage,
    listIndustry,
    listRegion,
    listProvinceInvestor,
    listRegionInvestor,
  } = useSelector((state) => state.register);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [information, setInformation] = useState({
    name: "",
    industry: "",
    stage: "",
    foundedYear: "",
    numberOfEmployee: "",
    idProvince: "",
    link: "",
    description: "",
    region: "",
    province: "",
    min: "",
    max: "",
    taxCode: "",
  });
  const saveData = getLocalStorage("Form2Investor");
  const imageData = getLocalStorage("image");
  if (saveData !== null) {
    setInformation({
      name: saveData.name,
      industry: saveData.industry,
      stage: saveData.stage,
      foundedYear: saveData.foundedYear,
      numberOfEmployee: saveData.numberOfEmployee,
      idProvince: saveData.idProvince,
      link: saveData.link,
      description: saveData.link,
      region: saveData.region,
      province: saveData.province,
      min: saveData.min,
      max: saveData.max,
      taxCode: saveData.taxCode,
    });
    if (imageData !== null) {
      setUrl(imageData);
    }
    localStorage.removeItem("image");
    localStorage.removeItem("Form2Investor");
  }
  const listIdProvinceDefaul = () => {
    let array = "";
    listProvince.map((value) => {
      if (value.idProvince.toString() === information.idProvince) {
        array = value.name;
      }
    });
    return array;
  };
  const listRegionDefaul = () => {
    let array = [];
    if (information.region !== undefined && information.region !== "") {
      listRegion.map((value) => {
        information.region.map((valueS) => {
          if (value.idRegion.toString() === valueS.toString()) {
            array.push(value.name);
          }
        });
      });
      return array;
    }
  };
  const listIndustryDefaul = () => {
    let array = [];
    if (information.industry !== undefined && information.industry !== "") {
      listIndustry.map((value) => {
        information.industry.map((valueS) => {
          if (value.idIndustry.toString() === valueS.toString()) {
            array.push(value.name);
          }
        });
      });
      return array;
    }
  };
  const listProvinceDefaul = () => {
    let array = [];
    if (information.province !== undefined && information.province !== "") {
      listProvince.map((value) => {
        information.province.map((valueS) => {
          if (value.idProvince.toString() === valueS.toString()) {
            array.push(value.name);
          }
        });
      });
    }
    return array;
  };
  const listStageDefaul = () => {
    let array = [];
    console.log(information.stage);
    if (information.stage !== undefined && information.stage !== "") {
      listStage.map((value) => {
        information.stage.map((valueS) => {
          if (value.idStage.toString() === valueS.toString()) {
            array.push(value.name);
          }
        });
      });
    }
    return array;
  };
  const [imageError, setImageError] = useState("");
  const [imageColor, setImageColor] = useState("");
  const [image, setImage] = useState(null);
  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
    const image = e.target.files[0];
    if (image !== undefined) {
      if (image.type.includes("image/")) {
        if (image.name.length > 40) {
          setImageError("Tên hình chỉ tối đa 40 ký tự");
          setImageColor("1px solid red");
        } else if (image.size > 4194304) {
          setImageError("Kích thước hình ảnh tối đa 4MB");
          setImageColor("1px solid red");
        } else {
          setImageError("");
          setImageColor("");
          const upload = storage.ref(`images/${image.name}`).put(image);
          upload.on(
            "state_changed",
            (snapshot) => {
              if (snapshot.state === "running") {
                setLoading(true);
              }
            },
            (error) => {
              console.log(error);
            },
            () => {
              storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then((url) => {
                  setUrl(url);
                  setLoading(false);
                  localStorage.setItem("image", JSON.stringify(url));
                });
            }
          );
        }
      }
    } else {
      setUrl(Images.NO_IMAGE);
    }
  };
  // const getBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = error => reject(error);
  //     reader.readAsDataURL(file);
  //   });
  // }
  let check = 0;
  const regex = new RegExp("^[0-9]*$");
  const regexFloat = /^\d+(\.\d+)?$/;
  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Tên nhà/quỹ đầu tư không được để trống";
    } else {
      errors.name = "";
      check++;
    }
    if (!values.foundedYear) {
      errors.foundedYear = "Năm thành lập không được để trống";
    } else if (values.foundedYear < 1900 || values.foundedYear > 2021) {
      errors.foundedYear = "Năm thành lập từ 1900 - 2021";
    } else if (!regex.test(values.foundedYear)) {
      errors.foundedYear = "Năm thành lập phải là số";
    } else {
      errors.foundedYear = "";
      check++;
    }
    if (!values.numberOfEmployee) {
      errors.numberOfEmployee = "Số lượng thành viên không được để trống";
    } else if (values.numberOfEmployee < 0) {
      errors.numberOfEmployee = "Số lượng thành viên phải lớn hơn 0";
    } else if (!regex.test(values.numberOfEmployee)) {
      errors.numberOfEmployee = "Số lượng thành viên phải là số";
    } else {
      errors.numberOfEmployee = "";
      check++;
    }
    if (!values.link) {
      errors.link = "Link web không được để trống";
    } else if (!validateEmail(values.link)) {
      errors.link = "Link web không đúng";
    } else {
      errors.link = "";
      check++;
    }
    if (!values.idProvince) {
      errors.idProvince = "Trụ sở chính không được để trống";
    } else {
      errors.idProvince = "";
      check++;
    }
    if (!values.stage || values.stage.length === 0) {
      errors.stage = "Giai đoạn muốn đầu tư không được để trống";
    } else {
      errors.stage = "";
      check++;
    }
    if (!values.industry || values.industry.length === 0) {
      errors.industry = "Linh vực kinh doanh muốn đầu tư không được để trống";
    } else {
      errors.industry = "";
      check++;
    }
    if (
      (!values.province && !values.region) ||
      (values.province.length === 0 && values.region.length === 0)
    ) {
      errors.province = "Khu vực đầu tư không được để trống";
      errors.region = "Vùng miền đầu tư không được để trống";
    } else {
      errors.province = "";
      errors.region = "";
      check++;
    }
    if (!values.min) {
      errors.min = "Số tiền nhỏ nhất có thể đầu tư không được để trống";
    } else if (values.min < 0) {
      errors.min = "Số tiền nhỏ nhất phải lớn hơn hoặc bằng 0";
    } else if (!regexFloat.test(values.min)) {
      errors.min = "Số tiền nhỏ nhất phải là số";
    } else {
      errors.min = "";
      check++;
    }

    console.log(regexFloat.test(values.max));
    if (!values.max) {
      errors.max = "Số tiền lớn nhất có thể đầu tư không được để trống";
    } else if (values.max <= 0) {
      errors.max = "Số tiền lớn nhất phải lớn hơn 0";
    } else if (!regexFloat.test(values.max)) {
      errors.max = "Số tiền lớn nhất phải là số";
    } else if (parseFloat(values.min) >= parseFloat(values.max)) {
      errors.max = "Số tiền lớn nhất phải lớn hơn số tiền nhỏ nhất";
    } else {
      errors.max = "";
      check++;
    }
    if (!values.taxCode) {
      errors.taxCode = "";
      check++;
    } else if (values.taxCode.length != 10 || values.taxCode.length != 14) {
      errors.taxCode = "Mã số thuế không đúng";
      if (values.taxCode.length == 14) {
        if (values.taxCode.substring(10, 11) === "-") {
          errors.taxCode = "";
          check++;
        } else {
          errors.taxCode = "Mã số thuế không đúng";
        }
      } else if (values.taxCode.length == 10) {
        errors.taxCode = "";
        check++;
      }
    } else {
      errors.taxCode = "";
      check++;
    }
    return errors;
  };
  const validateColor = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "1px solid red";
    } else {
      errors.name = "";
    }
    if (!values.foundedYear) {
      errors.foundedYear = "1px solid red";
    } else if (values.foundedYear < 1900 || values.foundedYear > 2021) {
      errors.foundedYear = "1px solid red";
    } else if (!regex.test(values.foundedYear)) {
      errors.foundedYear = "1px solid red";
    } else {
      errors.foundedYear = "";
    }
    if (!values.numberOfEmployee) {
      errors.numberOfEmployee = "1px solid red";
    } else if (values.numberOfEmployee < 0) {
      errors.numberOfEmployee = "1px solid red";
    } else if (!regex.test(values.numberOfEmployee)) {
      errors.numberOfEmployee = "1px solid red";
    } else {
      errors.numberOfEmployee = "";
    }
    if (!values.link) {
      errors.link = "1px solid red";
    } else if (!validateEmail(values.link)) {
      errors.link = "1px solid red";
    } else {
      errors.link = "";
    }
    if (!values.idProvince) {
      errors.idProvince = "1px solid red";
    } else {
      errors.idProvince = "";
    }
    if (!values.stage || values.stage.length === 0) {
      errors.stage = "1px solid red";
    } else {
      errors.stage = "";
    }
    if (!values.industry || values.industry.length === 0) {
      errors.industry = "1px solid red";
    } else {
      errors.industry = "";
    }
    if (
      (!values.province && !values.region) ||
      (values.province.length === 0 && values.region.length === 0)
    ) {
      errors.province = "1px solid red";
      errors.region = "1px solid red";
    } else {
      errors.province = "";
      errors.region = "";
    }
    if (!values.min) {
      errors.min = "1px solid red";
    } else if (values.min < 0) {
      errors.min = "1px solid red";
    } else if (!regexFloat.test(values.min)) {
      errors.min = "1px solid red";
    } else {
      errors.min = "";
    }
    if (!values.max) {
      errors.max = "1px solid red";
    } else if (values.max <= 0) {
      errors.max = "1px solid red";
    } else if (!regexFloat.test(values.max)) {
      errors.max = "1px solid red";
    } else if (parseFloat(values.min) >= parseFloat(values.max)) {
      errors.max = "1px solid red";
    } else {
      errors.max = "";
    }
    if (!values.taxCode) {
      errors.taxCode = "";
    } else if (values.taxCode.length != 10 || values.taxCode.length != 14) {
      errors.taxCode = "1px solid red";
      if (values.taxCode.length == 14) {
        if (values.taxCode.substring(10, 11) === "-") {
          errors.taxCode = "";
        } else {
          errors.taxCode = "1px solid red";
        }
      } else if (values.taxCode.length == 10) {
        errors.taxCode = "";
      }
    } else {
      errors.taxCode = "";
    }
    return errors;
  };
  const [errors, setErrors] = useState({
    name: "",
    industry: "",
    stage: "",
    foundedYear: "",
    numberOfEmployee: "",
    idProvince: "",
    link: "",
    description: "",
    region: "",
    province: "",
    min: "",
    max: "",
    taxCode: "",
  });
  const [color, setColor] = useState({
    name: "",
    industry: "",
    stage: "",
    foundedYear: "",
    numberOfEmployee: "",
    idProvince: "",
    link: "",
    description: "",
    region: "",
    province: "",
    min: "",
    max: "",
    taxCode: "",
  });
  function validateEmail(email) {
    var re = /\S+\.\S+/;
    return re.test(email);
  }

  const handleNext = () => {
    localStorage.setItem("Form2Investor", JSON.stringify(information));
    localStorage.setItem("image", JSON.stringify(url));
    setErrors(validate(information));
    setColor(validateColor(information));
    if (url === "" || url === Images.NO_IMAGE) {
      setImageError("Hình không được để trống");
      setImageColor("1px solid red");
    } else {
      if (check == 11) {
        props.handleNext();
      }
    }
  };

  const handleBack = () => {
    localStorage.setItem("Form2Investor", JSON.stringify(information));
    localStorage.setItem("image", JSON.stringify(url));
    props.handleBack();
  };
  const handleChangeInput = (event) => {
    const { value, name } = event.target;
    setInformation({
      ...information,
      [name]: value,
    });
  };
  const handleChangeIdProvince = (value, action) => {
    setInformation({
      ...information,
      idProvince: action.key,
    });
  };
  const handleChangeRegion = (value, action) => {
    let valueAction = [];
    for (let index = 0; index < action.length; index++) {
      valueAction.push(parseInt(action[index].key));
    }

    let url =
      "https://itrans2021.herokuapp.com/api/v1/auth/get-province-investor?";
    let urlNone = "";
    valueAction.map((value, index) => {
      let params = `idRegion=${value}`;
      if (index === valueAction.length - 1) {
        urlNone = urlNone + params;
      } else {
        urlNone = urlNone + params + `&`;
      }
    });
    dispatch(getListProvinceInvestor(url, urlNone));
    setInformation({
      ...information,
      region: valueAction,
    });
  };
  const handleChangeProvince = (value, action) => {
    let valueAction = [];
    for (let index = 0; index < action.length; index++) {
      valueAction.push(parseInt(action[index].key));
    }
    let url =
      "https://itrans2021.herokuapp.com/api/v1/auth/get-region-investor?";
    let urlNone = "";
    valueAction.map((value, index) => {
      let params = `idProvince=${value}`;
      if (index === valueAction.length - 1) {
        urlNone = urlNone + params;
      } else {
        urlNone = urlNone + params + `&`;
      }
    });
    dispatch(getListRegionInvestor(url, urlNone));
    setInformation({
      ...information,
      province: valueAction,
    });
  };
  const handleChangeIndustry = (value, action) => {
    let valueAction = [];
    for (let index = 0; index < action.length; index++) {
      valueAction.push(parseInt(action[index].key));
    }
    setInformation({
      ...information,
      industry: valueAction,
    });
  };

  const handleChangeStage = (value, action) => {
    let valueAction = [];
    for (let index = 0; index < action.length; index++) {
      valueAction.push(parseInt(action[index].key));
    }
    setInformation({
      ...information,
      stage: valueAction,
    });
  };

  let renderListProvince = () => {
    return listProvince.map((item, index) => {
      return (
        <Option name="idProvince" value={item.name} key={item.idProvince}>
          {item.name}
        </Option>
      );
    });
  };
  let renderListProvinceOr = () => {
    return listProvinceInvestor.map((item, index) => {
      return (
        <Option name="province" value={item.name} key={item.idProvince}>
          {item.name}
        </Option>
      );
    });
  };
  let renderListStage = () => {
    return listStage.map((item, index) => {
      return (
        <Option name="stage" value={item.name} key={item.idStage}>
          {item.name}
        </Option>
      );
    });
  };
  let renderListRegion = () => {
    return listRegionInvestor.map((item, index) => {
      return (
        <Option name="region" value={item.name} key={item.idRegion}>
          {item.name}
        </Option>
      );
    });
  };
  let renderListIndustry = () => {
    return listIndustry.map((item, index) => {
      return (
        <Option
          name="industry"
          value={item.name}
          key={item.idIndustry}
          disabled={item.active === false}
        >
          {item.name}
        </Option>
      );
    });
  };
  useEffect(() => {
    dispatch(getListProvince());
    dispatch(getListIndustry());
    dispatch(getListStage());
    dispatch(getListRegion());
    dispatch(
      getListProvinceInvestor(
        "https://itrans2021.herokuapp.com/api/v1/auth/get-province-investor",
        ""
      )
    );
    dispatch(
      getListRegionInvestor(
        "https://itrans2021.herokuapp.com/api/v1/auth/get-region-investor",
        ""
      )
    );
    // localStorage.setItem("Form2Investor", JSON.stringify(information));
  }, []);
  return (
    <div className="fi__wrapper">
      <div className="fi__container">
        <h2>{Messages.INVESTOR_INFORMATION}</h2>
        <form className="fi__form">
          <div className="fi__basicInfo">
            <div className="fi__basicImageWrapper">
              <label className="label__fontWeight">Hình đại diện</label>
              <Tooltip title={imageError} placement="topRight" color="red">
                <div style={{ border: imageColor }} className="fi__imageInfo">
                  <img
                    src={url || Images.NO_IMAGE}
                    alt=""
                    className="fi__userLogo"
                  />
                  <input
                    className="fi__file"
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={handleChangeImage}
                  />
                  <label htmlFor="file" className="fi__span">
                    <img
                      src={Images.CAMERA}
                      alt="camera"
                      className="fi__camera"
                    />
                    {loading === true ? (
                      <Spin className="modal__inLABELSpin" />
                    ) : (
                      <></>
                    )}
                  </label>
                </div>
              </Tooltip>
            </div>
            <div className="fi__infoBasic">
              <div className="fi__lineOne">
                <div className="fi__tenNhaQuyDauTu">
                  <small className="label__fontWeight">
                    Tên nhà/quỹ đầu tư
                  </small>
                  <Tooltip title={errors.name} placement="topRight" color="red">
                    <Input
                      placeholder="VD: Quỹ đầu tư A"
                      value={information.name}
                      style={{ border: color.name }}
                      name="name"
                      size="large"
                      onChange={handleChangeInput}
                    />
                  </Tooltip>
                </div>
                <div className="fi__namThanhLap">
                  <small className="label__fontWeight">Năm thành lập</small>
                  <Tooltip
                    title={errors.foundedYear}
                    placement="topRight"
                    color="red"
                  >
                    <Input
                      placeholder="VD: 1998"
                      type="text"
                      maxLength="9"
                      style={{ border: color.foundedYear, textAlign: "end" }}
                      value={information.foundedYear}
                      name="foundedYear"
                      size="large"
                      onChange={handleChangeInput}
                    />
                  </Tooltip>
                </div>
                <div className="fi__soLuongThanhVien">
                  <small className="label__fontWeight">Số thành viên</small>
                  <Tooltip
                    title={errors.numberOfEmployee}
                    placement="topRight"
                    color="red"
                  >
                    <Input
                      placeholder="VD: 1658"
                      type="text"
                      maxLength="9"
                      style={{
                        border: color.numberOfEmployee,
                        textAlign: "end",
                      }}
                      name="numberOfEmployee"
                      value={information.numberOfEmployee}
                      size="large"
                      onChange={handleChangeInput}
                    />
                  </Tooltip>
                </div>
              </div>
              <div className="fi__lineTwo">
                <div className="fi__linkWebsite">
                  <small className="label__fontWeight">Link website</small>
                  <Tooltip title={errors.link} placement="topRight" color="red">
                    <Input
                      style={{ border: color.link }}
                      name="link"
                      size="large"
                      onChange={handleChangeInput}
                      value={information.link}
                      placeholder="VD: https://www.facebook.com/"
                    />
                  </Tooltip>
                </div>
                <div className="fi__truSoChinh">
                  <small className="label__fontWeight">Trụ sở chính</small>
                  <Tooltip
                    title={errors.idProvince}
                    placement="topRight"
                    color="red"
                  >
                    <Select
                      className="fi__selectHead"
                      style={{ border: color.idProvince }}
                      name="idProvince"
                      onChange={handleChangeIdProvince}
                      defaultValue={listIdProvinceDefaul}
                      size="large"
                      placeholder="VD: Bến Tre"
                    >
                      {renderListProvince()}
                    </Select>
                  </Tooltip>
                </div>
                {/* Tax code */}
                <div className="fi__taxCode">
                  <small className="label__fontWeight">Mã số thuế</small>
                  <Tooltip
                    title={errors.taxCode}
                    placement="topRight"
                    color="red"
                  >
                    <Input
                      style={{ border: color.taxCode }}
                      name="taxCode"
                      size="large"
                      type="text"
                      onChange={handleChangeInput}
                      value={information.taxCode}
                      // placeholder="VD: https://www.facebook.com/"
                    />
                  </Tooltip>
                </div>
                {/* end tax code */}
              </div>
            </div>
          </div>
          <hr style={{ width: 200, margin: "20px auto" }} />
          <div className="fi__investmentInfo">
            <div className="fi__iLineOne">
              <div className="fi__giaiDoanMuonDauTu">
                <small className="label__fontWeight">Giai đoạn đầu tư</small>
                <Tooltip title={errors.stage} placement="topRight" color="red">
                  <Select
                    style={{ border: color.stage }}
                    name="stage"
                    mode="multiple"
                    placeholder="Chọn một hoặc nhiều giai đoạn"
                    onChange={handleChangeStage}
                    defaultValue={listStageDefaul}
                    size="large"
                    className="fi__selectStage"
                    bordered={false}
                  >
                    {renderListStage()}
                  </Select>
                </Tooltip>
              </div>
              <div className="fi__linhVucKinhDoanhMuonDauTu">
                <small className="label__fontWeight">
                  Lĩnh vực kinh doanh đầu tư
                </small>
                <Tooltip
                  title={errors.industry}
                  placement="topRight"
                  color="red"
                >
                  <Select
                    className="fi__selectIndus"
                    style={{ border: color.industry }}
                    name="industry"
                    mode="multiple"
                    placeholder="Chọn một hoặc nhiều lĩnh vực"
                    onChange={handleChangeIndustry}
                    defaultValue={listIndustryDefaul}
                    size="large"
                    bordered={false}
                  >
                    {renderListIndustry()}
                  </Select>
                </Tooltip>
              </div>
            </div>
            <div className="fi__iLineTwo">
              <div className="fi__ul">
                <small className="label__fontWeight">Vùng miền đầu tư</small>
                <Tooltip title={errors.region} placement="topRight" color="red">
                  <Select
                    style={{ border: color.region }}
                    name="region"
                    mode="multiple"
                    placeholder="Chọn một hoặc nhiều vùng miền"
                    onChange={handleChangeRegion}
                    defaultValue={listRegionDefaul}
                    size="large"
                    bordered={false}
                    className="fi__selectVMDT"
                  >
                    {renderListRegion()}
                  </Select>
                </Tooltip>
              </div>
              <div className="fi__khuVucDauTu">
                <small className="label__fontWeight">Khu vực đầu tư</small>
                <Tooltip
                  title={errors.province}
                  placement="topRight"
                  color="red"
                >
                  <Select
                    style={{ border: color.province }}
                    name="province"
                    mode="multiple"
                    placeholder="Chọn một hoặc nhiều khu vực"
                    onChange={handleChangeProvince}
                    defaultValue={listProvinceDefaul}
                    size="large"
                    bordered={false}
                    className="fi__selectKVDT"
                  >
                    {renderListProvinceOr()}
                  </Select>
                </Tooltip>
              </div>
              <div className="fi__moneyWrapper">
                <label className="label__fontWeight">Số tiền đầu tư</label>
                <div className="fi__moneyContainer">
                  <div className="fi_min">
                    <Tooltip
                      title={errors.min}
                      placement="topRight"
                      color="red"
                    >
                      <Input
                        type="text"
                        maxLength="9"
                        addonAfter="Tỷ VNĐ"
                        style={{ border: color.min, textAlign: "end" }}
                        name="min"
                        value={information.min}
                        size="large"
                        onChange={handleChangeInput}
                      />
                    </Tooltip>
                  </div>
                  <span style={{ lineHeight: 2.5, margin: "0 10px" }}> - </span>
                  <div className="fi_max">
                    <Tooltip
                      title={errors.max}
                      placement="topRight"
                      color="red"
                    >
                      <Input
                        type="text"
                        maxLength="9"
                        addonAfter="Tỷ VNĐ"
                        style={{ border: color.max, textAlign: "end" }}
                        name="max"
                        value={information.max}
                        size="large"
                        onChange={handleChangeInput}
                      />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="fi__lineOne">
            <div className="fi__tenNhaQuyDauTu">
              <small>Tên nhà/quỹ đầu tư</small>
              <Tooltip title={errors.name} placement="topRight" color="red">
                <Input
                  value={information.name}
                  style={{ border: color.name }}
                  name="name"
                  size="large"
                  onChange={handleChangeInput}
                />
              </Tooltip>
            </div>
            <div className="fi__namThanhLap">
              <small>Năm thành lập</small>
              <Tooltip
                title={errors.foundedYear}
                placement="topRight"
                color="red"
              >
                <Input
                  type="text"
                  maxLength="9"
                  style={{ border: color.foundedYear }}
                  value={information.foundedYear}
                  name="foundedYear"
                  size="large"
                  onChange={handleChangeInput}
                />
              </Tooltip>
            </div>
            <div className="fi__soLuongThanhVien">
              <small>Số thành viên</small>
              <Tooltip
                title={errors.numberOfEmployee}
                placement="topRight"
                color="red"
              >
                <Input
                  type="text"
                  maxLength="9"
                  style={{ border: color.numberOfEmployee }}
                  name="numberOfEmployee"
                  value={information.numberOfEmployee}
                  size="large"
                  onChange={handleChangeInput}
                />
              </Tooltip>
            </div>
          </div>
          <div className="fi__lineTwo">
            <div className="fi__linkKhuUl">
              <div className="fi__linkWebsite">
                <small>Link website</small>
                <Tooltip title={errors.link} placement="topRight" color="red">
                  <Input
                    style={{ border: color.link }}
                    name="link"
                    size="large"
                    onChange={handleChangeInput}
                    value={information.link}
                  />
                </Tooltip>
              </div>
              <div className="fi__khuUl">
                <div className="fi__khuVucHoatDong">
                  <small>Trụ sở chính</small>
                  <Tooltip
                    title={errors.idProvince}
                    placement="topRight"
                    color="red"
                  >
                    <Select
                      style={{ border: color.idProvince }}
                      name="idProvince"
                      onChange={handleChangeIdProvince}
                      defaultValue={listIdProvinceDefaul}
                      size="large"
                    >
                      {renderListProvince()}
                    </Select>
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="fi__logo">
              <img
                src={url || Images.NO_IMAGE}
                alt=""
                className="fi__userLogo"
              />
              <input
                className="fi__file"
                type="file"
                id="file"
                onChange={handleChangeImage}
              />
              <label htmlFor="file" className="fi__span">
                <img src={Images.CAMERA} alt="camera" className="fi__camera" />
              </label>
            </div>
          </div>
          <p className="fi__word">Thông tin về đầu tư</p>
          <div className="fi__lineFour">
            <div className="fi__giaiDoanMuonDauTu">
              <small>Giai đoạn đầu tư</small>
              <Tooltip title={errors.stage} placement="topRight" color="red">
                <Select
                  style={{ border: color.stage }}
                  name="stage"
                  mode="multiple"
                  placeholder="Chọn một hoặc nhiều giai đoạn"
                  onChange={handleChangeStage}
                  defaultValue={listStageDefaul}
                  size="large"
                >
                  {renderListStage()}
                </Select>
              </Tooltip>
            </div>
            <div className="fi__linhVucKinhDoanhMuonDauTu">
              <small>Lĩnh vực kinh doanh đầu tư</small>
              <Tooltip title={errors.industry} placement="topRight" color="red">
                <Select
                  style={{ border: color.industry }}
                  name="industry"
                  mode="multiple"
                  placeholder="Chọn một hoặc nhiều lĩnh vực"
                  onChange={handleChangeIndustry}
                  defaultValue={listIndustryDefaul}
                  size="large"
                >
                  {renderListIndustry()}
                </Select>
              </Tooltip>
            </div>
          </div>
          <div className="fi__lineFive">
            <div className="fi__khuVucDauTu">
              <small>Khu vực đầu tư</small>
              <Tooltip title={errors.province} placement="topRight" color="red">
                <Select
                  style={{ border: color.province }}
                  name="province"
                  mode="multiple"
                  placeholder="Chọn một hoặc nhiều khu vực"
                  onChange={handleChangeProvince}
                  defaultValue={listProvinceDefaul}
                  size="large"
                >
                  {renderListProvinceOr()}
                </Select>
              </Tooltip>
            </div>
            <div className="fi__ul">
              <small>Vùng miền đầu tư</small>
              <Tooltip title={errors.region} placement="topRight" color="red">
                <Select
                  style={{ border: color.region }}
                  name="region"
                  mode="multiple"
                  placeholder="Chọn một hoặc nhiều vùng miền"
                  onChange={handleChangeRegion}
                  defaultValue={listRegionDefaul}
                  size="large"
                >
                  {renderListRegion()}
                </Select>
              </Tooltip>
            </div>
          </div>
          <div className="fi__lineSix">
            <div className="fi_min">
              <small>Số tiền nhỏ nhất có thể đầu tư</small>
              <Tooltip title={errors.min} placement="topRight" color="red">
                <Input
                  type="text"
                  maxLength="9"
                  addonAfter="Tỷ VNĐ"
                  style={{ border: color.min }}
                  name="min"
                  value={information.min}
                  size="large"
                  onChange={handleChangeInput}
                />
              </Tooltip>
            </div>
            <div className="fi_max">
              <small>Số tiền lớn nhất có thể đầu tư</small>
              <Tooltip title={errors.max} placement="topRight" color="red">
                <Input
                  type="text"
                  maxLength="9"
                  addonAfter="Tỷ VNĐ"
                  style={{ border: color.max }}
                  name="max"
                  value={information.max}
                  size="large"
                  onChange={handleChangeInput}
                />
              </Tooltip>
            </div>
          </div> */}
        </form>
        <div className="fi__button">
          <div className="fi__buttonBack" onClick={handleBack}>
            <img src={Images.RIGHT_ARROWS} alt="back" />
            <span>Quay lại</span>
          </div>
          <div className="fi__buttonNext" onClick={handleNext}>
            <img src={Images.RIGHT_ARROWS} alt="next" />
            <span>Tiếp theo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FormInvestor;
