import React, { useState } from "react";
import "./styles.scss";
import Images from "../../assets/images/images";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import ModalConfirmDeal from "../modal-confirm-deal";
import Swal from "sweetalert2";
import moment from "moment";
import { createDeal } from "../../store/action/deal.action";
import {
  authorizationAccount,
  sessionTimeOut,
  showMessage,
} from "../../assets/helper/helper";
import {
  getRoundAndOrganization,
  updateStatusRoundDetail,
  userDeleteRound,
} from "../../store/action/round.action";
import ModalUpdateRoundV2 from "./modal-update";
import {
  checkMoney,
  checkPercent,
  checkSummary,
} from "../../validate/create/round";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { defaultUrlAPI } from "../../configs/url";
function RoundDeail(props) {
  const dispatch = useDispatch();
  const { roundAndOrganization } = useSelector((state) => state.round);
  const { listDealByRound } = useSelector((state) => state.round);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [infoToUpdate, setInfoToUpdate] = useState({
    fundingAmount: "",
    shareRequirement: "",
    summary: "",
  });
  const [thumbnailUpdate, setThumbnailUpdate] = useState("");
  const [descriptionUpdate, setDescriptionUpdate] = useState("");
  const [startDateUpdate, setsStartDateUpdate] = useState();
  const [endDateUpdate, setEndDateUpdate] = useState();
  // error
  const [desUpdateError, setDesUpdateError] = useState("");
  const [fundingAmountError, setFundingAmountError] = useState("");
  const [shareRequirementError, setShareRequirementError] = useState("");
  const [thumbnailError, setThumbnailError] = useState("");
  //

  const format = "DD-MM-YYYY";
  const handleClickPencil = () => {
    setOpenModalUpdate(true);
    setInfoToUpdate({
      fundingAmount: roundAndOrganization.fundingAmount,
      shareRequirement: roundAndOrganization.shareRequirement,
      summary: roundAndOrganization.summary,
    });
    setDescriptionUpdate(roundAndOrganization.description);
    setThumbnailUpdate(roundAndOrganization.thumbnail);
    setsStartDateUpdate(roundAndOrganization.startDate);
    setEndDateUpdate(roundAndOrganization.endDate);
  };

  const handleClose = () => {
    setOpenModalUpdate(false);
    setInfoToUpdate({
      fundingAmount: "",
      shareRequirement: "",
      summary: "",
    });
    setDescriptionUpdate("");
    setThumbnailUpdate("");
    setsStartDateUpdate();
    setEndDateUpdate();
    setDesUpdateError("");
    setFundingAmountError("");
    setShareRequirementError("");
    setThumbnailError("");
  };

  const handleBlurFunding = () => {
    checkMoney(infoToUpdate.fundingAmount, setFundingAmountError);
  };
  const handleBlurPer = () => {
    checkPercent(infoToUpdate.shareRequirement, setShareRequirementError);
  };
  const handleBlurDes = () => {
    checkSummary(infoToUpdate.summary, setDesUpdateError);
  };

  const handleChangeValueUpdate = (event) => {
    const { name, value } = event.target;
    setInfoToUpdate({
      ...infoToUpdate,
      [name]: value,
    });
  };
  const [errors, setErrors] = useState({
    soTienDauTu: "",
    phanTramCoPhan: "",
    moTa: ""
  });
  const [color, setColor] = useState({
    soTienDauTu: "",
    phanTramCoPhan: "",
    moTa: ""
  });
  let check = 0;
  const validate = (values) => {
    let errors = {};
    if (!values.soTienDauTu) {
      errors.soTienDauTu = "Số tiền đầu tư không được để trống";
    } else {
      errors.soTienDauTu = "";
      check++;
    }
    if (!values.phanTramCoPhan) {
      errors.phanTramCoPhan = "Phần trăm cổ phần không được để trống";
    } else if (values.phanTramCoPhan > 100) {
      errors.phanTramCoPhan = "Phần trăm cổ phần không được lớn hơn 100%";
    } else {
      errors.phanTramCoPhan = "";
      check++;
    }
    if (!values.moTa) {
      errors.moTa = "Mô tả không được để trống";
    } else if (values.moTa.length < 50) {
      errors.moTa = "Mô tả phải lớn hơn 50 ký tự";
    } else if (values.moTa.length > 1000) {
      errors.moTa = "Mô tả phải bé hơn 1000 ký tự";
    } else {
      errors.moTa = "";
      check++;
    }
    return errors;
  }
  const validateColor = (values) => {
    let errors = {};
    if (!values.soTienDauTu) {
      errors.soTienDauTu = "1px solid red";
    } else {
      errors.soTienDauTu = "";
    }
    if (!values.phanTramCoPhan) {
      errors.phanTramCoPhan = "1px solid red";
    } else if (values.phanTramCoPhan > 100) {
      errors.phanTramCoPhan = "1px solid red";
    } else {
      errors.phanTramCoPhan = "";
    }
    if (!values.moTa) {
      errors.moTa = "1px solid red";
    } else if (values.moTa.length < 50) {
      errors.moTa = "1px solid red";
    } else if (values.moTa.length > 1000) {
      errors.moTa = "1px solid red";
    } else {
      errors.moTa = "";
    }
    return errors;
  }
  const handleClickUpdate = () => {
    checkMoney(infoToUpdate.fundingAmount, setFundingAmountError);
    checkPercent(infoToUpdate.shareRequirement, setShareRequirementError);
    checkSummary(infoToUpdate.summary, setDesUpdateError);
    if (descriptionUpdate === "") {
      showMessage("warning", "Mô tả chi tiết không được bỏ trống");
    }
    if (
      fundingAmountError === "" &&
      shareRequirementError === "" &&
      desUpdateError === "" &&
      descriptionUpdate !== ""
    ) {
      Swal.fire({
        icon: "question",
        title: "Bạn chắc chắn muốn cập nhật vòng gọi vốn này?",
        heightAuto: true,
        timerProgressBar: false,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        confirmButtonColor: "#1890ff",
        cancelButtonColor: "red",
      }).then((result) => {
        if (result.isConfirmed) {
          const finalStart = moment(startDateUpdate).format("DD-MM-YYYY");
          const finalEnd = moment(endDateUpdate).format("DD-MM-YYYY");
          const money = parseFloat(infoToUpdate.fundingAmount);
          const finalFund = money.toFixed(2);
          const percent = parseFloat(infoToUpdate.shareRequirement);
          const finalPer = percent.toFixed(2);
          var object;
          if (roundAndOrganization.status === "ACTIVE") {
            if (finalEnd === "Invalid date") {
              object = {
                description: descriptionUpdate,
                endDate: endDateUpdate,
                fundingAmount: finalFund,
                id: roundAndOrganization.idRound,
                shareRequirement: finalPer,
                startDate: startDateUpdate,
                summary: infoToUpdate.summary,
                thumbnail: thumbnailUpdate,
              };
            } else {
              object = {
                description: descriptionUpdate,
                endDate: finalEnd,
                fundingAmount: finalFund,
                id: roundAndOrganization.idRound,
                shareRequirement: finalPer,
                startDate: startDateUpdate,
                summary: infoToUpdate.summary,
                thumbnail: thumbnailUpdate,
              };
            }
          } else {
            if (finalStart === "Invalid date" && finalEnd === "Invalid date") {
              object = {
                description: descriptionUpdate,
                endDate: endDateUpdate,
                fundingAmount: finalFund,
                id: roundAndOrganization.idRound,
                shareRequirement: finalPer,
                startDate: startDateUpdate,
                summary: infoToUpdate.summary,
                thumbnail: thumbnailUpdate,
              };
            } else if (
              finalStart === "Invalid date" &&
              finalEnd !== "Invalid date"
            ) {
              object = {
                description: descriptionUpdate,
                endDate: finalEnd,
                fundingAmount: finalFund,
                id: roundAndOrganization.idRound,
                shareRequirement: finalPer,
                startDate: startDateUpdate,
                summary: infoToUpdate.summary,
                thumbnail: thumbnailUpdate,
              };
            } else if (
              finalStart !== "Invalid date" &&
              finalEnd === "Invalid date"
            ) {
              object = {
                description: descriptionUpdate,
                endDate: endDateUpdate,
                fundingAmount: finalFund,
                id: roundAndOrganization.idRound,
                shareRequirement: finalPer,
                startDate: finalStart,
                summary: infoToUpdate.summary,
                thumbnail: thumbnailUpdate,
              };
            } else if (
              finalStart !== "Invalid date" &&
              finalEnd !== "Invalid date"
            ) {
              object = {
                description: descriptionUpdate,
                endDate: finalEnd,
                fundingAmount: finalFund,
                id: roundAndOrganization.idRound,
                shareRequirement: finalPer,
                startDate: finalStart,
                summary: infoToUpdate.summary,
                thumbnail: thumbnailUpdate,
              };
            }
          }
          updateRoud(object, props.history);
        }
      });
    }
  };

  const updateRoud = (object, history) => {
    axios({
      method: "PUT",
      url: defaultUrlAPI() + "round/updateRound",
      data: object,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          showMessage("success", res.data);
          setTimeout(() => {
            dispatch(getRoundAndOrganization(object.id));
            handleClose();
          }, 2000);
        } else {
          showMessage("error", res.data);
        }
      })
      .catch((err) => {
        sessionTimeOut(err, history);
      });
  };

  // ----------------------

  const [dataDeal, setDataDeal] = useState({
    soTienDauTu: "",
    phanTramCoPhan: "",
    moTa: "",
  });

  const [openModal, setOpenModal] = useState(false);
  const handleChangeEdit = (event) => {
    const { value, name } = event.target;
    setDataDeal({
      ...dataDeal,
      [name]: value,
    });
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleClick = () => {
    setOpenModal(true);
  };
  const handleClickEnd = () => {
    const obj = {
      id: roundAndOrganization.idRound,
      status: "Kết thúc",
    };
    Swal.fire({
      icon: "warning",
      title: "Bạn có chắc kết thúc vòng gọi vốn?",
      heightAuto: true,
      timerProgressBar: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#1890ff",
      cancelButtonColor: "red",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(updateStatusRoundDetail(obj, roundAndOrganization.idRound));
      }
    });
  };
  const handleCreateDealForm = () => {
    const dealNew = {
      round: roundAndOrganization.idRound,
      mail: userInfo.gmail,
      capitalInvestment: dataDeal.soTienDauTu,
      shareRequirement: dataDeal.phanTramCoPhan,
      description: dataDeal.moTa,
    };
    setErrors(validate(dataDeal));
    setColor(validateColor(dataDeal));
    console.log(dataDeal)
    if (check == 3) {
      Swal.fire({
        icon: "warning",
        title: "Bạn có chắc mô tả thỏa thuận đúng?",
        heightAuto: true,
        timerProgressBar: false,
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonText: "Hủy",
        confirmButtonText: "Đồng ý",
        confirmButtonColor: "#1890ff",
        cancelButtonColor: "red",
      }).then(async (result) => {
        if (result.isConfirmed) {
          dispatch(createDeal(dealNew, roundAndOrganization.gmail));
          setOpenModal(false);
          setDataDeal({
            soTienDauTu: "",
            phanTramCoPhan: "",
            moTa: "",
          })
        }
      });
    }
  };
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const handleDeleteRound = () => {
    Swal.fire({
      icon: "warning",
      title: "Bạn có chắc muốn xóa vòng gọi vốn?",
      heightAuto: true,
      timerProgressBar: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#1890ff",
      cancelButtonColor: "red",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const object = {
          id: roundAndOrganization.idRound,
          status: "Hủy",
        };
        dispatch(userDeleteRound(object, props.history));
      }
    });
  };
  return (
    <div className="roundDetail__wrapper">
      <img
        className="roundDetail__img"
        src={roundAndOrganization.thumbnail}
        alt="round-detail-img"
      ></img>
      <div className="roundDetail__info">
        <div className="roundDetail__infomation">
          <img
            className="roundDetail__logo"
            src={
              roundAndOrganization.logo === ""
                ? Images.NO_IMAGE
                : roundAndOrganization.logo
            }
            alt=""
          />
          <div className="roundDetail__ownerInfo">
            <span className="roundDetail__owner">
              {roundAndOrganization.nameOrg}
            </span>
            <div className="roundDetail__gmailYear">
              <div className="roundDetail__gmail">
                <img
                  className="icon__Image"
                  src={Images.WEBSITE}
                  alt="website"
                />
                <span>{roundAndOrganization.linkWeb}</span>
              </div>
              <div className="roundDetail__year">
                <img
                  className="icon__Image"
                  src={Images.CALENDAR}
                  alt="calendar"
                />
                <span>{roundAndOrganization.foundedYear}</span>
              </div>
            </div>
            <div className="roundDetail__empStage">
              <div className="roundDetail__emp">
                <img
                  className="icon__Image"
                  src={Images.EMPLOYEES}
                  alt="emplouee"
                />
                <span>{roundAndOrganization.numberOfEmp + " thành viên"}</span>
              </div>
              <div className="roundDetail__stage">
                <img className="icon__Image" src={Images.STAGE} alt="stage" />
                <span>{roundAndOrganization.stage}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="rd__content">
          <span className="rd__title">Thông tin vòng gọi vốn</span>
          <div className="rd__moneyPercent">
            <div className="rd__fundingMoney">
              <span className="label__fontWeightV2">Số tiền kêu gọi: </span>
              <span>{roundAndOrganization.fundingAmount + " Tỷ VNĐ"}</span>
            </div>
            <div className="rd__percent">
              <span className="label__fontWeightV2">Phần trăm cổ phần: </span>
              <span>{roundAndOrganization.shareRequirement + "%"}</span>
            </div>
          </div>
          <div className="rd__startEnd">
            <div className="rd__startDate">
              <span className="label__fontWeightV2">Ngày bắt đầu: </span>
              <span>{roundAndOrganization.startDate}</span>
            </div>
            <div className="rd__endDate">
              <span className="label__fontWeightV2">Ngày kết thúc: </span>
              <span>{roundAndOrganization.endDate}</span>
            </div>
          </div>
          <div className="rd__summary">
            <span className="label__fontWeightV2">Mô tả sơ lược: </span>
            <span>{roundAndOrganization.summary}</span>
          </div>
          {userInfo.role === "ORGANIZATION" &&
            (roundAndOrganization.status === "ACTIVE" ||
              roundAndOrganization.status === "PENDING" ? (
              listDealByRound && listDealByRound.length === 0 ? (
                <img
                  className="rd__editInfo"
                  src={Images.PENCIL}
                  alt="edit"
                  onClick={handleClickPencil}
                />
              ) : (
                <></>
              )
            ) : (
              <></>
            ))}
          {userInfo.role === "INVESTOR" && (
            <div className="rd__joinRound">
              {listDealByRound === "No Data" &&
                roundAndOrganization.status !== "EXPIRATION" && (
                  <Button
                    className="rd__joinButton"
                    onClick={handleClick}
                    type="primary"
                    size="large"
                  >
                    Tham gia{" "}
                  </Button>
                )}
            </div>
          )}
          {userInfo.role === "ORGANIZATION" &&
            roundAndOrganization.status !== "EXPIRATION" &&
            roundAndOrganization.status !== "PENDING" && (
              <div className="rd__roundDetailActoun">
                {listDealByRound.length === 0 ? (
                  <div className="rd__deleteRound">
                    <Button
                      type="primary"
                      className="rd__buttonDeleteRound"
                      size="large"
                      onClick={handleDeleteRound}
                    >
                      Xóa vòng gọi vốn
                    </Button>
                  </div>
                ) : (
                  <></>
                )}

                <div className="rd__endRound">
                  <Button
                    className="rd__buttonEndRound"
                    size="large"
                    onClick={handleClickEnd}
                    type="primary"
                  >
                    Kết thúc vòng gọi vốn
                  </Button>
                </div>
              </div>
            )}
        </div>

        <ModalUpdateRoundV2
          data={roundAndOrganization}
          open={openModalUpdate}
          close={handleClose}
          infoToUpdate={infoToUpdate}
          descriptionUpdate={descriptionUpdate}
          thumbnailUpdate={thumbnailUpdate}
          startDateUpdate={startDateUpdate}
          endDateUpdate={endDateUpdate}
          dateFormat={format}
          handleBlurFunding={handleBlurFunding}
          handleBlurPer={handleBlurPer}
          handleBlurDes={handleBlurDes}
          handleChangeValueUpdate={handleChangeValueUpdate}
          handleClickUpdate={handleClickUpdate}
          //
          setThumbnailUpdate={setThumbnailUpdate}
          setsStartDateUpdate={setsStartDateUpdate}
          setEndDateUpdate={setEndDateUpdate}
          setDescriptionUpdate={setDescriptionUpdate}
          //
          desUpdateError={desUpdateError}
          fundingAmountError={fundingAmountError}
          shareRequirementError={shareRequirementError}
          thumbnailError={thumbnailError}
          setThumbnailError={setThumbnailError}
        //
        />

        <ModalConfirmDeal
          openModal={openModal}
          closeModal={handleCloseModal}
          handleChangeValue={handleChangeEdit}
          handleCreateDealForm={handleCreateDealForm}
          errors={errors}
          color={color}
          data={roundAndOrganization}
        />
      </div>
    </div>
  );
}
export default withRouter(RoundDeail);
