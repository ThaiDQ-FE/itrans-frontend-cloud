import React from "react";
import { Tag } from "antd";
import "antd/dist/antd.css";
import Images from "../../../../../assets/images/images";
import "./styles.scss";
function ArticlesItem(props) {
  const renderListIndustries = () => {
    return props.articleIndustries.map((item, index) => {
      return <Tag key={index}>{item}</Tag>;
    });
  };
  return (
    <>
      <div className="news__thumbnail">
        <img
          src={props.thumbnail === "" ? Images.NO_IMAGE : props.thumbnail}
          alt="news thumbnail"
        />
      </div>
      <div className="news__content">
        <div className="news__tags">{renderListIndustries()}</div>
        <div className="news__title">{props.title}</div>
        <div className="news__description">{props.description}</div>
        <div className="newss__bottomWrapper">
          <div className="news__logo">
            <img
              src={props.logo === "" ? Images.NO_IMAGE : props.logo}
              alt="logo owner"
            />
          </div>
          <div className="news__owner">
            <span>{props.accountCreate}</span>
          </div>
          <div className="news__createAt">{props.createAt} (GMT+7)</div>
        </div>
      </div>
    </>
  );
}

export default ArticlesItem;
