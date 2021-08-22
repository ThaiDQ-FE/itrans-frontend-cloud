import React, { useEffect, useState } from "react";
import "./styles.scss";
import "antd/dist/antd.css";
import { Input, Select, Tooltip } from "antd";
import Messages from "../../assets/message/text";
import Images from "../../assets/images/images";
import {
  getListIndustry,
  getListProvince,
  getListStage,
} from "../../store/action/register.action";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../../configs/firebase";
function FormInformationAboutTheOrganization(props) {
  const { Option } = Select;
  const { TextArea } = Input;
  const children = [];
  const dispatch = useDispatch();
  const { listProvince, listStage, listIndustry } = useSelector(
    (state) => state.register
  );
  const [url, setUrl] = useState("");
  const handleChangeImage = (e) => {
    const image = e.target.files[0];
    if (image != undefined) {
    const upload = storage.ref(`images/${image.name}`).put(image);
    upload.on(
      "state_changed",
      snapshot => { },
      error => {
        console.log(error);
      },
      () => {
        storage.ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            localStorage.setItem('image', JSON.stringify(url));
          })
      }
    )
  }else {
    setUrl(Images.NO_IMAGE);
  }
  }
  const [information, setInformation] = useState({
    name: "",
    industry: "",
    stage: "",
    foundedYear: "",
    numberOfEmployee: "",
    province: "",
    link: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    industry: "",
    stage: "",
    foundedYear: "",
    numberOfEmployee: "",
    province: "",
    link: "",
  });
  const [color, setColor] = useState({
    name: "",
    industry: "",
    stage: "",
    foundedYear: "",
    numberOfEmployee: "",
    province: "",
    link: "",
  });
  let check = 0;
  const regex = new RegExp("^[0-9]*$");
  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = 'Tên tổ chức không được để trống';
    } else {
      errors.name = '';
      check++;
    }
    if (!values.foundedYear) {
      errors.foundedYear = 'Năm thành lập không được để trống';
    } else if (values.foundedYear < 1900 || values.foundedYear > 2021) {
      errors.foundedYear = 'Năm thành lập từ 1900 - 2021';
    } else if (!regex.test(values.foundedYear)) {
      errors.foundedYear = 'Năm thành lập phải là số';
    } else {
      errors.foundedYear = '';
      check++;
    }
    if (!values.numberOfEmployee) {
      errors.numberOfEmployee = 'Số lượng thành viên không được để trống';
    } else if (values.numberOfEmployee < 0) {
      errors.numberOfEmployee = 'Số lượng thành viên phải lớn hơn 0';
    } else if (!regex.test(values.numberOfEmployee)) {
      errors.numberOfEmployee = 'Số lượng thành viên phải là số';
    } else {
      errors.numberOfEmployee = '';
      check++;
    }
    if (!values.link) {
      errors.link = 'Link web không được để trống';
    } else if (!validateEmail(values.link)) {
      errors.link = 'Link web không đúng';
    }
    else {
      errors.link = '';
      check++;
    }
    if (!values.stage) {
      errors.stage = 'Giai đoạn phát triển không được để trống';
    } else {
      errors.stage = '';
      check++;
    }
    if (!values.industry) {
      errors.industry = 'Linh vực kinh doanh không được để trống';
    } else {
      errors.industry = '';
      check++;
    }
    if (!values.province) {
      errors.province = 'Khu vực hoạt động không được để trống';
    } else {
      errors.province = '';
      check++;
    }
    return errors;
  };
  const validateColor = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = '1px solid red';
    } else {
      errors.name = '';
    }
    if (!values.foundedYear) {
      errors.foundedYear = '1px solid red';
    } else if (values.foundedYear < 1900 || values.foundedYear > 2021) {
      errors.foundedYear = '1px solid red';
    } else if (!regex.test(values.foundedYear)) {
      errors.foundedYear = '1px solid red';
    } else {
      errors.foundedYear = '';
    }
    if (!values.numberOfEmployee) {
      errors.numberOfEmployee = '1px solid red';
    } else if (values.numberOfEmployee < 0) {
      errors.numberOfEmployee = '1px solid red';
    } else if (!regex.test(values.numberOfEmployee)) {
      errors.numberOfEmployee = '1px solid red';
    } else {
      errors.numberOfEmployee = '';
    }
    if (!values.link) {
      errors.link = '1px solid red';
    } else if (!validateEmail(values.link)) {
      errors.link = '1px solid red';
    }
    else {
      errors.link = '';
    }
    if (!values.stage) {
      errors.stage = '1px solid red';
    } else {
      errors.stage = '';
    }
    if (!values.industry) {
      errors.industry = '1px solid red';
    } else {
      errors.industry = '';
    }
    if (!values.province) {
      errors.province = '1px solid red';
    } else {
      errors.province = '';
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
    setErrors(validate(information));
    setColor(validateColor(information));
    if (check == 7) {
      props.handleNext();
    }

  };
  const handleChange = (value, action) => {
    if (!action.length) {
      setInformation({
        ...information,
        [action.name]: value,
      });
    } else {
      setInformation({
        ...information,
        [action[0].name]: value,
      });
    }
  };
  const renderListProvince = () => {
    return listProvince.map((item, index) => {
      return (
        <Option name="province" value={item.idProvince} key={item.idProvince}>
          {item.name}
        </Option>
      );
    });
  };
  const renderListStage = () => {
    return listStage.map((item, index) => {
      return (
        <Option name="stage" value={item.idStage} key={index}>
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
          value={item.idIndustry}
          key={index}
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
        <h3>{Messages.ORGANIZATION_STEP_2}</h3>
        <form className="fiato__form">
          <div className="fiato__lineOne">
            <div className="fiato__tenToChuc">
              <small>Tên tổ chức</small>
              <Tooltip title={errors.name} placement='topRight' color='red' >
                <Input
                  style={{ 'border': color.name }}
                  name="name"
                  onChange={handleChangeInput}
                  size="large"
                />
              </Tooltip>
            </div>
            <div className="fiato__linhVucKinhDoanh">
              <small>Lĩnh vực kinh doanh</small>
              <Tooltip title={errors.industry} placement='topRight' color='red' >
                <Select
                  style={{ 'border': color.industry }}
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
              <Tooltip title={errors.stage} placement='topRight' color='red' >
                <Select
                  style={{ 'border': color.stage }}
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
              <Tooltip title={errors.foundedYear} placement='topRight' color='red' >
                <Input
                  style={{ 'border': color.foundedYear }}
                  name="foundedYear"
                  onChange={handleChangeInput}
                  type="text" maxLength="9"
                  size="large"
                />
              </Tooltip>
            </div>
            <div className="fiato__soLuongThanhVien">
              <small>Số lượng thành viên</small>
              <Tooltip title={errors.numberOfEmployee} placement='topRight' color='red' >
                <Input
                  style={{ 'border': color.numberOfEmployee }}
                  name="numberOfEmployee"
                  type="text" maxLength="9"
                  onChange={handleChangeInput}
                  size="large"
                />
              </Tooltip>
            </div>
          </div>
          <div className="fiato__lineThree">
            <div className="fiato__khuVucHoatDong">
              <small>Khu vực hoạt động</small>
              <Tooltip title={errors.province} placement='topRight' color='red' >
                <Select
                  style={{ 'border': color.province }}
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
              <Tooltip title={errors.link} placement='topRight' color='red' >
                <Input
                  style={{ 'border': color.link }}
                  name="link"
                  onChange={handleChangeInput}
                  size="large"
                />
              </Tooltip>
            </div>
          </div>
          <div className="fiato__lineFour">
            {/* <div className="fiato__moTaVeDoanhNghiep">
              <small>Mô tả về doanh nghiệp</small>
              <Tooltip title={errors.description} placement='topRight' color='red' >
                <TextArea
                  style={{ 'border': color.description }}
                  name="description"
                  rows={5}
                  onChange={handleChangeInput}
                  size="large"
                />
              </Tooltip>
            </div> */}
            <div className="fiato__logo">
            <small>&nbsp;</small>
              <img src={url || Images.NO_IMAGE} alt="" className="fiato__userLogo" />
              <input className="fiato__file" type="file" id="file" onChange={handleChangeImage} />
              <label htmlFor="file" className="fiato__span">
                <img
                  src={Images.CAMERA}
                  alt="camera"
                  className="fiato__camera"
                />
              </label>
            </div>
          </div>
        </form>
        <div className="fiato__button">
          <div className="fiato__buttonLeft" onClick={props.handleBack}>
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
