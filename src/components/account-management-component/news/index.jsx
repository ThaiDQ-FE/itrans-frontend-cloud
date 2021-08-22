import React, { useState } from "react";
import { Button, Pagination, Tooltip } from "antd";
import ArticlesItem from "./article-item";
import "./styles.scss";
import "antd/dist/antd.css";
import {
  authorizationAccount,
  checkEmailUser,
  checkPathUrl,
  pathNhaDauTu,
  pathQuanLyTaiKhoan,
  sessionTimeOut,
  showMessage,
} from "../../../assets/helper/helper";
import ModalCreateNews from "../modal-create-news";
import {
  checkHash,
  checkLink,
  checkLinkDate,
  checkLinkTitle,
  checkResource,
  checkSummary,
  checkThumbnail,
  checkTitle,
} from "../../../validate/create/news";
import Swal from "sweetalert2";
import axios from "axios";
import { defaultUrlAPI } from "../../../configs/url";
import { useDispatch } from "react-redux";
import {
  deleleArticleById,
  getListArticleByGmail,
  getListLinkArticle,
} from "../../../store/action/artical.action";
import { withRouter } from "react-router";
import Images from "../../../assets/images/images";
import ModalImpNews from "../modal-imp-news";
import moment from "moment";
function NewsTab(props) {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalLink, setOpenModalLink] = useState(false);
  const [openModalLinkUpdate, setOpenModalLinkUpdate] = useState(false);
  const [infoNews, setInfoNews] = useState({
    title: "",
    description: "",
  });
  const [idArticle, setIdArticle] = useState("");
  const [content, setContent] = useState("");
  const [arrayIndustries, setArrayIndustries] = useState([]);
  const [arrayIndus, setArrayyIndus] = useState([]);
  const [thumbnail, setThumbnail] = useState("");
  // link
  const [linkDate, setLinkDate] = useState();
  const [idLink, setIdLink] = useState("");
  // error
  const [titleError, setTitleError] = useState("");
  const [sumError, setSumError] = useState("");
  const [thumbnailError, setThumbnailError] = useState("");
  const [hashTagError, setHashTagError] = useState("");
  //
  const [linkDateError, setLinkDateError] = useState("");
  const [linkLinkError, setLinkLinkError] = useState("");
  const [linkResourceError, setLinkResourceError] = useState("");
  const [linkTitleError, setLinkTitleError] = useState("");
  const [infolink, setInfoLink] = useState({
    linkLink: "",
    linkResource: "",
    linkTitle: "",
  });
  const dateFormat = "DD-MM-YYYY";
  const [length, setLength] = useState({
    minValue: 0,
    maxValue: 5,
  });
  const handleChange = (value) => {
    if (value <= 1) {
      setLength({
        minValue: 0,
        maxValue: 5,
      });
    } else {
      setLength({
        minValue: length.maxValue,
        maxValue: value * 5,
      });
    }
  };
  const handleOpen = () => {
    Swal.fire({
      icon: "question",
      title: "Bạn muốn tạo bài viết từ?",
      heightAuto: true,
      timerProgressBar: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Bài viết mới",
      cancelButtonText: "Từ nguồn khác",
      confirmButtonColor: "#42bf63",
      cancelButtonColor: "#1890ff",
    }).then((result) => {
      if (result.isConfirmed) {
        setOpenModal(true);
      } else if (result.dismiss === "cancel") {
        setOpenModalLink(true);
      }
    });
  };
  const handleClose = () => {
    setOpenModal(false);
    setOpenModalUpdate(false);
    setOpenModalLink(false);
    setOpenModalLinkUpdate(false);
    setThumbnail("");
    setInfoNews({
      title: "",
      description: "",
    });
    setArrayIndustries([]);
    setArrayyIndus([]);
    setContent("");
    setIdArticle("");
    setLinkDate();
    setInfoLink({
      linkLink: "",
      linkResource: "",
      linkTitle: "",
    });
    //error
    setTitleError("");
    setSumError("");
    setThumbnailError("");
    setHashTagError("");
    setLinkDateError("");
    setLinkLinkError("");
    setLinkResourceError("");
    setLinkTitleError("");
  };
  const handleChangeInfo = (event) => {
    const { name, value } = event.target;
    setInfoNews({
      ...infoNews,
      [name]: value,
    });
  };
  const handleChangeValue = (value, action) => {
    let array = [];
    for (let i = 0; i < action.length; i++) {
      array.push(Number(action[i].key));
    }
    if (array.length > 5) {
      setArrayIndustries(array);
      setArrayyIndus(value);
      setHashTagError("Chỉ được chọn tối đa 5 ngành nghề");
    } else {
      setArrayIndustries(array);
      setArrayyIndus(value);
      setHashTagError("");
    }
  };

  const handleChangeValueLink = (event) => {
    const { name, value } = event.target;
    setInfoLink({
      ...infolink,
      [name]: value,
    });
  };

  const handleBlurLinkTitle = () => {
    checkLinkTitle(infolink.linkTitle, setLinkTitleError);
  };

  const handleBlurLinkResource = () => {
    checkResource(infolink.linkResource, setLinkResourceError);
  };

  const handleBlurLinkLink = () => {
    checkLink(infolink.linkLink, setLinkLinkError);
  };
  const handleBlurLinkDate = () => {
    checkLinkDate(linkDate, setLinkDateError);
  };

  const handleChangeContent = (e) => {};
  const handleBlurHash = () => {
    checkHash(arrayIndustries, setHashTagError);
  };
  const handleBlurTitle = () => {
    checkTitle(infoNews.title, setTitleError);
  };
  const handleBlurSum = () => {
    checkSummary(infoNews.description, setSumError);
  };
  const handleCreate = () => {
    checkTitle(infoNews.title, setTitleError);
    checkHash(arrayIndustries, setHashTagError);
    checkSummary(infoNews.description, setSumError);
    checkThumbnail(thumbnail, setThumbnailError);
    if (infoNews.title !== "") {
      if (
        titleError === "" &&
        hashTagError === "" &&
        sumError === "" &&
        thumbnailError === ""
      ) {
        if (content === "") {
          return showMessage("error", "Nội dung không được bỏ trống");
        } else if (openModal === true && openModalUpdate === true) {
          Swal.fire({
            icon: "question",
            title: "Bạn muốn cập nhật bài viết này?",
            heightAuto: true,
            timerProgressBar: false,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy",
            confirmButtonColor: "#1890ff",
            cancelButtonColor: "red",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              const object = {
                content: content,
                description: infoNews.description,
                idArticle: idArticle,
                idIndustries: arrayIndustries,
                linkThumbnail: thumbnail,
                title: infoNews.title,
              };
              updateArticle(object, props.history);
            }
          });
        } else {
          Swal.fire({
            icon: "question",
            title: "Bạn muốn tạo bài viết này?",
            heightAuto: true,
            timerProgressBar: false,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy",
            confirmButtonColor: "#1890ff",
            cancelButtonColor: "red",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              const object = {
                content: content,
                description: infoNews.description,
                gmail: checkEmailUser(),
                idIndustries: arrayIndustries,
                linkThumbnail: thumbnail,
                title: infoNews.title,
              };
              createArticle(object, props.history);
            }
          });
        }
      }
    }
  };

  const handleCreteLinkNew = () => {
    checkLinkTitle(infolink.linkTitle, setLinkTitleError);
    checkResource(infolink.linkResource, setLinkResourceError);
    checkLink(infolink.linkLink, setLinkLinkError);
    checkLinkDate(linkDate, setLinkDateError);
    if (infolink.linkLink !== "") {
      if (
        linkLinkError === "" &&
        linkTitleError === "" &&
        linkResourceError === "" &&
        linkDateError === ""
      ) {
        Swal.fire({
          icon: "question",
          title: "Bạn muốn tạo bài viết này?",
          heightAuto: true,
          timerProgressBar: false,
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Hủy",
          confirmButtonColor: "#1890ff",
          cancelButtonColor: "red",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            const object = {
              date: moment(linkDate).format("DD-MM-YYYY"),
              gmail: checkEmailUser(),
              link: infolink.linkLink,
              resource: infolink.linkResource,
              title: infolink.linkTitle,
            };
            createLinkNew(object, props.history);
          }
        });
      }
    }
  };
  const handleUpdateLinkNew = () => {
    checkLinkTitle(infolink.linkTitle, setLinkTitleError);
    checkResource(infolink.linkResource, setLinkResourceError);
    checkLink(infolink.linkLink, setLinkLinkError);
    checkLinkDate(linkDate, setLinkDateError);
    if (infolink.linkLink !== "") {
      if (
        linkLinkError === "" &&
        linkTitleError === "" &&
        linkResourceError === "" &&
        linkDateError === ""
      ) {
        Swal.fire({
          icon: "question",
          title: "Bạn muốn cập nhật bài viết này?",
          heightAuto: true,
          timerProgressBar: false,
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Hủy",
          confirmButtonColor: "#1890ff",
          cancelButtonColor: "red",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            var object;
            if (moment(linkDate).format("DD-MM-YYYY") === "Invalid date") {
              object = {
                date: linkDate,
                idNews: idLink,
                link: infolink.linkLink,
                resource: infolink.linkResource,
                title: infolink.linkTitle,
              };
            } else {
              object = {
                date: moment(linkDate).format("DD-MM-YYYY"),
                idNews: idLink,
                link: infolink.linkLink,
                resource: infolink.linkResource,
                title: infolink.linkTitle,
              };
            }

            console.log(object);
            updateLink(object, props.history);
          }
        });
      }
    }
  };

  const createLinkNew = (object, history) => {
    axios({
      method: "POST",
      url: defaultUrlAPI() + "news",
      data: object,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          showMessage("success", "Tạo bài viết thành công");
          setTimeout(() => {
            handleClose();
            dispatch(getListLinkArticle(checkEmailUser(), true));
          }, 2000);
        } else {
          showMessage("error", res.data);
        }
      })
      .catch((err) => {
        sessionTimeOut(err, history);
      });
  };

  const createArticle = (object, history) => {
    axios({
      method: "POST",
      url: defaultUrlAPI() + "article",
      data: object,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          showMessage("success", "Tạo bài viết thành công");
          setTimeout(() => {
            handleClose();
            dispatch(getListArticleByGmail(checkEmailUser(), true));
          }, 2000);
        } else {
          showMessage("error", "Tạo bài viết thất bại");
        }
      })
      .catch((err) => {
        sessionTimeOut(err, history);
      });
  };
  const updateArticle = (object, history) => {
    axios({
      method: "PUT",
      url: defaultUrlAPI() + "article",
      data: object,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          showMessage("success", "Cập nhật bài viết thành công");
          setTimeout(() => {
            handleClose();
            dispatch(getListArticleByGmail(checkEmailUser(), true));
          }, 2000);
        } else {
          showMessage("error", "Cập nhật bài viết thất bại");
        }
      })
      .catch((err) => {
        sessionTimeOut(err, history);
      });
  };
  const updateLink = (object, history) => {
    axios({
      method: "PUT",
      url: defaultUrlAPI() + "news",
      data: object,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          showMessage("success", "Cập nhật bài viết thành công");
          setTimeout(() => {
            handleClose();
            dispatch(getListLinkArticle(checkEmailUser(), true));
          }, 2000);
        } else {
          showMessage("error", res.data);
        }
      })
      .catch((err) => {
        sessionTimeOut(err, history);
      });
  };
  const handleDeleteArticle = (id, title) => {
    Swal.fire({
      icon: "question",
      title: "Bạn muốn xóa bài viết này?",
      html: `<b>${title}</b>`,
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
        dispatch(deleleArticleById(id, props.history));
      }
    });
  };
  const handleEditArticle = (value) => {
    setInfoNews({
      title: value.title,
      description: value.description,
    });
    setThumbnail(value.thumbnail);
    for (let i = 0; i < value.articleIndustries.length; i++) {
      arrayIndustries.push(value.articleIndustries[i].idIndustry);
    }
    for (let i = 0; i < value.articleIndustries.length; i++) {
      arrayIndus.push(value.articleIndustries[i].nameIndustry);
    }
    setContent(value.content);
    setIdArticle(value.idArticle);
    Swal.fire({
      icon: "question",
      title: "Bạn muốn sửa bài viết này?",
      html: `<b>${value.title}</b>`,
      heightAuto: true,
      timerProgressBar: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#1890ff",
      cancelButtonColor: "red",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        setOpenModalUpdate(true);
        setOpenModal(true);
      } else {
        setInfoNews({
          title: "",
          description: "",
        });
        setThumbnail("");
        setArrayIndustries([]);
        setContent("");
        setIdArticle("");
        setArrayyIndus([]);
      }
    });
  };
  const handleEditLink = (value) => {
    setInfoLink({
      linkLink: value.link,
      linkResource: value.resource,
      linkTitle: value.title,
    });
    setLinkDate(value.date);
    setIdLink(value.idNews);
    Swal.fire({
      icon: "question",
      title: "Bạn muốn sửa bài viết này?",
      html: `<b>${value.title}</b>`,
      heightAuto: true,
      timerProgressBar: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#1890ff",
      cancelButtonColor: "red",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        setOpenModalLink(true);
        setOpenModalLinkUpdate(true);
      } else {
        setInfoLink({
          linkLink: "",
          linkResource: "",
          linkTitle: "",
        });
        setLinkDate();
        setIdLink("");
      }
    });
  };
  console.log(linkDate);
  const handleClickArticle = (id) => {
    props.history.push(`/tin-tuc/chi-tiet/${id}`);
  };
  console.log(props.link);
  return (
    <div
      className={`nt__wrapper${
        props.article.length === 0 && props.link.length === 0
          ? " nt__noArticleWrapper"
          : props.article.length >= 1 || props.link.length >= 1
          ? " nt__oneArticleWrapper"
          : ""
      }`}
    >
      {props.article.length >= 0 || props.link.length >= 0 ? (
        checkPathUrl() === pathQuanLyTaiKhoan() ? (
          <div className="nt__buttonAdd">
            <Button type="primary" size="large" onClick={handleOpen}>
              Thêm bài viết
            </Button>
          </div>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}

      {props.article.length === 0 && props.link.length === 0 ? (
        checkPathUrl() === pathQuanLyTaiKhoan() ? (
          <div className="nt__noArticle">
            <p>Hiện tại bạn không có bài viết nào được đăng tải</p>
            <Button type="primary" size="large" onClick={handleOpen}>
              Tạo bài viết
            </Button>
          </div>
        ) : (
          <div className="nt__noArticle">
            <p>
              {checkPathUrl() === pathNhaDauTu()
                ? "Nhà đầu tư này "
                : "Tổ chức này "}{" "}
              không có bài viết nào được đăng tải
            </p>
          </div>
        )
      ) : (
        <div className="nt__contain">
          <div className="nt__selfArticle">
            {props.article.length === 0 ? (
              checkPathUrl() === pathQuanLyTaiKhoan() ? (
                <p className="nt__noSelf">
                  Bạn chưa đăng tải bài viết cá nhân nào
                </p>
              ) : (
                <p className="nt__noSelf">
                  {checkPathUrl() === pathNhaDauTu()
                    ? "Nhà đầu tư này "
                    : "Tổ chức này "}{" "}
                  không có bài viết cá nhân nào được đăng tải
                </p>
              )
            ) : (
              props.article
                .slice(length.minValue, length.maxValue)
                .map((value, index) => (
                  <div className="nt__articleWrappers" key={index}>
                    <div
                      className="nt__articleWrapper"
                      onClick={() => handleClickArticle(value.idArticle)}
                    >
                      <ArticlesItem
                        id={value.idArticle}
                        owner={value.accountCreate}
                        listIndustries={value.articleIndustries}
                        createAt={value.createAt}
                        description={value.description}
                        logo={value.logo}
                        thumbnail={value.thumbnail}
                        title={value.title}
                      />
                    </div>
                    {checkPathUrl() === pathQuanLyTaiKhoan() ? (
                      <div className="nt__articleAction">
                        <Tooltip title="Chỉnh sửa">
                          <img
                            className="nt__articleEdit"
                            src={Images.PENCIL}
                            alt="edit"
                            onClick={() => handleEditArticle(value)}
                          />
                        </Tooltip>
                        <Tooltip title="Xóa">
                          <img
                            className="nt__articleDelete"
                            src={Images.RED_CANCEL}
                            alt="delete"
                            onClick={() =>
                              handleDeleteArticle(value.idArticle, value.title)
                            }
                          />
                        </Tooltip>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                ))
            )}
          </div>
          <div className="nt__hr"></div>
          <div className="nt__linkArticle">
            {props.link.length === 0 ? (
              checkPathUrl() === pathQuanLyTaiKhoan() ? (
                <p className="nt__noLink">
                  Bạn chưa đăng tải bài viết cá nhân nào
                </p>
              ) : (
                <p className="nt__noLink">
                  {checkPathUrl() === pathNhaDauTu()
                    ? "Nhà đầu tư này "
                    : "Tổ chức này "}{" "}
                  không có bài viết nào được đăng tải
                </p>
              )
            ) : (
              props.link.map((value, index) => (
                <div
                  className={`nt__linkItem${
                    props.link.length === index + 1 ? " noHr" : ""
                  }`}
                  key={index}
                >
                  <div className="nt__linkItemTime">
                    <img
                      className="nt__linkItemTimeIcon"
                      src={Images.CALENDAR}
                      alt="time"
                    />
                    <div className="nt__linkItemTimeTime">Thời gian:</div>
                    <span className="nt__value">{value.date}</span>
                  </div>
                  <div className="nt__linkResource">
                    <img
                      className="nt__linkItemTimeIcon"
                      src={Images.OWNER}
                      alt="owner"
                    />
                    <div className="nt__linkItemTimeTime">Trang nguồn:</div>
                    <span className="nt__value">{value.resource}</span>
                  </div>
                  <div className="nt__linkTitle">
                    <img
                      className="nt__linkItemTimeIcon"
                      src={Images.LINK}
                      alt="link"
                    />
                    <div className="nt__linkItemTimeTime">Tiêu đề: </div>
                    <span className="nt__value">
                      <a href={value.link} target="_blank" rel="noreferrer">
                        {value.title}
                      </a>
                    </span>
                  </div>
                  {checkPathUrl() === pathQuanLyTaiKhoan() ? (
                    <div className="nt__linkActive">
                      <Tooltip title="Chỉnh sửa">
                        <img
                          className="nt__linkEdit"
                          src={Images.PENCIL}
                          alt="edit"
                          onClick={() => handleEditLink(value)}
                        />
                      </Tooltip>
                      {/* <Tooltip title="Xóa">
                        <img
                          className="nt__linkDelete"
                          src={Images.RED_CANCEL}
                          alt="delete"
                          onClick={() =>
                            handleDeleteArticle(value.idArticle, value.title)
                          }
                        />
                      </Tooltip> */}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
      <ModalCreateNews
        open={openModal}
        openUpdate={openModalUpdate}
        close={handleClose}
        thumbnail={thumbnail}
        content={content}
        infoNews={infoNews}
        arrayIndustries={arrayIndustries}
        arrayIndus={arrayIndus}
        setThumbnail={setThumbnail}
        handleChangeInfo={handleChangeInfo}
        handleChangeValue={handleChangeValue}
        industry={props.industry}
        thumbnailError={thumbnailError}
        titleError={titleError}
        sumError={sumError}
        setThumbnailError={setThumbnailError}
        handleCreate={handleCreate}
        handleBlurTitle={handleBlurTitle}
        handleBlurSum={handleBlurSum}
        hashTagError={hashTagError}
        handleBlurHash={handleBlurHash}
        setContent={setContent}
        handleChangeContent={handleChangeContent}
      />
      <ModalImpNews
        open={openModalLink}
        openUpdate={openModalLinkUpdate}
        close={handleClose}
        linkDate={linkDate}
        linkTitle={infolink.linkTitle}
        linkResource={infolink.linkResource}
        linkLink={infolink.linkLink}
        format={dateFormat}
        setLinkDate={setLinkDate}
        handleChangeValueLink={handleChangeValueLink}
        //
        linkDateError={linkDateError}
        linkTitleError={linkTitleError}
        linkResourceError={linkResourceError}
        linkLinkError={linkLinkError}
        //
        handleBlurLinkTitle={handleBlurLinkTitle}
        handleBlurLinkResource={handleBlurLinkResource}
        handleBlurLinkLink={handleBlurLinkLink}
        handleBlurLinkDate={handleBlurLinkDate}
        handleCreteLinkNew={handleCreteLinkNew}
        handleUpdateLinkNew={handleUpdateLinkNew}
      />
    </div>
  );
}

export default withRouter(NewsTab);
