import axios from "axios";
import Swal from "sweetalert2";
import {
  GET_LIST_INVESTOR_FILTER_FAILED,
  GET_LIST_INVESTOR_FILTER_SUCCESS,
} from "../constants/investor.const";
import {
  CREATE_BASIC_INFORMATION_FAIL,
  CREATE_BASIC_INFORMATION_SUCCESS,
  CREATE_INVESTMENT_INDUSTRY_FAIL,
  CREATE_INVESTMENT_INDUSTRY_SUCCESS,
  CREATE_INVESTMENT_STAGE_FAIL,
  CREATE_INVESTMENT_STAGE_SUCCESS,
  CREATE_INVESTOR_FAIL,
  CREATE_INVESTOR_SUCCESS,
  CREATE_INVESTOR_TASTE_FAIL,
  CREATE_INVESTOR_TASTE_SUCCESS,
  CREATE_ORGANIZATION_INDUSTRY_FAIL,
  CREATE_ORGANIZATION_INDUSTRY_SUCCESS,
  CREATE_ORGANIZATION_PROVINCCE_FAIL,
  CREATE_ORGANIZATION_PROVINCCE_SUCCESS,
  CREATE_ORGANIZATION_STAGE_FAIL,
  CREATE_ORGANIZATION_STAGE_SUCCESS,
  CREATE_TASTE_PROVINCE_REGION_FAIL,
  CREATE_TASTE_PROVINCE_REGION_SUCCESS,
  CREATE_TEAM_MEMBER_FAIL,
  CREATE_TEAM_MEMBER_SUCCESS,
  CREATE_TYPE_OF_INVESTOR_FAIL,
  CREATE_TYPE_OF_INVESTOR_SUCCESS,
  GET_LIST_INDUSTRY_FAIL,
  GET_LIST_INDUSTRY_SUCCESS,
  GET_LIST_INVESTOR_TYPE_SUCCESS,
  GET_LIST_PROVINCE_FAIL,
  GET_LIST_PROVINCE_INVESTOR_FAIL,
  GET_LIST_PROVINCE_INVESTOR_SUCCESS,
  GET_LIST_PROVINCE_SUCCESS,
  GET_LIST_REGION_FAILED,
  GET_LIST_REGION_INVESTOR_FAILED,
  GET_LIST_REGION_INVESTOR_SUCCESS,
  GET_LIST_REGION_SUCCESS,
  GET_LIST_STAGE_FAIL,
  GET_LIST_STAGE_SUCCESS,
} from "../constants/register.const";
import Images from "../../assets/images/images";
export const postVerificationCode = (gmail) => {
  return (dispatch) => {
    axios({
      method: "Post",
      url: `https://itrans2021.herokuapp.com/api/v1/auth/generate-otp?email=${gmail}`,
    })
      .then((res) => {})
      .catch((err) => {});
  };
};
export const postBasicInformation = (gmail, password) => {
  const role = JSON.parse(localStorage.getItem("roleName"));
  const rePass = password;
  return (dispatch) => {
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
        dispatch(createBasicInformationSuccess(res.data));
        const roleName = JSON.parse(localStorage.getItem("roleName"));
        if (roleName === "ORGANIZATION") {
          const user = JSON.parse(localStorage.getItem("Form1"));
          const gmailObj = { gmail: user.gmail };
          const organization = JSON.parse(localStorage.getItem("Form2"));
          const objOrganization = Object.assign({}, gmailObj, organization);
          const logo = JSON.parse(localStorage.getItem("image"));
          objOrganization.logo = logo;
          const newObjOrganization = objOrganization;
          delete newObjOrganization.province;
          delete newObjOrganization.stage;
          delete newObjOrganization.industry;
          dispatch(postIAOTOrganization(newObjOrganization));
        } else {
          const user = JSON.parse(localStorage.getItem("Form1"));
          const gmailObj = { gmail: user.gmail };
          const investor = JSON.parse(localStorage.getItem("Form2Investor"));
          const objInvestor = Object.assign({}, gmailObj, investor);
          const logo = JSON.parse(localStorage.getItem("image"));
          objInvestor.logo = logo;
          // const idInvestorType = JSON.parse(localStorage.getItem("idInvestorType"));
          // objInvestor.idInvestorType = idInvestorType;
          const newObjInvestor = objInvestor;
          delete newObjInvestor.province;
          delete newObjInvestor.stage;
          delete newObjInvestor.industry;
          delete newObjInvestor.region;
          delete newObjInvestor.min;
          delete newObjInvestor.max;
          console.log(logo);
          console.log(investor);
          console.log(objInvestor);
          dispatch(postInvestor(newObjInvestor));
        }
      })
      .catch((err) => {
        dispatch(createBasicInformationFail(err));
      });
  };
};
const createBasicInformationSuccess = (data) => {
  return {
    type: CREATE_BASIC_INFORMATION_SUCCESS,
    payload: data,
  };
};
const createBasicInformationFail = (err) => {
  return {
    type: CREATE_BASIC_INFORMATION_FAIL,
    payload: err,
  };
};
export const postIAOTOrganization = (organization) => {
  return (dispatch) => {
    axios({
      method: "Post",
      url: "https://itrans2021.herokuapp.com/api/v1/auth/create-organization",
      data: organization,
    })
      .then((res) => {
        dispatch(createIAOTOrganizationSuccess(res.data));
        const teamMember = JSON.parse(localStorage.getItem("TeamMember"));
        console.log("e");
        console.log(teamMember);
        if (teamMember !== null) {
          for (let index = 0; index < teamMember.length; index++) {
            teamMember[index].idOrganization = res.data;
          }
          dispatch(postTeamMember(teamMember));
          localStorage.removeItem("TeamMember");
        }
        const organizationIndustry = [];
        const organizationProvince = [];
        const organizationOld = JSON.parse(localStorage.getItem("Form2"));
        const orId = { id: res.data };
        const or = { organization: orId };
        for (let index = 0; index < organizationOld.industry.length; index++) {
          const industryId = { id: organizationOld.industry[index] };
          const industry = { industry: industryId };
          const elementNew = Object.assign({}, industry, or);
          organizationIndustry.push(elementNew);
        }
        dispatch(postOrganizationIndustry(organizationIndustry));
        for (let index = 0; index < organizationOld.province.length; index++) {
          const provienceId = { id: organizationOld.province[index] };
          const province = { province: provienceId };
          const elementNew = Object.assign({}, province, or);
          organizationProvince.push(elementNew);
        }
        dispatch(postOrganizationProvince(organizationProvince));
        const stageId = { id: organizationOld.stage };
        const stage = { stage: stageId };
        const elementNew = Object.assign({}, stage, or);
        dispatch(postOrganizationStage(elementNew));
      })
      .catch((err) => {
        dispatch(createIAOTOrganizationFail(err));
      });
  };
};

