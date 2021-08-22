import React from "react";
import { Button, Tabs } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import Images from "../../../assets/images/images";
import OverviewTab from "../../../components/account-management-component/overview";
import NewsTab from "../../../components/account-management-component/news";
import RoundById from "../../../components/account-management-component/round";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDeatilCompany,
  getDeatilCompanyView,
} from "../../../store/action/company.action";
import {
  authorizationAccount,
  checkEmailUser,
  checkIdUser,
  checkNameUser,
  checkPathUrl,
  checkRoleUser,
  getLocalStorage,
  pathNhaDauTu,
  pathQuanLyTaiKhoan,
  pathToChuc,
  sessionTimeOut,
  showMessage,
} from "../../../assets/helper/helper";
import { getListMilestone } from "../../../store/action/milestone.action";
import { getListMediaById } from "../../../store/action/media.action";
import { getListIntroduceByGmail } from "../../../store/action/introduce.action";
import {
  getListArticleByGmail,
  getListFollowed,
  getListLinkArticle,
} from "../../../store/action/artical.action";
import TeamMember from "../../../components/account-management-component/team-member";
import { getListTeamMember } from "../../../store/action/team.action";
import {
  getListRoundActiveByIdOrganization,
  getListRoundByIdInvestor,
  getListRoundByIdOrganization,
  getRoundActiveV2,
} from "../../../store/action/round.action";
import { getListIndustry } from "../../../store/action/register.action";
import NotAuth from "../../error/auth";
import { withRouter } from "react-router-dom";
import AccountManagementFollow from "../../../components/account-management-component/follow";
import { checkRequestDeal } from "../../../store/action/deal.action";
import { useState } from "react";
import ModalInvite from "../../../components/account-management-component/modal-invite";
import { checkDes } from "../../../validate/create/inviteDeal";
import Swal from "sweetalert2";
import axios from "axios";
import { defaultUrlAPI } from "../../../configs/url";
import message from "../../../assets/message/text";
import {
  sendMailDefaultHTML,
  sendMailHTML,
} from "../../../store/action/mail.action";
import { contentInviteRound, titleInvite } from "../../../configs/sendMail";
function AccountManagement(props) {
  const { TabPane } = Tabs;
  const dispatch = useDispatch();
  const { detailCompany, detailCompanyView } = useSelector(
    (state) => state.detailCompany
  );
  const { loading } = useSelector((state) => state.loading);
  const { listMilestone } = useSelector((state) => state.milestone);
  const { listMedia } = useSelector((state) => state.media);
  const { listIntroduce } = useSelector((state) => state.introduce);
  const { listArticle, listFollowed } = useSelector((state) => state.article);
  const { listTeamMember } = useSelector((state) => state.teamMember);
  const { listRoundByIdInvestor, listRoundByIdOrganization } = useSelector(
    (state) => state.round
  );
  const { listLinkArticle } = useSelector((state) => state.article);
  const { listIndustry } = useSelector((state) => state.register);
  const { checkDeal } = useSelector((state) => state.deal);
  const { roundActiveV2 } = useSelector((state) => state.round);
  const [openModalInvite, setOpenModalInvite] = useState(false);
  const [description, setDescription] = useState("");
  const [desError, setDesError] = useState("");
  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/quan-ly-tai-khoan") {
      dispatch(getListIndustry());
      dispatch(getDeatilCompany(checkEmailUser(), true));
      dispatch(getListMediaById(checkEmailUser(), true));
      dispatch(getListArticleByGmail(checkEmailUser(), false));
      dispatch(getListIntroduceByGmail(checkEmailUser(), true));
      dispatch(getListTeamMember(checkEmailUser(), false));
      dispatch(getListFollowed(checkEmailUser(), true, props.history));
      dispatch(getListLinkArticle(checkEmailUser(), true));
      if (checkRoleUser() === "ORGANIZATION") {
        dispatch(getListMilestone(checkIdUser(), true));
      }
      if (checkRoleUser() === "INVESTOR") {
        dispatch(getListRoundByIdInvestor(checkIdUser(), props.history));
      } else {
        dispatch(
          getListRoundByIdOrganization(checkIdUser(), false, props.history)
        );
      }
    } else if (path === "/to-chuc/chi-tiet") {
      const gmail = getLocalStorage("gmailOrganizationToDetail");
      const id = getLocalStorage("idOrganizationToDetail");
      dispatch(getDeatilCompanyView(gmail), true);
      dispatch(getListMediaById(gmail, true));
      dispatch(getListArticleByGmail(gmail, false));
      dispatch(getListIntroduceByGmail(gmail, true));
      dispatch(getListTeamMember(gmail, false));
      dispatch(getListMilestone(id, true));
      dispatch(getListRoundByIdOrganization(id, false, props.history));
      dispatch(getListLinkArticle(gmail, true));
    } else if (path === "/nha-dau-tu/chi-tiet") {
      const gmail = getLocalStorage("gmailInvestorToDetail");
      const id = getLocalStorage("idInvestorToDetail");
      dispatch(getDeatilCompanyView(gmail), true);
      dispatch(getListMediaById(gmail, true));
      dispatch(getListIntroduceByGmail(gmail, true));
      dispatch(getListTeamMember(gmail, false));
      dispatch(getListRoundByIdInvestor(id, props.history));
      dispatch(getListArticleByGmail(gmail, false));
      dispatch(checkRequestDeal(checkIdUser(), id, props.history));
      dispatch(getRoundActiveV2(checkIdUser(), props.history));
      dispatch(getListLinkArticle(gmail, true));
    }
  }, []);
  const handleOpenModal = () => {
    setOpenModalInvite(true);
  };
  const handleCloseModal = () => {
    setOpenModalInvite(false);
  };
  const handleChangeDes = (event) => {
    const { value } = event.target;
    setDescription(value);
  };
  const handleBlurDes = () => {
    checkDes(description, setDesError);
  };
  const handleClickInvite = () => {
    Swal.fire({
      title: `Bạn chắc chắn muốn mời nhà đầu tư ${detailCompanyView.name}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const object = {
          description: description,
          idInvestor: getLocalStorage("idInvestorToDetail"),
          idRound: roundActiveV2.idRound,
        };
        inviteInvestor(object, props.history);
      }
    });
  };

  const inviteInvestor = (object, history) => {
    axios({
      method: "POST",
      url: defaultUrlAPI() + "send-request-deal",
      data: object,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          showMessage("success", "Mời nhà đầu tư thành công");
          handleCloseModal();

          dispatch(
            checkRequestDeal(
              checkIdUser(),
              getLocalStorage("idInvestorToDetail"),
              history
            )
          );
          dispatch(
            sendMailDefaultHTML(
              contentInviteRound(
                checkNameUser(),
                roundActiveV2.fundingAmount,
                roundActiveV2.shareRequirement,
                object.description
              ),
              titleInvite(),
              detailCompanyView.email
            )
          );
        } else {
          showMessage("error", "Mời nhà đầu tư thất bại");
        }
      })
      .catch((err) => {
        console.log(err);
        sessionTimeOut(err, history);
      });
  };
  const checkRole = () => {
    if (checkPathUrl() === pathQuanLyTaiKhoan()) {
      if (checkRoleUser() === "INVESTOR") {
        return "Thỏa thuận";
      } else {
        return "Vòng gọi vốn";
      }
    } else if (checkPathUrl() === pathToChuc()) {
      return "Vòng gọi vốn";
    } else if (checkPathUrl() === pathNhaDauTu()) {
      return "Thỏa thuận";
    }
  };

  const checkTab = () => {
    if (checkPathUrl() === pathQuanLyTaiKhoan()) {
      if (detailCompany.investorType !== "Nhà đầu tư thiên thần") {
        return (
          <TabPane tab="Thành viên chủ chốt" key="3">
            <TeamMember teamMember={listTeamMember} />
          </TabPane>
        );
      } else {
        return <></>;
      }
    } else {
      if (detailCompanyView.investorType !== "Nhà đầu tư thiên thần") {
        return (
          <TabPane tab="Thành viên chủ chốt" key="3">
            <TeamMember teamMember={listTeamMember} />
          </TabPane>
        );
      } else {
        return <></>;
      }
    }
  };
  if (loading === true) {
    return (
      <div className="am__loading">
        <img className="am__imgLoading" src={Images.LOADING} alt="loading" />
      </div>
    );
  }
  if (getLocalStorage("userInfo") === null) {
    return <NotAuth />;
  } else if (checkRoleUser() === "ADMIN") {
    return <NotAuth />;
  } else {
    return (
      <div className="am__wrapper">
        {checkPathUrl() === "/nha-dau-tu/chi-tiet" ? (
          (Object.keys(roundActiveV2).length === 0) === false ? (
            checkDeal === true ? (
              <Button
                onClick={handleOpenModal}
                className="am__buttonInvite"
                size="large"
                type="primary"
              >
                Mời nhà đầu tư
              </Button>
            ) : (
              <span className="am__spanInvited">Đã mời</span>
            )
          ) : (
            <span className="am__spanInvited">Vui lòng tạo vòng gọi vốn</span>
          )
        ) : (
          <></>
        )}
        <div className="am__container">
          <div className="am__image">
            {checkPathUrl() === pathQuanLyTaiKhoan() ? (
              <img
                src={
                  detailCompany.logo === ""
                    ? Images.NO_IMAGE
                    : detailCompany.logo
                }
                alt="logo company"
              />
            ) : (
              <img
                src={
                  detailCompanyView.logo === ""
                    ? Images.NO_IMAGE
                    : detailCompanyView.logo
                }
                alt="logo company"
              />
            )}
          </div>
          {checkPathUrl() === pathQuanLyTaiKhoan() ? (
            <div className="am__info">
              <span>{detailCompany.name}</span>
              <br />
              <span>
                {detailCompany.numberOfEmp} thành viên - Thành lập năm{" "}
                {detailCompany.foundedYear}
              </span>
            </div>
          ) : (
            <div className="am__info">
              <span>{detailCompanyView.name}</span>
              <br />
              <span>
                {detailCompanyView.numberOfEmp} thành viên - Thành lập năm{" "}
                {detailCompanyView.foundedYear}
              </span>
            </div>
          )}
          {checkPathUrl() === pathQuanLyTaiKhoan() ? (
            <div className="am__info">
              <span>{detailCompany.name}</span>
              <br />
              <span>
                {detailCompany.numberOfEmp} thành viên - Thành lập năm{" "}
                {detailCompany.foundedYear}
              </span>
            </div>
          ) : (
            <div className="am__info">
              <span>{detailCompanyView.name}</span>
              <br />
              <span>
                {detailCompanyView.numberOfEmp} thành viên - Thành lập năm{" "}
                {detailCompanyView.foundedYear}
              </span>
            </div>
          )}

          <Tabs defaultActiveKey="1" type="card" size="large">
            <TabPane tab="Tổng quan" key="1">
              <OverviewTab
                detailCompany={detailCompany}
                detailCompanyView={detailCompanyView}
                listMilestone={listMilestone}
                loading={loading}
                media={listMedia}
                introduce={listIntroduce}
              />
            </TabPane>
            <TabPane tab={checkRole()} key="2">
              <RoundById
                listRoundByIdInvestor={listRoundByIdInvestor}
                listRoundByIdOrganization={listRoundByIdOrganization}
              />
            </TabPane>
            {checkTab()}
            <TabPane tab="Tin tức" key="4">
              <NewsTab
                article={listArticle}
                industry={listIndustry}
                link={listLinkArticle}
              />
            </TabPane>
            {checkPathUrl() === pathQuanLyTaiKhoan() ? (
              <TabPane tab="Theo dõi" key="5">
                <AccountManagementFollow list={listFollowed} />
              </TabPane>
            ) : (
              <></>
            )}
          </Tabs>
        </div>
        <ModalInvite
          openModal={openModalInvite}
          closeModal={handleCloseModal}
          value={roundActiveV2}
          handleChangeDes={handleChangeDes}
          handleBlurDes={handleBlurDes}
          desError={desError}
          handleClickInvite={handleClickInvite}
        />
      </div>
    );
  }
}
export default withRouter(AccountManagement);
