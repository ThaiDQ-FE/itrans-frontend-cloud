import React, { useEffect, useState } from "react";
import "./styles.scss";
import "antd/dist/antd.css";
import { Input, Select, Tooltip, Spin } from "antd";
import Messages from "../../../assets/message/text";
import Images from "../../../assets/images/images";
import {
  getListIndustry,
  getListProvince,
  getListStage,
} from "../../../store/action/register.action";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../../../configs/firebase";
import { getLocalStorage } from "../../../assets/helper/helper";
function FormInformationAboutTheOrganization(props) {
  const { Option } = Select;
  const { TextArea } = Input;
  const children = [];
  const dispatch = useDispatch();
  const { listProvince, listStage, listIndustry } = useSelector(
    (state) => state.register
  );

  const [imageError, setImageError] = useState(""
  );
  const [imageColor, setImageColor] = useState(""
  );
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const handleChangeImage = (e) => {
    const image = e.target.files[0];
    if (image != undefined) {
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
  const [information, setInformation] = useState({
    name: "",
    industry: "",
    stage: "",
    foundedYear: "",
    numberOfEmployee: "",
    province: "",
    link: "",
    taxCode: ""
    // description: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    industry: "",
    stage: "",
    foundedYear: "",
    numberOfEmployee: "",
    province: "",
    link: "",
    taxCode: ""
    // description: "",
  });
  const [color, setColor] = useState({
    name: "",
    industry: "",
    stage: "",
    foundedYear: "",
    numberOfEmployee: "",
    province: "",
    link: "",
    taxCode: ""
    // description: "",
  });

  const saveData = getLocalStorage("Form2");
  const imageData = getLocalStorage("image");
  if (saveData !== null) {
    setInformation({
      name: saveData.name,
      industry: saveData.industry,
      stage: saveData.stage,
      foundedYear: saveData.foundedYear,
      numberOfEmployee: saveData.numberOfEmployee,
      link: saveData.link,
      region: saveData.region,
      province: saveData.province,
      taxCode: saveData.taxCode
    });
    if (imageData !== null) {
      setUrl(imageData);
    }
    localStorage.removeItem("image");
    localStorage.removeItem("Form2");
  }
  let check = 0;
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
    let array = "";
    if (information.stage !== undefined && information.stage !== "") {
      listStage.map((value) => {
        if (value.idStage.toString() === information.stage) {
          array = value.name;
        }
      });
    }
    return array;
  };
  const regex = new RegExp("^[0-9]*$");
  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Tên tổ chức không được để trống";
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
    if (!values.stage) {
      errors.stage = "Giai đoạn phát triển không được để trống";
    } else {
      errors.stage = "";
      check++;
    }
    if (!values.industry) {
      errors.industry = "Linh vực kinh doanh không được để trống";
    } else {
      errors.industry = "";
      check++;
    }
    if (!values.province) {
      errors.province = "Khu vực hoạt động không được để trống";
    } else {
      errors.province = "";
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
    // if (!values.description) {
    //   errors.description = "Mô tả về doanh nghiệp không được để trống";
    // } else {
    //   errors.description = "";
    //   check++;
    // }
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
    if (!values.stage) {
      errors.stage = "1px solid red";
    } else {
      errors.stage = "";
    }
    if (!values.industry) {
      errors.industry = "1px solid red";
    } else {
      errors.industry = "";
    }
    if (!values.province) {
      errors.province = "1px solid red";
    } else {
      errors.province = "";
    }
    // if (!values.description) {
    //   errors.description = "1px solid red";
    // } else {
    //   errors.description = "";
    // }
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
  function validateEmail(email) {
    var re = /\S+\.\S+/;
    return re.test(email);
  }
  const handleChangeInput = (event) => {
    const { value, name } = event.target;
    setInformation({
      ...information,
      [name]: value,
    });
  };
  const handleNext = () => {
    localStorage.setItem("Form2", JSON.stringify(information));
    localStorage.setItem("image", JSON.stringify(url));
    setErrors(validate(information));
    setColor(validateColor(information));
    if (url === "" || url === Images.NO_IMAGE) {
      setImageError("Hình không được để trống");
      setImageColor("1px solid red");
    } else {
      if (check == 8) {
        props.handleNext();
      }
    }
  };
  const handleBack = () => {
    localStorage.setItem("Form2", JSON.stringify(information));
    localStorage.setItem("image", JSON.stringify(url));
    props.handleBack();
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
    setInformation({
      ...information,
      stage: action.key,
    });
  };
  const handleChangeProvince = (value, action) => {
    let valueAction = [];
    for (let index = 0; index < action.length; index++) {
      valueAction.push(parseInt(action[index].key));
    } setInformation({
      ...information,
      province: valueAction,
    });
  };
  const renderListProvince = () => {
    return listProvince.map((item, index) => {
      return (
        <Option name="province" value={item.name} key={item.idProvince}>
          {item.name}
        </Option>
      );
    });
  };
  const renderListStage = () => {
    return listStage.map((item, index) => {
      return (
        <Option name="stage" value={item.name} key={item.idStage}>
          {item.name}
        </Option>
      );
    });
  };
  const renderListIndustry = () => {
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
  }, []);
  return (
    <div className="fiato__wrapper">
      <div className="fiato__container">
        <h2 style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}>
          {Messages.ORGANIZATION_STEP_2}
        </h2>
        <form className="fiato__form">
          <div className="fiato__basicInfo">
            <div className="fiato__imgWrapper">
              <label className="label__fontWeight">Hình đại diện</label>
              <Tooltip title={imageError} placement="topRight" color="red">
                <div style={{ border: imageColor }} className="fiato__imageInfo">
                  <img
                    src={url || Images.NO_IMAGE}
                    alt=""
                    className="fiato__userLogo"
                  />
                  <input
                    className="fiato__file"
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={handleChangeImage}
                  />
                  <label htmlFor="file" className="fiato__span">
                    <img
                      src={Images.CAMERA}
                      alt="camera"
                      className="fiato__camera"
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

            <div className="fiato__infoBasic">
              <div className="fiato__lineOne">
                <div className="fiato__name">
                  <small className="label__fontWeight">Tên tổ chức</small>
                  <Tooltip title={errors.name} placement="topRight" color="red">
                    <Input
                      style={{ border: color.name }}
                      placeholder="VD: Tổ chức A"
                      value={information.name}
                      name="name"
                      onChange={handleChangeInput}
                      size="large"
                    />
                  </Tooltip>
                </div>
                <div className="fiato__year">
                  <small className="label__fontWeight">Năm thành lập</small>
                  <Tooltip
                    title={errors.foundedYear}
                    placement="topRight"
                    color="red"
                  >
                    <Input
                      placeholder="VD: 1998"
                      style={{ border: color.foundedYear }}
                      name="foundedYear"
                      onChange={handleChangeInput}
                      value={information.foundedYear}
                      type="text"
                      maxLength="9"
                      size="large"
                    />
                  </Tooltip>
                </div>
                <div className="fiato__emp">
                  <small className="label__fontWeight">Số thành viên</small>
                  <Tooltip
                    title={errors.numberOfEmployee}
                    placement="topRight"
                    color="red"
                  >
                    <Input
                      style={{ border: color.numberOfEmployee }}
                      name="numberOfEmployee"
                      type="text"
                      placeholder="VD: 1658"
                      maxLength="9"
                      value={information.numberOfEmployee}
                      onChange={handleChangeInput}
                      size="large"
                    />
                  </Tooltip>
                </div>
              </div>
              <div className="fiato__lineTwo">
                <div className="fiato__linkWebsite">
                  <small className="label__fontWeight">Link Website</small>
                  <Tooltip title={errors.link} placement="topRight" color="red">
                    <Input
                      style={{ border: color.link }}
                      name="link"
                      onChange={handleChangeInput}
                      size="large"
                      value={information.link}
                      placeholder="VD: https://www.facebook.com/"
                    />
                  </Tooltip>
                </div>
                <div className="fiato__giaiDoanPhatTrien">
                  <small className="label__fontWeight">
                    Giai đoạn phát triển
                  </small>
                  <Tooltip
                    title={errors.stage}
                    placement="topRight"
                    color="red"
                  >
                    <Select
                      className="fiato__selectStage"
                      style={{ border: color.stage }}
                      onChange={handleChangeStage}
                      defaultValue={listStageDefaul}
                      name="stage"
                      size="large"
                      allowClear
                    >
                      {renderListStage()}
                    </Select>
                  </Tooltip>
                </div>
                {/* tax code */}
                <div className="fiato__taxCode">
                  <small className="label__fontWeight">Mã số thuế</small>
                  <Tooltip
                    title={errors.taxCode}
                    placement="topRight"
                    color="red"
                  >
                    <Input
                      style={{ border: color.taxCode }}
                      name="taxCode"
                      value={information.taxCode}
                      onChange={handleChangeInput}
                      type="text" size="large" />
                  </Tooltip>
                </div>
                {/* end tax code */}
              </div>
            </div>
          </div>
          <hr style={{ width: 200, margin: "20px auto" }} />
          <div className="fiato__selectInfo">
            <div className="fiato__linhVucKinhDoanh">
              <small className="label__fontWeight">Lĩnh vực kinh doanh</small>
              <Tooltip title={errors.industry} placement="topRight" color="red">
                <Select
                  style={{ border: color.industry }}
                  name="industry"
                  mode="multiple"
                  allowClear
                  onChange={handleChangeIndustry}
                  placeholder="Chọn một hoặc nhiều lĩnh vực"
                  defaultValue={listIndustryDefaul}
                  size="large"
                  className="fiato__selectIndus"
                >
                  {renderListIndustry()}
                </Select>
              </Tooltip>
            </div>
            <div className="fiato__khuVucHoatDong">
              <small className="label__fontWeight">Khu vực hoạt động</small>
              <Tooltip title={errors.province} placement="topRight" color="red">
                <Select
                  style={{ border: color.province }}
                  mode="multiple"
                  allowClear
                  name="province"
                  onChange={handleChangeProvince}
                  placeholder="Chọn một hoặc nhiều khu vực"
                  defaultValue={listProvinceDefaul}
                  size="large"
                  className="fiato__selectPro"
                >
                  {renderListProvince()}
                </Select>
              </Tooltip>
            </div>
          </div>
          {/* <div className="fiato__lineOne">
            <div className="fiato__tenToChuc">
              <small>Tên tổ chức</small>
              <Tooltip title={errors.name} placement="topRight" color="red">
                <Input
                  style={{ border: color.name }}
                  name="name"
                  onChange={handleChangeInput}
                  size="large"
                />
              </Tooltip>
            </div>
            <div className="fiato__linhVucKinhDoanh">
              <small>Lĩnh vực kinh doanh</small>
              <Tooltip title={errors.industry} placement="topRight" color="red">
                <Select
                  style={{ border: color.industry }}
                  name="industry"
                  mode="multiple"
                  allowClear
                  onChange={handleChange}
                  size="large"
                >
                  {renderListIndustry()}
                </Select>
              </Tooltip>
            </div>
          </div>
          <div className="fiato__lineTwo">
            <div className="fiato__giaiDoanPhatTrien">
              <small>Giai đoạn phát triển</small>
              <Tooltip title={errors.stage} placement="topRight" color="red">
                <Select
                  style={{ border: color.stage }}
                  onChange={handleChange}
                  name="stage"
                  size="large"
                  allowClear
                >
                  {renderListStage()}
                </Select>
              </Tooltip>
            </div>
            <div className="fiato__namThanhLap">
              <small>Năm thành lập</small>
              <Tooltip
                title={errors.foundedYear}
                placement="topRight"
                color="red"
              >
                <Input
                  style={{ border: color.foundedYear }}
                  name="foundedYear"
                  onChange={handleChangeInput}
                  type="text"
                  maxLength="9"
                  size="large"
                />
              </Tooltip>
            </div>
            <div className="fiato__soLuongThanhVien">
              <small>Số lượng thành viên</small>
              <Tooltip
                title={errors.numberOfEmployee}
                placement="topRight"
                color="red"
              >
                <Input
                  style={{ border: color.numberOfEmployee }}
                  name="numberOfEmployee"
                  type="text"
                  maxLength="9"
                  onChange={handleChangeInput}
                  size="large"
                />
              </Tooltip>
            </div>
          </div>
          <div className="fiato__lineThree">
            <div className="fiato__khuVucHoatDong">
              <small>Khu vực hoạt động</small>
              <Tooltip title={errors.province} placement="topRight" color="red">
                <Select
                  style={{ border: color.province }}
                  mode="multiple"
                  allowClear
                  name="province"
                  onChange={handleChange}
                  size="large"
                >
                  {renderListProvince()}
                </Select>
              </Tooltip>
            </div>
            <div className="fiato__linkWebsite">
              <small>Link Website</small>
              <Tooltip title={errors.link} placement="topRight" color="red">
                <Input
                  style={{ border: color.link }}
                  name="link"
                  onChange={handleChangeInput}
                  size="large"
                />
              </Tooltip>
            </div>
          </div>
          <div className="fiato__lineFour">
            <div className="fiato__logo">
              <small>&nbsp;</small>
              <img
                src={url || Images.NO_IMAGE}
                alt=""
                className="fiato__userLogo"
              />
              <input
                className="fiato__file"
                type="file"
                id="file"
                onChange={handleChangeImage}
              />
              <label htmlFor="file" className="fiato__span">
                <img
                  src={Images.CAMERA}
                  alt="camera"
                  className="fiato__camera"
                />
              </label>
            </div>
          </div> */}
        </form>
        <div className="fiato__button">
          <div className="fiato__buttonLeft" onClick={handleBack}>
            <img src={Images.RIGHT_ARROWS} alt="" />
            <span>Quay lại</span>
          </div>
          <div onClick={handleNext} className="fiato__buttonRight">
            <img src={Images.RIGHT_ARROWS} alt="" />
            <span>Tiếp theo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FormInformationAboutTheOrganization;