const createIAOTOrganizationSuccess = (organization) => {
  return {
    type: CREATE_BASIC_INFORMATION_SUCCESS,
    payload: organization,
  };
};
const createIAOTOrganizationFail = (err) => {
  return {
    type: CREATE_BASIC_INFORMATION_FAIL,
    payload: err,
  };
};
export const postOrganizationProvince = (organizationProvince) => {
  return (dispatch) => {
    axios({
      method: "Post",
      url: "https://itrans2021.herokuapp.com/api/v1/auth/create-organizationProvince",
      data: organizationProvince,
    })
      .then((res) => {
        dispatch(createOrganizationProvinceSuccess(res.data));
      })
      .catch((err) => {
        dispatch(createOrganizationProvinceFail(err));
      });
  };
};
const createOrganizationProvinceSuccess = (organizationProvince) => {
  return {
    type: CREATE_ORGANIZATION_PROVINCCE_SUCCESS,
    payload: organizationProvince,
  };
};
const createOrganizationProvinceFail = (err) => {
  return {
    type: CREATE_ORGANIZATION_PROVINCCE_FAIL,
    payload: err,
  };
};

export const postOrganizationStage = (organizationStage) => {
  return (dispatch) => {
    axios({
      method: "Post",
      url: "https://itrans2021.herokuapp.com/api/v1/auth/create-organizationStage",
      data: organizationStage,
    })
      .then((res) => {
        dispatch(createOrganizationStageSuccess(res.data));
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
      .catch((err) => {
        dispatch(createOrganizationStageFail(err));
      });
  };
};
const createOrganizationStageSuccess = (organizationStage) => {
  return {
    type: CREATE_ORGANIZATION_STAGE_SUCCESS,
    payload: organizationStage,
  };
};
const createOrganizationStageFail = (err) => {
  return {
    type: CREATE_ORGANIZATION_STAGE_FAIL,
    payload: err,
  };
};
export const postOrganizationIndustry = (organizationIndustry) => {
  return (dispatch) => {
    axios({
      method: "Post",
      url: "https://itrans2021.herokuapp.com/api/v1/auth/create-organizationIndustry",
      data: organizationIndustry,
    })
      .then((res) => {
        dispatch(createOrganizationIndustrySuccess(res.data));
      })
      .catch((err) => {
        dispatch(createOrganizationIndustryFail(err));
      });
  };
};
const createOrganizationIndustrySuccess = (organizationIndustry) => {
  return {
    type: CREATE_ORGANIZATION_INDUSTRY_SUCCESS,
    payload: organizationIndustry,
  };
};
const createOrganizationIndustryFail = (err) => {
  return {
    type: CREATE_ORGANIZATION_INDUSTRY_FAIL,
    payload: err,
  };
};
export const getListProvince = () => {
  return (dispatch) => {
    axios({
      method: "Get",
      url: "https://itrans2021.herokuapp.com/api/v1/auth/get-province",
    })
      .then((res) => {
        dispatch(getListProvinceSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getListProvinceFail(err));
      });
  };
};

const getListProvinceSuccess = (province) => {
  return {
    type: GET_LIST_PROVINCE_SUCCESS,
    payload: province,
  };
};
const getListProvinceFail = (err) => {
  return {
    type: GET_LIST_PROVINCE_FAIL,
    payload: err,
  };
};

export const getListRegion = () => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: "https://itrans2021.herokuapp.com/api/v1/auth/get-region",
    })
      .then((res) => {
        dispatch(getListRegionSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getListRegionFailed(err));
      });
  };
};

