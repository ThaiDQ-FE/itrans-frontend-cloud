import React, { useState } from "react";
import { Pagination, Skeleton } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import ArticlesItem from "../list-news/news-item";
import { withRouter } from "react-router-dom";
import Images from "../../../../assets/images/images";
function ListSearch(props) {
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
  const handleClick = (id) => {
    window.open(`/tin-tuc/chi-tiet/${id}`, "_blank");
    // props.history.push(`/tin-tuc/chi-tiet/${id}`);
  };
  return (
    <div className="ln__wrapper">
      {props.loading === true ? (
        <div className="ln__skeleton">
          <div className="ln__skeleOne">
            <Skeleton.Image className="ln__skeleImg" />
            <Skeleton active className="ln__skeleContent" />
          </div>
          <div className="ln__skeleOne">
            <Skeleton.Image className="ln__skeleImg" />
            <Skeleton active className="ln__skeleContent" />
          </div>
        </div>
      ) : props.listS && props.listS.length > 0 ? (
        props.listS
          .slice(length.minValue, length.maxValue)
          .map((value, index) => (
            <div
              className="ln__articleWrapper"
              key={index}
              onClick={() => {
                handleClick(value.idArticle);
              }}
            >
              <ArticlesItem
                id={value.idArticle}
                title={value.title}
                thumbnail={value.thumbnail}
                logo={value.logo}
                description={value.description}
                createAt={value.createAt}
                articleIndustries={value.articleIndustries}
                accountCreate={value.accountCreate}
              />
            </div>
          ))
      ) : (
        <div className="ln__noArticleHome">
          <img src={Images.EMPTY_BOX} alt="empty" />
          <p className="ln__noArticleP">Không có kết quả</p>
        </div>
      )}
      <div className="ln__paging">
        {props.loading === false ? (
          props.listS.length > 5 ? (
            <Pagination
              defaultCurrent={1}
              defaultPageSize={5}
              onChange={handleChange}
              total={props.listS.length}
            />
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
export default withRouter(ListSearch);
