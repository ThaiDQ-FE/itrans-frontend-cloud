import React from "react";
import { checkRoleUser, getLocalStorage } from "../../../assets/helper/helper";
import AdminHomeComponent from "../../../components/admin/admin-home-component";
import NotAuth from "../../error/auth";
import "./styles.scss";
function AdminHome() {
  if (getLocalStorage("userInfo") === null) {
    return <></>;
  } else if (checkRoleUser() !== "ADMIN") {
    return <NotAuth />;
  } else {
    return (
      <div className="adminHome__wrapper">
        <AdminHomeComponent />
      </div>
    );
  }
}
export default AdminHome;
