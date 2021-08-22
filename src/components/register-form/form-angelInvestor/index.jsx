import React, { useEffect, useState } from "react";
import "./styles.scss";
import axios from "axios";
import Swal from "sweetalert2";
import "antd/dist/antd.css";
import { Input, Select, Tooltip, Spin, Button } from "antd";
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
function FormAngelInvestorInformation(props) {
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
  const handleBack = () => {
    localStorage.setItem("Form2Investor", JSON.stringify(information));
    localStorage.setItem("image", JSON.stringify(url));
    props.handleBack();
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
    setErrors(validate(information));
    setColor(validateColor(information));
    if (url === "" || url === Images.NO_IMAGE) {
      setImageError("Hình không được để trống");
      setImageColor("1px solid red");
    } else {
      if (check == 10) {
        const user = JSON.parse(localStorage.getItem("Form1"));
        postBasicInformation1(user.gmail, user.password);
      }
    }
  };
  const postBasicInformation1 = (gmail, password) => {
    const role = JSON.parse(localStorage.getItem("roleName"));
    const rePass = password;
    axios({
      method: "Post",
      url: "https://itrans2021.herokuapp.com/api/v1/auth/registration",
      data: {
        gmail,
        password,
        rePass,
        role,
      },
    })
      .then((res) => {
        const user = JSON.parse(localStorage.getItem("Form1"));
        const gmailObj = { gmail: user.gmail };
        const objInvestor = Object.assign({}, gmailObj, information);
        objInvestor.logo = url;
        const newObjInvestor = objInvestor;
        delete newObjInvestor.province;
        delete newObjInvestor.stage;
        delete newObjInvestor.industry;
        delete newObjInvestor.region;
        delete newObjInvestor.min;
        delete newObjInvestor.max;
        postInvestor1(newObjInvestor);
      })
      .catch((err) => {});
  };
  const postInvestor1 = (investor) => {
    axios({
      method: "Post",
      url: "https://itrans2021.herokuapp.com/api/v1/auth/create-investor",
      data: investor,
    })
      .then((res) => {
        const idInvestorType = JSON.parse(localStorage.getItem("investerType"));
        const typeOfInvestor = [];
        for (let index = 0; index < idInvestorType.length; index++) {
          const object = {
            idInvestor: res.data,
            idInvestorType: idInvestorType[index],
          };
          typeOfInvestor.push(object);
        }
        postTypeOfInvestor1(typeOfInvestor);
        const objInvestorTaste = {
          idInvestor: res.data,
          minInvestment: information.min,
          maxInvestment: information.max,
        };
        postInvestorTaste1(objInvestorTaste);
      })
      .catch((err) => {});
  };
  const postTypeOfInvestor1 = (type) => {
    axios({
      method: "Post",
      url: "https://itrans2021.herokuapp.com/api/v1/auth/type-of-investor",
      data: type,
    })
      .then((res) => {})
      .catch((err) => {});
  };
  const postInvestorTaste1 = (investorTaste) => {
    axios({
      method: "Post",
      url: "https://itrans2021.herokuapp.com/api/v1/auth/create-investorTaste",
      data: investorTaste,
    })
      .then((res) => {
        const investmentIndustry = [];
        const investmentStage = [];
        const provinceRegionList = [];
        const investorOld = information;
        for (let index = 0; index < investorOld.industry.length; index++) {
          const industry = { idIndustry: investorOld.industry[index] };
          industry.idInvestorTaste = res.data;
          investmentIndustry.push(industry);
        }
        postInvestmentIndustry1(investmentIndustry);
        for (let index = 0; index < investorOld.stage.length; index++) {
          const stage = { idStage: investorOld.stage[index] };
          stage.idInvestorTaste = res.data;
          investmentStage.push(stage);
        }
        postInvestmentStage1(investmentStage);
        for (let index = 0; index < investorOld.province.length; index++) {
          let provinceRegion = {};
          if (investorOld.province[index] !== undefined) {
            provinceRegion.idProvince = investorOld.province[index];
            provinceRegion.idInvestorTaste = res.data;
            provinceRegionList.push(provinceRegion);
          }
          if (investorOld.region[index] !== undefined) {
            provinceRegion = {};
            provinceRegion.idRegion = investorOld.region[index];
            provinceRegion.idInvestorTaste = res.data;
            provinceRegionList.push(provinceRegion);
          }
        }
        postTasteProvinceRegion1(provinceRegionList);
      })
      .catch((err) => {});
  };
  const postInvestmentIndustry1 = (investmentIndustry) => {
    axios({
      method: "Post",
      url: "https://itrans2021.herokuapp.com/api/v1/auth/create-investmentIndustry",
      data: investmentIndustry,
    })
      .then((res) => {})
      .catch((err) => {});
  };
  const postInvestmentStage1 = (investmentStage) => {
    axios({
      method: "Post",
      url: "https://itrans2021.herokuapp.com/api/v1/auth/create-investmentStage",
      data: investmentStage,
    })
      .then((res) => {})
      .catch((err) => {});
  };
  const postTasteProvinceRegion1 = (tasteProvinceRegion) => {
    axios({
      method: "Post",
      url: "https://itrans2021.herokuapp.com/api/v1/auth/create-taste-province-region",
      data: tasteProvinceRegion,
    })
      .then((res) => {
        Swal.fire({
          imageUrl: Images.THANKS,
          heightAuto: true,
          showConfirmButton: true,
          allowOutsideClick: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then(async (result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            window.location.assign("http://localhost:3000/dang-nhap");
          }
        });
      })
      .catch((err) => {});
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
    <div className="faii__wrapper">
      <div className="faii__container">
        <h2>{Messages.INVESTOR_INFORMATION}</h2>
        <div className="faii__box">
          <form className="faii__form">
            <div className="faii__formLeft">
              <Tooltip title={imageError} placement="topRight" color="red">
                <div style={{ border: imageColor }} className="faii__avata">
                  <img
                    src={url || Images.NO_IMAGE}
                    alt=""
                    className="faii__userAvata"
                  />
                  <input
                    className="faii__file"
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={handleChangeImage}
                  />
                  <label htmlFor="file" className="faii__span">
                    <img
                      src="https://i.ibb.co/jZmmMRz/camera.png"
                      alt=""
                      className="faii__camera"
                    />
                    {loading === true ? (
                      <Spin className="modal__inLABELSpin" />
                    ) : (
                      <></>
                    )}
                  </label>
                </div>
              </Tooltip>
              <div className="faii__hoVaTenNamSinh">
                <div className="faii__hoVaTen">
                  <label className="label__fontWeight">Họ và Tên</label>
                  <Tooltip title={errors.name} placement="topRight" color="red">
                    {" "}
                    <Input
                      placeholder="VD: Nguyễn Văn A"
                      value={information.name}
                      name="name"
                      style={{ border: color.name }}
                      onChange={handleChangeInput}
                      size="large"
                    />
                  </Tooltip>
                </div>
                <div className="faii__namSinh">
                  <label className="label__fontWeight">Năm sinh</label>
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
                      onChange={handleChangeInput}
                      size="large"
                    />
                  </Tooltip>
                </div>
              </div>
              <div className="faii__link">
                <label className="label__fontWeight">Link website</label>
                <Tooltip title={errors.link} placement="topRight" color="red">
                  <Input
                    placeholder="VD: https://www.facebook.com/"
                    size="large"
                    name="link"
                    onChange={handleChangeInput}
                    value={information.link}
                    style={{ border: color.link }}
                  />
                </Tooltip>
              </div>
              <div className="faii__truSo">
                <label className="label__fontWeight">Trụ sở chính</label>
                <Tooltip
                  title={errors.idProvince}
                  placement="topRight"
                  color="red"
                >
                  <Select
                    placeholder="VD: Bến Tre"
                    size="large"
                    style={{ border: color.idProvince }}
                    name="idProvince"
                    onChange={handleChangeIdProvince}
                    defaultValue={listIdProvinceDefaul}
                    className="faii__selectHead"
                  >
                    {renderListProvince()}
                  </Select>
                </Tooltip>
              </div>
              {/* tax code */}
              <div className="faii__taxCode">
                <label className="label__fontWeight">Mã số thuế</label>
                <Tooltip
                  title={errors.taxCode}
                  placement="topRight"
                  color="red"
                >
                  <Input
                    // placeholder="VD: https://www.facebook.com/"
                    size="large"
                    style={{ border: color.taxCode }}
                    name="taxCode"
                    onChange={handleChangeInput}
                    value={information.taxCode}
                  />
                </Tooltip>
              </div>
              {/* end tax */}
            </div>
            <div className="faii__formMiddle"></div>
            <div className="faii__formRight">
              <div className="faii__money">
                <label className="label__fontWeight">Số tiền đầu tư</label>
                <div className="faii__moneyInput">
                  <div className="faii__from">
                    <Tooltip
                      title={errors.min}
                      placement="topRight"
                      color="red"
                    >
                      <Input
                        size="large"
                        type="text"
                        maxLength="9"
                        style={{ border: color.min, textAlign: "end" }}
                        name="min"
                        value={information.min}
                        size="large"
                        onChange={handleChangeInput}
                        addonAfter="Tỷ VNĐ"
                      />
                    </Tooltip>
                  </div>
                  <span className="faii__spanMoney">-</span>
                  <div className="faii__to">
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
              <div className="faii__linhVucDauTu">
                <label className="label__fontWeight">
                  Lĩnh vực kinh doanh đầu tư
                </label>
                <Tooltip
                  title={errors.industry}
                  placement="topRight"
                  color="red"
                >
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
              <div className="faii__khuVucMuonDauTu">
                <label className="label__fontWeight">Vùng miền đầu tư</label>
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
              <div className="faii__tinhThanhDauTu">
                <label className="label__fontWeight">Khu vực đầu tư</label>
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
                  >
                    {renderListProvinceOr()}
                  </Select>
                </Tooltip>
              </div>
              <div className="faii__tinhThanhDauTu">
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
                  >
                    {renderListStage()}
                  </Select>
                </Tooltip>
              </div>
            </div>
          </form>
        </div>
        <div className="faii__button">
          <div className="faii__buttonBack" onClick={handleBack}>
            <img src={Images.RIGHT_ARROWS} alt="" />
            <span>Quay lại</span>
          </div>
          <div className="faii__buttonDone">
            <Button onClick={handleNext} type="primary">
              Hoàn tất
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FormAngelInvestorInformation;
