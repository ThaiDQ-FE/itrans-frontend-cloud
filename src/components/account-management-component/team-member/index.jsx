import React from "react";
import { Button, Tooltip } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import Images from "../../../assets/images/images";
import TeamMemberItem from "./team-member-item";
import { useState } from "react";
import ModalTeamMember from "../modal-teamMember";
import {
  authorizationAccount,
  checkEmailUser,
  checkIdUser,
  checkPathUrl,
  checkRoleUser,
  getLocalStorage,
  localStorages,
  pathQuanLyTaiKhoan,
  pathToChuc,
  sessionTimeOut,
  showMessage,
} from "../../../assets/helper/helper";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import {
  deleteTeamMember,
  getListTeamMember,
} from "../../../store/action/team.action";
import { checkImg, checkName, checkPos } from "../../../validate/create/team";
import { withRouter } from "react-router-dom";
function TeamMember(props) {
  const [openModal, setOpenModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [urlAvata, setUrlAvata] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: "",
    chucVu: "",
  });
  const [linkCv, setLinkCv] = useState(null);
  const [webLinkCv, setWebLinkCv] = useState(null);
  const [nameError, setNameError] = useState("");
  const [chucVuError, setChucVuError] = useState("");
  const [avataError, setAvataError] = useState("");
  const dispatch = useDispatch();
  const finalObject = (
    idInvestor,
    idOrganization,
    image,
    linkCv,
    name,
    position
  ) => {
    const object = {
      idInvestor: idInvestor,
      idOrganization: idOrganization,
      image: image,
      linkCv: linkCv,
      name: name,
      position: position,
    };
    return object;
  };

  const checkUrlLinkCv = () => {
    let finalUrlLinkCv;
    if (webLinkCv === null || webLinkCv === "") {
      finalUrlLinkCv = "";
    } else {
      finalUrlLinkCv = webLinkCv;
    }
    return finalUrlLinkCv;
  };
  const postTeam = (object, history) => {
    axios({
      method: "POST",
      url: "https://itrans2021.herokuapp.com/api/v1/auth/team",
      data: object,
    })
      .then((res) => {
        if (res.status === 200) {
          showMessage("success", "Th??m th??nh vi??n th??nh c??ng");
          dispatch(getListTeamMember(checkEmailUser(), true));
          handleCloseModal();
        } else {
          showMessage("error", "Th??m th??nh vi??n th???t b???i");
        }
      })
      .catch((err) => {
        sessionTimeOut(err, history);
      });
  };
  const putTeam = (object, history) => {
    axios({
      method: "PUT",
      url: `https://itrans2021.herokuapp.com/api/v1/team?id=${
        getLocalStorage("objectTeam").idMember
      }`,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
      data: object,
    })
      .then((res) => {
        if (res.status === 200) {
          showMessage("success", "C???p nh???t th??ng tin th??nh vi??n th??nh c??ng");
          dispatch(getListTeamMember(checkEmailUser(), true));
          handleCloseModal();
        } else {
          showMessage("error", "C???p nh???t th??ng tin th??nh vi??n th???t b???i");
        }
      })
      .catch((err) => {
        sessionTimeOut(err, history);
      });
  };
  const handleClickDelete = (id, name, vitri) => {
    Swal.fire({
      title: "B???n ch???c ch???n mu???n x??a th??nh vi??n n??y?",
      text: name + " - " + vitri,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "?????ng ??",
      cancelButtonText: "H???y",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteTeamMember(id));
      }
    });
  };
  const handleClickEdit = (item) => {
    localStorages("objectTeam", item);
    Swal.fire({
      icon: "question",
      title: "B???n mu???n s???a th??ng tin th??nh vi??n n??y?",
      text: item.name + " - " + item.position,
      heightAuto: true,
      timerProgressBar: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "?????ng ??",
      cancelButtonText: "H???y",
      confirmButtonColor: "#1890ff",
      cancelButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        setOpenModal(true);
        setOpenEdit(true);
        setUserInfo({
          name: item.name,
          chucVu: item.position,
        });
        setUrlAvata(item.image);
        setWebLinkCv(item.linkCv);
        setLinkCv(item.linkCv);
      } else {
        localStorage.removeItem("objectTeam");
      }
    });
  };
  const renderListTeamMember = () => {
    return props.teamMember.map((item, index) => {
      return (
        <div className="tm__box" key={index}>
          {checkPathUrl() === pathQuanLyTaiKhoan() ? (
            <div className="tm__editBox">
              <div className="tm__pencialBox">
                <Tooltip placement="top" title="C???p nh???t">
                  <img
                    src={Images.PENCIL}
                    alt="edit"
                    onClick={() => {
                      handleClickEdit(item);
                    }}
                  />
                </Tooltip>
              </div>
              <div className="tm__clearBox">
                <Tooltip placement="top" title="X??a">
                  <img
                    src={Images.RED_CANCEL}
                    alt="delete"
                    onClick={() => {
                      handleClickDelete(
                        item.idMember,
                        item.name,
                        item.position
                      );
                    }}
                  />
                </Tooltip>
              </div>
            </div>
          ) : (
            <></>
          )}

          <TeamMemberItem
            idMemeber={item.idMember}
            image={item.image}
            linkCv={item.linkCv}
            name={item.name}
            position={item.position}
          />
        </div>
      );
    });
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setUserInfo({
      name: "",
      chucVu: "",
    });
    setNameError("");
    setChucVuError("");
    setOpenModal(false);
    setUrlAvata(null);
    setLinkCv(null);
    setWebLinkCv(null);
    localStorage.removeItem("objectTeam");
    setOpenEdit(false);
    setAvataError("");
  };
  const handleClickButtonThem = (e) => {
    e.preventDefault();
    checkName(userInfo.name, setNameError);
    checkPos(userInfo.chucVu, setChucVuError);
    checkImg(urlAvata, setAvataError);
    if (userInfo.name !== "") {
      if (nameError === "" && chucVuError === "" && avataError === "") {
        Swal.fire({
          title: "B???n ch???c ch???n mu???n th??m th??nh vi??n n??y?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "?????ng ??",
          cancelButtonText: "H???y",
        }).then(async (result) => {
          if (result.isConfirmed) {
            if (checkRoleUser() === "INVESTOR") {
              let arrayTemp = [];
              arrayTemp.push(
                finalObject(
                  checkIdUser(),
                  null,
                  urlAvata,
                  checkUrlLinkCv(),
                  userInfo.name,
                  userInfo.chucVu
                )
              );
              postTeam(arrayTemp, props.history);
            } else {
              let arrayTemp = [];
              arrayTemp.push(
                finalObject(
                  null,
                  checkIdUser(),
                  urlAvata,
                  checkUrlLinkCv(),
                  userInfo.name,
                  userInfo.chucVu
                )
              );
              postTeam(arrayTemp, props.history);
            }
          }
        });
      }
    }
  };
  const handleClickButtonUpdate = (e) => {
    e.preventDefault();
    checkName(userInfo.name, setNameError);
    checkPos(userInfo.chucVu, setChucVuError);
    checkImg(urlAvata, setAvataError);
    if (userInfo.name !== "") {
      if (nameError === "" && chucVuError === "" && avataError === "") {
        Swal.fire({
          title: "B???n ch???c ch???n mu???n c???p nh???t th??ng tin c???a th??nh vi??n n??y?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "?????ng ??",
          cancelButtonText: "H???y",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const object = {
              image: urlAvata,
              linkCv: webLinkCv,
              name: userInfo.name,
              position: userInfo.chucVu,
            };
            putTeam(object, props.history);
          }
        });
      }
    }
  };
  const handleBlurName = () => {
    checkName(userInfo.name, setNameError);
  };
  const handleBlurChucVu = () => {
    checkPos(userInfo.chucVu, setChucVuError);
  };
  const handleChangeValue = (event) => {
    const { name, value } = event.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };
  const handleChangeInputLink = (event) => {
    const { value } = event.target;
    setWebLinkCv(value);
    setLinkCv(value);
  };

  const checkNoTeam = () => {
    if (checkPathUrl() === pathQuanLyTaiKhoan()) {
      return (
        <div className="tm__noTeamMember">
          <p>Hi???n t???i b???n kh??ng c?? th??nh vi??n n??o</p>
          <Button type="primary" size="large" onClick={handleOpenModal}>
            Th??m th??nh vi??n
          </Button>
        </div>
      );
    } else {
      if (checkPathUrl() === pathToChuc()) {
        return (
          <div className="tm__noTeamMember">
            <p>T??? ch???c n??y hi???n t???i ch??a ????ng t???i th??nh vi??n ch??? ch???t</p>
          </div>
        );
      } else {
        return (
          <div className="tm__noTeamMember">
            <p>Nh?? ?????u t?? n??y hi???n t???i ch??a ????ng t???i th??nh vi??n ch??? ch???t</p>
          </div>
        );
      }
    }
  };
  const checkAddTeam = () => {
    if (checkPathUrl() === pathQuanLyTaiKhoan()) {
      return (
        <div className="tm__box tm__add" onClick={handleOpenModal}>
          <div className="tm__plusAdd">
            <img src={Images.PLUS_ADD} alt="plus-add" />
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };
  return (
    <div
      className={`tm__Wrapper${
        props.teamMember.length === 0 ? " tm__noTeamMemberWrapper" : ""
      }`}
    >
      {props.teamMember.length !== 0 ? (
        <div className="tm__displayGird">
          {checkAddTeam()}
          {renderListTeamMember()}
        </div>
      ) : (
        checkNoTeam()
      )}
      <ModalTeamMember
        openOrClose={openModal}
        closeModal={handleCloseModal}
        urlAvata={urlAvata}
        setUrlAvata={setUrlAvata}
        handleClickThem={handleClickButtonThem}
        handleBlurName={handleBlurName}
        handleBlurChucVu={handleBlurChucVu}
        handleChangeValue={handleChangeValue}
        nameError={nameError}
        chucVuError={chucVuError}
        setLinkCv={setLinkCv}
        handleChangeInputLink={handleChangeInputLink}
        setWebLinkCv={setWebLinkCv}
        webLinkCv={webLinkCv}
        linkCv={linkCv}
        openEdit={openEdit}
        handleClickUpdate={handleClickButtonUpdate}
        avataError={avataError}
        setAvataError={setAvataError}
      />
    </div>
  );
}

export default withRouter(TeamMember);
