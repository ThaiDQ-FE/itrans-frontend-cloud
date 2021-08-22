import React from "react";
import Images from "../../assets/images/images";
import DetailArticle from "./detail-article";
import ListAnotherArticle from "./list-another";
import "./styles.scss";
function DetailArticleComponent(props) {
  if (props.loading === true) {
    return (
      <div className="detailA__loading">
        <img src={Images.LOADING} alt="loading" />
      </div>
    );
  } else {
    return (
      <div className="dac__wrapper">
        <DetailArticle article={props.article} loading={props.loading} />
        <ListAnotherArticle another={props.another} />
      </div>
    );
  }
}

export default DetailArticleComponent;
