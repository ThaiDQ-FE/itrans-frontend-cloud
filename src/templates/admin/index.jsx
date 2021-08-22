import React from "react";
import { Route } from "react-router-dom";
import { getLocalStorage } from "../../assets/helper/helper";
import AdminMenuIcon from "../../components/admin/menu";
import AdminSidebar from "../../components/admin/sidebar";
import NotAuth from "../../pages/error/auth";
import "./styles.scss";
function AdminTemplate(props) {
  return (
    <div className="adminTemplate__wrapper">
      <AdminSidebar />
      <div className="adminTemplate__container">
        <div className="adminTemplate__menu">
          <AdminMenuIcon />
        </div>
        <>{props.children}</>
      </div>
    </div>
  );
}
const RouterAdminTemplate = ({ path, exact, Component }) => {
  return (
    <Route path={path} exact={exact}>
      <AdminTemplate>
        <Component />
      </AdminTemplate>
    </Route>
  );
};
export default RouterAdminTemplate;