const getListRegionSuccess = (listRegion) => {
  return {
    type: GET_LIST_REGION_SUCCESS,
    payload: listRegion,
  };
};

const getListRegionFailed = (err) => {
  return {
    type: GET_LIST_REGION_FAILED,
    payload: err,
  };
};
export const getListIndustry = () => {
  return (dispath) => {
    axios({
      method: "Get",
      url: "https://itrans2021.herokuapp.com/api/v1/auth/get-industry",
    })
      .then((res) => {
        dispath(getListIndustrySuccess(res.data));
      })
      .catch((err) => {
        dispath(getListIndustryFail(err));
      });
  };
};
const getListIndustrySuccess = (listIndustry) => {
  return {
    type: GET_LIST_INDUSTRY_SUCCESS,
    payload: listIndustry,
  };
};
const getListIndustryFail = (err) => {
  return {
    type: GET_LIST_INDUSTRY_FAIL,
    payload: err,
  };
};

export const getListStage = () => {
  return (dispatch) => {
    axios({
      method: "Get",
      url: "https://itrans2021.herokuapp.com/api/v1/auth/get-stage",
    })
      .then((res) => {
        dispatch(getListStageSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getListStageFail(err));
      });
  };
};

const getListStageSuccess = (listStage) => {
  return {
    type: GET_LIST_STAGE_SUCCESS,
    payload: listStage,
  };
};
const getListStageFail = (err) => {
  return {
    type: GET_LIST_STAGE_FAIL,
    payload: err,
  };
};

export const getListInvestorType = () => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: "https://itrans2021.herokuapp.com/api/v1/auth/investor-type",
    })
      .then((res) => {
        dispatch(getListInvestorTypeSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getListInvestorTypeFailed(err));
      });
  };
};

const getListInvestorTypeSuccess = (listInvestorType) => {
  return {
    type: GET_LIST_INVESTOR_TYPE_SUCCESS,
    payload: listInvestorType,
  };
};

const getListInvestorTypeFailed = (err) => {
  return {
    type: GET_LIST_INVESTOR_TYPE_SUCCESS,
    payload: err,
  };
};

