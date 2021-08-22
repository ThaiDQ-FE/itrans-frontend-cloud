import React from "react";
import { Tag } from "antd";
import "antd/dist/antd.css";
import Images from "../../../../assets/images/images";
import "./styles.scss";
function ArticlesItem(props) {
  const renderListIndustries = () => {
    return props.listIndustries.map((item, index) => {
      return <Tag key={index}>{item.nameIndustry}</Tag>;
    });
  };
  return (
    <>
      <div className="article__thumbnail">
        <img
          src={props.thumbnail === "" ? Images.NO_IMAGE : props.thumbnail}
          alt="article thumbnail"
        />
      </div>
      <div className="article__content">
        <div className="article__tags">{renderListIndustries()}</div>
        <div className="article__title">{props.title}</div>
        <div className="article__description">{props.description}</div>
        <div className="articles__bottomWrapper">
          <div className="article__logo">
            <img
              src={props.logo === "" ? Images.NO_IMAGE : props.logo}
              alt="logo owner"
            />
          </div>
          <div className="article__owner">
            <span>{props.owner}</span>
          </div>
          <div className="article__createAt">{props.createAt} (GMT+7)</div>
        </div>
      </div>
    </>
  );
}

export default ArticlesItem;
