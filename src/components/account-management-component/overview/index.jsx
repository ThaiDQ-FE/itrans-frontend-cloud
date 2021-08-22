import React, { useState } from "react";
import { Timeline, Popover, Skeleton, Button } from "antd";
import Swal from "sweetalert2";
import "antd/dist/antd.css";
import "./styles.scss";
import Images from "../../../assets/images/images";
import {
  authorizationAccount,
  checkIdUser,
  checkPathUrl,
  checkRoleUser,
  getLocalStorage,
  localStorages,
  pathQuanLyTaiKhoan,
  sessionTimeOut,
  showMessage,
} from "../../../assets/helper/helper";
import ModalMileStone from "../modal-milestone";
import moment from "moment";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  deleteMilestoneById,
  getListMilestone,
} from "../../../store/action/milestone.action";
import OverviewContent from "./overview-content";
import { withRouter } from "react-router-dom";
import {
  checkContentMile,
  checkDateMile,
  checkTitleMile,
} from "../../../validate/create/mile";
import OverViewInfoComponent from "./overview-info";
import OverViewInfoViewComponent from "./overview-infoView";
function OverviewTab(props) {
  const [milestoneModal, setMilestoneModal] = useState(false);
  const [editMilestone, setEditMilestone] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [dateError, setDateError] = useState("");
  const [contentError, setContentError] = useState("");
  const [date, setDate] = useState();
  const dispatch = useDispatch();
  var formatDate = moment(date).format("DD-MM-YYYY");
  const dateFormat = "DD/MM/YYYY";
  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const postMilestone = (object, history) => {
    const token = authorizationAccount();
    axios({
      method: "POST",
      url: "https://itrans2021.herokuapp.com/api/v1/create-milestone",
      data: object,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 202) {
          return showMessage("error", res.data);
        } else if (res.status === 200) {
          showMessage("success", "Thêm cột mốc thành công");
          handleCloseModalMilestone();
          dispatch(getListMilestone(checkIdUser(), false));
        }
      })
      .catch((err) => {
        sessionTimeOut(err, history);
      });
  };
  const putMilestone = (object, history) => {
    const token = authorizationAccount();
    axios({
      method: "PUT",
      url: "https://itrans2021.herokuapp.com/api/v1/update-milestone",
      data: object,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          showMessage("success", "Cập nhật cột mốc thành công");
          handleCloseModalMilestone();
          dispatch(getListMilestone(checkIdUser(), false));
        } else {
          showMessage("error", res.data);
        }
      })
      .catch((err) => {
        sessionTimeOut(err, history);
      });
  };
  const handleOpenModalMilestone = () => {
    setMilestoneModal(true);
  };
  const handleOpenEditMilestone = (title, dateTime, content, id) => {
    localStorages("titleMilestone", title);
    localStorages("dateTimeMilestone", dateTime);
    localStorages("contentMilestone", content);
    localStorages("idMilestone", id);
    Swal.fire({
      icon: "question",
      title: "Bạn muốn sửa cột mốc này?",
      html: `Ngày đạt: ${dateTime} <br/> ${title}`,
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
        setMilestoneModal(true);
        setEditMilestone(true);
        setForm({
          title: title,
          content: content,
        });
      } else {
        localStorage.removeItem("titleMilestone");
        localStorage.removeItem("dateTimeMilestone");
        localStorage.removeItem("contentMilestone");
        localStorage.removeItem("idMilestone");
      }
    });
  };
  const handleCloseModalMilestone = () => {
    setForm({
      title: "",
      content: "",
    });
    setDate(undefined);
    setTitleError("");
    setDateError("");
    setMilestoneModal(false);
    setEditMilestone(false);
    localStorage.removeItem("titleMilestone");
    localStorage.removeItem("dateTimeMilestone");
    localStorage.removeItem("contentMilestone");
    localStorage.removeItem("idMilestone");
  };
  const handleChangeValue = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleBlurTitle = () => {
    checkTitleMile(form.title, setTitleError);
  };
  const handleBlurDate = () => {
    checkDateMile(date, setDateError);
  };
  const handleBlurContent = () => {
    checkContentMile(form.content, setContentError);
  };
  const handleClickButtonThem = (e) => {
    e.preventDefault();
    handleBlurTitle();
    handleBlurDate();
    handleBlurContent();
    if (form.title !== "" && date !== undefined) {
      const object = {
        content: form.content,
        date: formatDate,
        idOrganization: checkIdUser(),
        title: form.title,
      };
      Swal.fire({
        icon: "warning",
        title: "Bạn muốn thêm cột mốc này?",
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
          postMilestone(object, props.history);
        }
      });
    }
  };
  const handleClickButtonCapNhat = (e) => {
    e.preventDefault();
    checkTitleMile(form.title, setTitleError);
    checkContentMile(form.content, setContentError);
    if (titleError === "" && contentError === "") {
      if (date === undefined) {
        const object = {
          content: form.content,
          date: getLocalStorage("dateTimeMilestone"),
          idMilestone: getLocalStorage("idMilestone"),
          title: form.title,
        };
        Swal.fire({
          icon: "warning",
          title: "Bạn chắc chắn muốn cập nhật cột mốc này?",
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
            putMilestone(object, props.history);
          }
        });
      } else if (date !== undefined) {
        const object = {
          content: form.content,
          date: formatDate,
          idMilestone: getLocalStorage("idMilestone"),
          title: form.title,
        };
        Swal.fire({
          icon: "warning",
          title: "Bạn chắc chắn muốn cập nhật cột mốc này?",
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
            putMilestone(object, props.history);
          }
        });
      }
    }
  };
  const handleClickDeleteTimeline = (title, dateTime, id) => {
    Swal.fire({
      icon: "warning",
      title: "Bạn muốn xóa cột mốc này?",
      html: `Ngày đạt: ${dateTime} <br/> ${title}`,
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
        dispatch(deleteMilestoneById(id, props.history));
      }
    });
  };
  const renderListMilestone = () => {
    return props.listMilestone.map((item, index) => {
      return (
        <Timeline.Item key={index} className="timeline__item" label={item.date}>
          {checkPathUrl() === "/quan-ly-tai-khoan" ? (
            <div className="timeline__action">
              <img
                src={Images.PENCIL}
                alt="edit"
                className="timeline__edit"
                onClick={() =>
                  handleOpenEditMilestone(
                    item.title,
                    item.date,
                    item.content,
                    item.id
                  )
                }
              />
              <img
                src={Images.RED_CANCEL}
                alt="edit"
                className="timeline__delete"
                onClick={() =>
                  handleClickDeleteTimeline(item.title, item.date, item.id)
                }
              />
            </div>
          ) : (
            <></>
          )}

          {item.content === "" ? (
            item.title
          ) : (
            <Popover title={null} content={item.content} placement="right">
              {item.title}
            </Popover>
          )}
        </Timeline.Item>
      );
    });
  };
  const checkAchievement = () => {
    if (props.listMilestone === "No Data") {
      if (checkPathUrl() === "/quan-ly-tai-khoan") {
        return (
          <div className="ot__noMilestone">
            <p>Bạn chưa có cột mốc. Hãy thêm cột mốc</p>
            <Button
              onClick={handleOpenModalMilestone}
              className="ot__noMiletoneButton"
              type="primary"
            >
              Thêm cột mốc
            </Button>
          </div>
        );
      } else {
        return (
          <div className="ot__noMilestone">
            <p>Tổ chức này có cột mốc nào được đăng tải</p>
          </div>
        );
      }
    } else {
      return <Timeline mode="left">{renderListMilestone()}</Timeline>;
    }
  };
  const checkPath = () => {
    const path = window.location.pathname;
    if (path === "/to-chuc/chi-tiet") {
      return (
        <div className="ot__mileStone">
          <p className="ot__mileStoneTitle">Cột mốc</p>
          {props.loading === true ? <Skeleton active /> : checkAchievement()}
        </div>
      );
    } else if (path === "/quan-ly-tai-khoan") {
      if (checkRoleUser() === "INVESTOR") {
        return <></>;
      } else {
        return (
          <div className="ot__mileStone">
            {props.listMilestone !== "No Data" ? (
              <div className="ot__plusMilestone">
                <img
                  src={Images.PLUS}
                  alt="plus milestone"
                  onClick={handleOpenModalMilestone}
                />
              </div>
            ) : (
              <></>
            )}
            <p className="ot__mileStoneTitle">Cột mốc</p>
            {props.loading === true ? <Skeleton active /> : checkAchievement()}
          </div>
        );
      }
    }
  };
  return (
    <div className="ot__wrapper">
      <ModalMileStone
        handleBlurTitle={handleBlurTitle}
        handleBlurDate={handleBlurDate}
        handleBlurContent={handleBlurContent}
        titleError={titleError}
        dateError={dateError}
        contentError={contentError}
        handleSubmit={handleClickButtonThem}
        handleUpdata={handleClickButtonCapNhat}
        dateFormat={dateFormat}
        date={date}
        setDate={setDate}
        handleChangeValue={handleChangeValue}
        milestoneModal={milestoneModal}
        closeModal={handleCloseModalMilestone}
        editMilestone={editMilestone}
      />
      <div className="ot__left">
        {checkPathUrl() === pathQuanLyTaiKhoan() ? (
          <OverViewInfoComponent
            detail={props.detailCompany}
            indus={props.detailCompany.industries}
            pro={props.detailCompany.provinces}
            stage={props.detailCompany.stages}
            region={props.detailCompany.regions}
            investorType={props.detailCompany.investorTypes}
            loading={props.loading}
          />
        ) : (
          <OverViewInfoViewComponent
            detailView={props.detailCompanyView}
            indusView={props.detailCompanyView.industries}
            proView={props.detailCompanyView.provinces}
            stageView={props.detailCompanyView.stages}
            regionView={props.detailCompanyView.regions}
            investorTypeView={props.detailCompanyView.investorTypes}
            loading={props.loading}
          />
        )}

        {checkPath()}
      </div>
      <OverviewContent media={props.media} introduce={props.introduce} />
    </div>
  );
}
export default withRouter(OverviewTab);
