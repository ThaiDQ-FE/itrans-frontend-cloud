import React, { useState } from "react";
import "antd/dist/antd.css";
import "./styles.scss";
import { Input, Tooltip, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Images from "../../../assets/images/images";
import ArticleItem from "./article-item";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import {
  deleleArticleById,
  searchArticleAdmin,
} from "../../../store/action/artical.action";
import { withRouter } from "react-router-dom";
function AdminManagementArticleComponent(props) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState(false);
  const { Search } = Input;
  const [length, setLength] = useState({
    minValue: 0,
    maxValue: 10,
  });
  const handleChange = (value) => {
    if (value <= 1) {
      setLength({
        minValue: 0,
        maxValue: 10,
      });
    } else {
      setLength({
        minValue: length.maxValue,
        maxValue: value * 10,
      });
    }
  };
  const handleDeleteArticle = (id, name, title) => {
    Swal.fire({
      icon: "question",
      title: "Bạn muốn xóa bài viết này?",
      html: `${title} <br/>Của người dùng <b>${name}</b>`,
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
        dispatch(deleleArticleById(id, props.history));
      }
    });
  };
  const handleClickView = (id) => {
    props.history.push(`/admin/quan-ly-tin-tuc/chi-tiet/${id}`);
  };
  const onSearch = (value, event) => {
    if (event.key === "Enter") {
      if (value === "") {
        setSearch(false);
      } else {
        dispatch(searchArticleAdmin(value, props.history));
        setSearch(true);
      }
    } else {
      if (value === "") {
        setSearch(false);
      } else {
        dispatch(searchArticleAdmin(value, props.history));
        setSearch(true);
      }
    }
  };
  return (
    <div className="amac__wrapper">
      <div className="amac__container">
        <h2 className="amac__title">Quản lý bài viết</h2>
        <Search
          id="hb__search"
          className="amac__search"
          placeholder="Tìm kiếm tiêu đề ... "
          enterButton="Tìm kiếm"
          size="large"
          onSearch={onSearch}
        />
      </div>
      {search === false ? (
        <>
          <div
            className={`amac__box${
              props.list.length > 0 ? "" : " adminArticle__noBox"
            }`}
          >
            {props.list && props.list.length > 0 ? (
              props.list
                .slice(length.minValue, length.maxValue)
                .map((value, index) => (
                  <div className="amac__articleWrappers" key={index}>
                    <div
                      className="anac__articleWrapper"
                      key={index}
                      onClick={() => handleClickView(value.idArticle)}
                    >
                      <ArticleItem
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
                    <div className="adminArticle__action">
                      <Tooltip title="Xóa">
                        <img
                          src={Images.RED_CANCEL}
                          alt="delete"
                          onClick={() =>
                            handleDeleteArticle(
                              value.idArticle,
                              value.accountCreate,
                              value.title
                            )
                          }
                        />
                      </Tooltip>
                    </div>
                  </div>
                ))
            ) : (
              <>
                <img
                  className="adminArticle__empty"
                  src={Images.EMPTY_BOX}
                  alt="empty"
                />
                <span className="adminArticle__noArticle">
                  Hiện tại không có bài viết nào được đăng tải
                </span>
              </>
            )}
          </div>
          <div className="amac__paging">
            {props.list.length > 10 ? (
              <Pagination
                defaultPageSize={10}
                defaultCurrent={1}
                onChange={handleChange}
                total={props.list.length}
              />
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <>
          <div
            className={`amac__box${
              props.listSearch.length > 0 ? "" : " adminArticle__noBox"
            }`}
          >
            {props.listSearch && props.listSearch.length > 0 ? (
              props.listSearch
                .slice(length.minValue, length.maxValue)
                .map((value, index) => (
                  <div className="amac__articleWrappers" key={index}>
                    <div
                      className="anac__articleWrapper"
                      key={index}
                      onClick={() => handleClickView(value.idArticle)}
                    >
                      <ArticleItem
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
                    <div className="adminArticle__action">
                      <Tooltip title="Xóa">
                        <img
                          src={Images.RED_CANCEL}
                          alt="delete"
                          onClick={() =>
                            handleDeleteArticle(
                              value.idArticle,
                              value.accountCreate,
                              value.title
                            )
                          }
                        />
                      </Tooltip>
                    </div>
                  </div>
                ))
            ) : (
              <>
                <img
                  className="adminArticle__empty"
                  src={Images.EMPTY_BOX}
                  alt="empty"
                />
                <span className="adminArticle__noArticle">
                  Hiện tại không có bài viết nào được đăng tải
                </span>
              </>
            )}
          </div>
          <div className="amac__paging">
            {props.listSearch.length > 10 ? (
              <Pagination
                defaultPageSize={10}
                defaultCurrent={1}
                onChange={handleChange}
                total={props.listSearch.length}
              />
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default withRouter(AdminManagementArticleComponent);
