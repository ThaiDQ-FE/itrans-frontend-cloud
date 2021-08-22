import React, { useEffect } from "react";
import "antd/dist/antd.css";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  deleleArticleById,
  getDetailArticlesByID,
} from "../../../store/action/artical.action";
import { withRouter } from "react-router-dom";
import { Button, Popconfirm, Tag } from "antd";
import Images from "../../../assets/images/images";
function AdminArticleDetail(props) {
  const { detailArticle } = useSelector((state) => state.article);
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const listIndus = detailArticle.articleIndustries;
  const renderHashTag = () => {
    if (listIndus) {
      return detailArticle.articleIndustries.map((item, index) => {
        return (
          <Tag key={index} className="aad__tag">
            {item}
          </Tag>
        );
      });
    }
  };
  const renderHTML = (rawHTML) =>
    React.createElement("div", {
      dangerouslySetInnerHTML: { __html: rawHTML },
    });
  const content = detailArticle.content;
  const {
    params: { id },
  } = props.match;
  useEffect(() => {
    dispatch(getDetailArticlesByID(id, props.history, true));
  }, []);
  const handleDeleteArticle = () => {
    dispatch(deleleArticleById(id, props.history));
  };
  const handleClickBack = () => {
    props.history.push("/admin/quan-ly-tin-tuc");
  };
  if (loading === true) {
    return (
      <div className="aad__loading">
        <img src={Images.LOADING} alt="loading" />
      </div>
    );
  } else {
    return (
      <div className="aad__wrapper">
        <div className="add__container">
          <div className="aad__center">
            <div className="aad__hashTag">{renderHashTag()}</div>
            <div className="aad__title">{detailArticle.title}</div>
            <div className="aad__ownerTime">
              <div className="aad__owner">
                <div className="aad__img">
                  <img
                    src={
                      detailArticle.logo === ""
                        ? Images.NO_IMAGE
                        : detailArticle.logo
                    }
                    alt="logo"
                  />
                </div>

                <div className="aad__ownerSpan">
                  {detailArticle.accountCreate}
                </div>
              </div>
              <div className="aad__time">
                <ul>
                  <li>{detailArticle.createAt}(GMT+7)</li>
                </ul>
              </div>
            </div>
            <div className="aad__summary">{detailArticle.description}</div>
            <div className="deatiA__content" id="aad__content">
              {renderHTML(content)}
            </div>
          </div>
        </div>
        <div className="aad__buttonAction">
          <Button
            type="primary"
            className="aad__back"
            onClick={handleClickBack}
          >
            Trở lại
          </Button>
          <Popconfirm
            title="Bạn muốn xóa bài viết này?"
            onConfirm={handleDeleteArticle}
            okText="Đồng ý"
            cancelText="Hủy"
          >
            <Button type="primary" className="aad__action">
              Xóa bài viết
            </Button>
          </Popconfirm>
        </div>
      </div>
    );
  }
}

export default withRouter(AdminArticleDetail);
