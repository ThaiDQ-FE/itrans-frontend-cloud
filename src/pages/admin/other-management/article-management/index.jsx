import React from "react";
import "./styles.scss";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getValueArticle } from "../../../../store/action/admin.action";
import { withRouter } from "react-router-dom";
import AdminManagementArticleComponent from "../../../../components/admin/admin-management-article-component";

function AdminManagementArticle(props) {
  const { listValueArticle } = useSelector((state) => state.value);
  const { listSearchAdmin } = useSelector((state) => state.article);
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getValueArticle(true, props.history));
  }, []);
  return (
    <div className="adminManagementArticle__wrapper">
      <AdminManagementArticleComponent
        loading={loading}
        list={listValueArticle}
        listSearch={listSearchAdmin}
        listAr={listValueArticle.articleIndustries}
      />
    </div>
  );
}

export default withRouter(AdminManagementArticle);