export const postInvestor = (investor) => {
  return (dispatch) => {
    axios({
      method: "Post",
      url: "https://itrans2021.herokuapp.com/api/v1/auth/create-investor",
      data: investor,
    })
      .then((res) => {
        dispatch(createInvestorSuccess(res.data));
        const teamMember = JSON.parse(localStorage.getItem("TeamMember"));
        if (teamMember !== null) {
          for (let index = 0; index < teamMember.length; index++) {
            teamMember[index].idInvestor = res.data;
          }
          dispatch(postTeamMember(teamMember));
          localStorage.removeItem("TeamMember");
        }

        const idInvestorType = JSON.parse(localStorage.getItem("investerType"));
        const typeOfInvestor = [];
        for (let index = 0; index < idInvestorType.length; index++) {
          const object = {
            idInvestor: res.data,
            idInvestorType: idInvestorType[index],
          };
          typeOfInvestor.push(object);
        }
        dispatch(postTypeOfInvestor(typeOfInvestor));
        localStorage.removeItem("TeamMember");
        const investor = JSON.parse(localStorage.getItem("Form2Investor"));
        const objInvestorTaste = {
          idInvestor: res.data,
          minInvestment: investor.min,
          maxInvestment: investor.max,
        };
        dispatch(postInvestorTaste(objInvestorTaste));
      })
      .catch((err) => {
        dispatch(createInvestorFail(err));
      });
  };
};
const createInvestorSuccess = (investor) => {
  return {
    type: CREATE_INVESTOR_SUCCESS,
    payload: investor,
  };
};
const createInvestorFail = (err) => {
  return {
    type: CREATE_INVESTOR_FAIL,
    payload: err,
  };
};

export const postInvestorTaste = (investorTaste) => {
  return (dispatch) => {
    axios({
      method: "Post",
      url: "https://itrans2021.herokuapp.com/api/v1/auth/create-investorTaste",
      data: investorTaste,
    })
      .then((res) => {
        dispatch(createInvestorTasteSuccess(res.data));
        const investmentIndustry = [];
        const investmentStage = [];
        const provinceRegionList = [];
        const investorOld = JSON.parse(localStorage.getItem("Form2Investor"));
        for (let index = 0; index < investorOld.industry.length; index++) {
          const industry = { idIndustry: investorOld.industry[index] };
          industry.idInvestorTaste = res.data;
          investmentIndustry.push(industry);
        }
        dispatch(postInvestmentIndustry(investmentIndustry));
        for (let index = 0; index < investorOld.stage.length; index++) {
          const stage = { idStage: investorOld.stage[index] };
          stage.idInvestorTaste = res.data;
          investmentStage.push(stage);
        }
        dispatch(postInvestmentStage(investmentStage));
        for (let index = 0; index < investorOld.province.length; index++) {
          let provinceRegion = {};
          if (investorOld.province[index] !== undefined) {
            provinceRegion.idProvince = investorOld.province[index];
            provinceRegion.idInvestorTaste = res.data;
            console.log("e");
            console.log(provinceRegion);
            provinceRegionList.push(provinceRegion);
          }
          if (investorOld.region[index] !== undefined) {
            provinceRegion = {};
            provinceRegion.idRegion = investorOld.region[index];
            provinceRegion.idInvestorTaste = res.data;
            provinceRegionList.push(provinceRegion);
            console.log(provinceRegion);
          }
        }
        console.log(provinceRegionList);
        dispatch(postTasteProvinceRegion(provinceRegionList));
      })
      .catch((err) => {
        dispatch(createInvestorTasteFail(err));
      });
  };
};
const createInvestorTasteSuccess = (object) => {
  return {
    type: CREATE_INVESTOR_TASTE_SUCCESS,
    payload: object,
  };
};
const createInvestorTasteFail = (err) => {
  return {
    type: CREATE_INVESTOR_TASTE_FAIL,
    payload: err,
  };
};

export const postInvestmentIndustry = (investmentIndustry) => {
  return (dispatch) => {
    axios({
      method: "Post",
      url: "https://itrans2021.herokuapp.com/api/v1/auth/create-investmentIndustry",
      data: investmentIndustry,
    })
      .then((res) => {
        dispatch(createInvestmentIndustrySuccess(res.data));
      })
      .catch((err) => {
        dispatch(createInvestmentIndustryFail(err));
      });
  };
};
const createInvestmentIndustrySuccess = (object) => {
  return {
    type: CREATE_INVESTMENT_INDUSTRY_SUCCESS,
    payload: object,
  };
};
const createInvestmentIndustryFail = (err) => {
  return {
    type: CREATE_INVESTMENT_INDUSTRY_FAIL,
    payload: err,
  };
};

