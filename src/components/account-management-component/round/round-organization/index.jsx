import React, { useState } from "react";
import { Card, Button, Pagination, Tag } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import Images from "../../../../assets/images/images";
import {
  authorizationAccount,
  checkEmailUser,
  checkIdUser,
  checkPathUrl,
  localStorages,
  pathQuanLyTaiKhoan,
  sessionTimeOut,
  showMessage,
} from "../../../../assets/helper/helper";
import ModalAddRound from "../../modal-create-round";
import moment from "moment";
import {
  checkEnd,
  checkMoney,
  checkPercent,
  checkStart,
  checkSummary,
  checkThumb,
} from "../../../../validate/create/round";
import Swal from "sweetalert2";
import axios from "axios";
import { defaultUrlAPI } from "../../../../configs/url";
import { useDispatch } from "react-redux";
import { getListRoundByIdOrganization } from "../../../../store/action/round.action";
import { withRouter, useHistory } from "react-router-dom";
function RoundByIdOrganization(props) {
  const [openModal, setOpenModal] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [listCertificate, setListCertificate] = useState([]);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  // Error
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");
  const [fundingAmountError, setFundingAmountError] = useState("");
  const [shareRequirementError, setShareRequirementError] = useState("");
  const [summaryError, setSummaryError] = useState("");
  const [thumbnailError, setThumbnailError] = useState("");
  //
  const [infoRound, setInfoRound] = useState({
    fundingAmount: "",
    shareRequirement: "",
    summary: "",
  });
  const dateFormat = "DD-MM-YYYY";
  // call API
  const postRound = (object, history) => {
    axios({
      method: "POST",
      url: defaultUrlAPI() + "round",
      data: object,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 201) {
          showMessage("success", "Tạo vòng gọi vốn thành công");
          setTimeout(() => {
            handleClose();
            dispatch(getListRoundByIdOrganization(checkIdUser(), true));
          }, 2000);
        } else {
          showMessage("error", res.data);
        }
      })
      .catch((err) => {
        sessionTimeOut(err, history);
      });
  };
  const handleOpen = () => {
    setOpenModal(true);
  };
  let history = useHistory();

  const handleClickToDetail = () => {
    history.push("/thong-tin-chi-tiet-vong-goi-von");
  };
  const handleClose = () => {
    setOpenModal(false);
    setInfoRound({
      fundingAmount: "",
      shareRequirement: "",
      summary: "",
    });
    setStartDate();
    setEndDate();
    setFundingAmountError("");
    setShareRequirementError("");
    setStartDateError("");
    setEndDateError("");
    setSummaryError("");
    setThumbnail("");
    setListCertificate([]);
    setThumbnailError("");
    setContent("");
  };
  const handleChangeInfoRound = (event) => {
    const { name, value } = event.target;
    setInfoRound({
      ...infoRound,
      [name]: value,
    });
  };
  const handleBlurMoney = () => {
    checkMoney(infoRound.fundingAmount, setFundingAmountError);
  };
  const handleBlurPercent = () => {
    checkPercent(infoRound.shareRequirement, setShareRequirementError);
  };
  const hanldeBlurStart = () => {
    checkStart(startDate, setStartDateError);
  };
  const handleBlurEnd = () => {
    checkEnd(endDate, setEndDateError);
  };
  const handleBlurSum = () => {
    checkSummary(infoRound.summary, setSummaryError);
  };
  const handleDelete = (index) => {
    let tempListCertificate = [...listCertificate];
    tempListCertificate.splice(index, 1);
    setListCertificate(tempListCertificate);
  };
  const onSubmit = (values) => {
    checkMoney(infoRound.fundingAmount, setFundingAmountError);
    checkPercent(infoRound.shareRequirement, setShareRequirementError);
    checkStart(startDate, setStartDateError);
    checkEnd(endDate, setEndDateError);
    checkSummary(infoRound.summary, setSummaryError);
    checkThumb(thumbnail, setThumbnailError);
    if (infoRound.fundingAmount !== "") {
      if (
        fundingAmountError === "" &&
        shareRequirementError === "" &&
        startDateError === "" &&
        endDateError === "" &&
        summaryError === "" &&
        thumbnailError === ""
      ) {
        if (content === "") {
          return showMessage(
            "error",
            "Mô tả chi tiết không được để trống hoặc được để mặc định"
          );
        } else {
          Swal.fire({
            icon: "question",
            title: "Bạn muốn tạo vòng gọi vốn này?",
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
              const finalStartDate = moment(startDate).format("DD-MM-YYYY");
              const finalEndDate = moment(endDate).format("DD-MM-YYYY");
              const money = parseFloat(infoRound.fundingAmount);
              const finalMoney = money.toFixed(2);
              const percent = parseFloat(infoRound.shareRequirement);
              const finalPercent = percent.toFixed(2);
              const object = {
                description: content,
                documents: listCertificate,
                endDate: finalEndDate,
                fundingAmount: parseFloat(finalMoney),
                mail: checkEmailUser(),
                shareRequirement: parseFloat(finalPercent),
                startDate: finalStartDate,
                summary: infoRound.summary,
                thumbnail: thumbnail,
              };
              postRound(object, props.history);
            }
          });
        }
      }
    }
  };
  const [length, setLength] = useState({
    minValue: 0,
    maxValue: 9,
  });
  const handleChange = (value) => {
    if (value <= 1) {
      setLength({
        minValue: 0,
        maxValue: 9,
      });
    } else {
      setLength({
        minValue: length.maxValue,
        maxValue: value * 9,
      });
    }
  };
  const renderTag = (value) => {
    if (value === "ACTIVE") {
      return <Tag className="rbio__active rbio__position">Hiện tại</Tag>;
    } else if (value === "PENDING") {
      return <Tag className="rbio__pending rbio__position">Đang chờ</Tag>;
    } else if (value === "EXPIRATION") {
      return <Tag className="rbio__expiration rbio__position">Hết hạn</Tag>;
    }
  };
  const checkNoRound = () => {
    if (checkPathUrl() === pathQuanLyTaiKhoan()) {
      return (
        <div className="rbio__noRound">
          <p>Hiện tại bạn không có vòng gọi vốn</p>
          <Button type="primary" size="large" onClick={handleOpen}>
            Tạo vòng gọi vốn
          </Button>
        </div>
      );
    } else {
      return (
        <div className="rbio__noRound">
          <p>Tổ chức này hiện không có vòng gọi vốn</p>
        </div>
      );
    }
  };
  const checkHaveRound = () => {
    if (checkPathUrl() === pathQuanLyTaiKhoan()) {
      return (
        <div className="rbio__addNewRound">
          <Button size="large" type="primary" onClick={handleOpen}>
            Tạo vòng gọi vốn
          </Button>
        </div>
      );
    } else {
      return <></>;
    }
  };
  return (
    <div
      className={`rbio__wrapper${
        props.listRound.length > 0 ? "" : " rbio__warpperNormal"
      }`}
    >
      {props.listRound.length > 0 ? checkHaveRound() : <></>}

      <div className="rbio__container">
        <div
          className={`rbio__listRound${
            props.listRound.length > 0 ? "" : " rbio__listRoundNormal"
          }`}
        >
          {props.listRound && props.listRound.length > 0
            ? props.listRound
                .slice(length.minValue, length.maxValue)
                .map((value, index) => (
                  <Card
                    onClick={() => {
                      handleClickToDetail();
                      localStorages("idRound", value.idRound);
                    }}
                    key={index}
                    hoverable
                    className="rbio__itemOrg"
                  >
                    {renderTag(value.status)}
                    <img
                      src={
                        value.thumbnail === ""
                          ? Images.NO_IMAGE
                          : value.thumbnail
                      }
                      alt="thumbnail"
                    />
                    <div className="ribo__stage">
                      <span>{value.stage}</span>
                    </div>
                    <div className="rbio__startDate">
                      <span>{value.startDate} / </span>
                      <span>{value.endDate}</span>
                    </div>
                    {value.summary === "" ? (
                      <></>
                    ) : (
                      <div className="rbio__summary">
                        <span>{value.summary}</span>
                      </div>
                    )}
                  </Card>
                ))
            : checkNoRound()}
        </div>
        <div className="ol__paging">
          {props.listRound.length > 9 ? (
            <Pagination
              defaultCurrent={1}
              defaultPageSize={9}
              onChange={handleChange}
              total={props.listRound.length}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <ModalAddRound
        open={openModal}
        close={handleClose}
        dateFormat={dateFormat}
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
        handleChangeInfoRound={handleChangeInfoRound}
        onSubmit={onSubmit}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        fundingAmountError={fundingAmountError}
        shareRequirementError={shareRequirementError}
        summaryError={summaryError}
        endDateError={endDateError}
        startDateError={startDateError}
        handleBlurMoney={handleBlurMoney}
        handleBlurPercent={handleBlurPercent}
        hanldeBlurStart={hanldeBlurStart}
        handleBlurEnd={handleBlurEnd}
        handleBlurSum={handleBlurSum}
        listCertificate={listCertificate}
        setListCertificate={setListCertificate}
        handleDelete={handleDelete}
        thumbnailError={thumbnailError}
        setThumbnailError={setThumbnailError}
        setContent={setContent}
      />
    </div>
  );
}

export default withRouter(RoundByIdOrganization);
