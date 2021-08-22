import React from "react";
import DetailArticleComponent from "../../../components/detail-articles-management-component";
import "./styles.scss";
import { withRouter } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAnotherArticle,
  getDetailArticlesByID,
} from "../../../store/action/artical.action";
import NotAuth from "../../error/auth";
import { checkRoleUser, getLocalStorage } from "../../../assets/helper/helper";
function DetailArticlesManagement(props) {
  const { detailArticle, listAnotherArticle } = useSelector(
    (state) => state.article
  );
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const {
    params: { id },
  } = props.match;
  useEffect(() => {
    dispatch(getDetailArticlesByID(id, props.history, true));
    dispatch(getAnotherArticle(id));
  }, [id]);
  if (getLocalStorage("userInfo") === null) {
    return <NotAuth />;
  } else if (checkRoleUser() === "ADMIN") {
    return <NotAuth />;
  } else {
    return (
      <div className="detailArticlesManagement">
        <DetailArticleComponent
          article={detailArticle}
          loading={loading}
          another={listAnotherArticle}
        />
      </div>
    );
  }
}

export default withRouter(DetailArticlesManagement);
