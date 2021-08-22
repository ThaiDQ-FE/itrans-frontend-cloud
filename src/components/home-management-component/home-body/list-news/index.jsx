import React, { useState } from "react";
import { Pagination, Skeleton } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import ArticlesItem from "./news-item";
import { withRouter } from "react-router-dom";
import Images from "../../../../assets/images/images";
function ListNews(props) {
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
    props.history.push(`/tin-tuc/chi-tiet/${id}`);
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
      ) : props.list && props.list.length > 0 ? (
        props.list
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
          <p className="ln__noArticleP">
            Bạn chưa theo dõi hoặc nhà đầu tư / tổ chức bạn theo dõi chưa đăng
            tải bài viết
          </p>
        </div>
      )}
      <div className="ln__paging">
        {props.loading === false ? (
          props.list.length > 5 ? (
            <Pagination
              defaultCurrent={1}
              defaultPageSize={5}
              onChange={handleChange}
              total={props.list.length}
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
export default withRouter(ListNews);
