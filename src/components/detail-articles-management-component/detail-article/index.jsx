import React from "react";
import { Spin, Tag } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import Images from "../../../assets/images/images";
function DetailArticle(props) {
  const listIndus = props.article.articleIndustries;
  const renderHashTag = () => {
    if (listIndus) {
      return props.article.articleIndustries.map((item, index) => {
        return (
          <Tag key={index} className="detailA__tag">
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
  const content = props.article.content;
  return (
    <div className="detailA__wrapper">
      <div className="detailA__left"></div>
      <div className="detailA__center">
        <div className="detailA__hashTag">{renderHashTag()}</div>
        <div className="detailA__title">{props.article.title}</div>
        <div className="detailA__ownerTime">
          <div className="detailA__owner">
            <div className="detailA__img">
              <img
                src={
                  props.article.logo === ""
                    ? Images.NO_IMAGE
                    : props.article.logo
                }
                alt="logo"
              />
            </div>

            <div className="detailA__ownerSpan">
              {props.article.accountCreate}
            </div>
          </div>
          <div className="detailA__time">
            <ul>
              <li>{props.article.createAt}(GMT+7)</li>
            </ul>
          </div>
        </div>
        <div className="detailA__summary">{props.article.description}</div>
        <div className="deatiA__content" id="detailA__content">
          {renderHTML(content)}
        </div>
        <div
          className="detailA__end"
          style={{ fontSize: 18, fontWeight: 600, textAlign: "center" }}
        >
          Hết
        </div>
      </div>
      <div className="detailA__right"></div>
    </div>
  );
}

export default DetailArticle;