export const postInvestmentStage = (investmentStage) => {
  return (dispatch) => {
    axios({
      method: "Post",
      url: "https://itrans2021.herokuapp.com/api/v1/auth/create-investmentStage",
      data: investmentStage,
    })
      .then((res) => {
        dispatch(createInvestmentStageSuccess(res.data));
      })
      .catch((err) => {
        dispatch(createInvestmentStageFail(err));
      });
  };
};
const createInvestmentStageSuccess = (object) => {
  return {
    type: CREATE_INVESTMENT_STAGE_SUCCESS,
    payload: object,
  };
};
const createInvestmentStageFail = (err) => {
  return {
    type: CREATE_INVESTMENT_STAGE_FAIL,
    payload: err,
  };
};

export const postTasteProvinceRegion = (tasteProvinceRegion) => {
  return (dispatch) => {
    axios({
      method: "Post",
      url: "https://itrans2021.herokuapp.com/api/v1/auth/create-taste-province-region",
      data: tasteProvinceRegion,
    })
      .then((res) => {
        dispatch(createTasteProvinceRegionSuccess(res.data));
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
      .catch((err) => {
        dispatch(createTasteProvinceRegionFail(err));
      });
  };
};
const createTasteProvinceRegionSuccess = (object) => {
  return {
    type: CREATE_TASTE_PROVINCE_REGION_SUCCESS,
    payload: object,
  };
};
const createTasteProvinceRegionFail = (err) => {
  return {
    type: CREATE_TASTE_PROVINCE_REGION_FAIL,
    payload: err,
  };
};

export const postTeamMember = (member) => {
  return (dispatch) => {
    axios({
      method: "Post",
      url: "https://itrans2021.herokuapp.com/api/v1/auth/team",
      data: member,
    })
      .then((res) => {
        dispatch(createTeamMemberSuccess(res.data));
      })
      .catch((err) => {
        dispatch(createTeamMemberFail(err));
      });
  };
};
const createTeamMemberSuccess = (object) => {
  return {
    type: CREATE_TEAM_MEMBER_SUCCESS,
    payload: object,
  };
};
const createTeamMemberFail = (err) => {
  return {
    type: CREATE_TEAM_MEMBER_FAIL,
    payload: err,
  };
};

export const postTypeOfInvestor = (type) => {
  return (dispatch) => {
    axios({
      method: "Post",
      url: "https://itrans2021.herokuapp.com/api/v1/auth/type-of-investor",
      data: type,
    })
      .then((res) => {
        dispatch(createTypeOfInvestorSuccess(res.data));
      })
      .catch((err) => {
        dispatch(createTypeOfInvestorFail(err));
      });
  };
};
const createTypeOfInvestorSuccess = (object) => {
  return {
    type: CREATE_TYPE_OF_INVESTOR_SUCCESS,
    payload: object,
  };
};
const createTypeOfInvestorFail = (err) => {
  return {
    type: CREATE_TYPE_OF_INVESTOR_FAIL,
    payload: err,
  };
};

export const getListProvinceInvestor = (url, listProvinceInvestor) => {
  return (dispatch) => {
    axios({
      method: "Get",
      url: url + listProvinceInvestor,
    })
      .then((res) => {
        dispatch(getListProvinceInvestorSuccess(res.data));
        console.log(res.data);
      })
      .catch((err) => {
        dispatch(getListProvinceInvestorFail(err));
      });
  };
};

const getListProvinceInvestorSuccess = (province) => {
  return {
    type: GET_LIST_PROVINCE_INVESTOR_SUCCESS,
    payload: province,
  };
};
const getListProvinceInvestorFail = (err) => {
  return {
    type: GET_LIST_PROVINCE_INVESTOR_FAIL,
    payload: err,
  };
};

export const getListRegionInvestor = (url, listRegionInvestor) => {
  return (dispatch) => {
    axios({
      method: "Get",
      url: url + listRegionInvestor,
    })
      .then((res) => {
        dispatch(getListRegionInvestorSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getListRegionInvestorFail(err));
      });
  };
};

const getListRegionInvestorSuccess = (region) => {
  return {
    type: GET_LIST_REGION_INVESTOR_SUCCESS,
    payload: region,
  };
};
const getListRegionInvestorFail = (err) => {
  return {
    type: GET_LIST_REGION_INVESTOR_FAILED,
    payload: err,
  };
};
