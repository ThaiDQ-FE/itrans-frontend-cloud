import React from "react";
import { Tag } from "antd";
import "antd/dist/antd.css";
import Images from "../../../../assets/images/images";
import "./styles.scss";
function ArticleItem(props) {
  const renderListIndustries = () => {
    return props.listIndustries.map((item, index) => {
      return <Tag key={index}>{item}</Tag>;
    });
  };
  return (
    <>
      <div className="adminArticle__thumbnail">
        <img
          src={props.thumbnail === "" ? Images.NO_IMAGE : props.thumbnail}
          alt="adminArticle thumbnail"
        />
      </div>
      <div className="adminArticle__content">
        <div className="adminArticle__tags">{renderListIndustries()}</div>
        <div className="adminArticle__title">{props.title}</div>
        <div className="adminArticle__description">{props.description}</div>
        <div className="adminArticles__bottomWrapper">
          <div className="adminArticle__logo">
            <img
              src={props.logo === "" ? Images.NO_IMAGE : props.logo}
              alt="logo owner"
            />
          </div>
          <div className="adminArticle__owner">
            <span>{props.owner}</span>
          </div>
        </div>
        <div className="adminArticle__createAt">{props.createAt} (GMT+7)</div>
      </div>
    </>
  );
}

export default ArticleItem;
