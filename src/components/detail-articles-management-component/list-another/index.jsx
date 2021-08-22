import React from "react";
import { withRouter } from "react-router-dom";
import Images from "../../../assets/images/images";
import "./styles.scss";
function ListAnotherArticle(props) {
  const handleClickArticle = (id) => {
    props.history.push(`/tin-tuc/chi-tiet/${id}`);
  };
  return (
    <div className="listAA__wrapper">
      <div className="listAA__left"></div>
      <div className="listAA__center">
        <div className="listAA__title">
          {props.another.length < 1 ? "" : "Bài viết khác"}
        </div>
        <div className="listAA__box">
          {props.another.length > 0 ? (
            props.another.map((item, index) => (
              <div
                className="listAA__item"
                key={index}
                onClick={() => handleClickArticle(item.idArticle)}
              >
                <img
                  className="listAA__itemThumbnail"
                  src={item.thumbnail === "" ? Images.NO_IMAGE : item.thumbnail}
                  alt="thumbnail"
                />
                <div className="listAA__itemTitle">
                  <p className="listAA__pFirst">{item.title}</p>
                  <p className="listAA__pSecond">{item.description}</p>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="listAA__right"></div>
    </div>
  );
}

export default withRouter(ListAnotherArticle);
