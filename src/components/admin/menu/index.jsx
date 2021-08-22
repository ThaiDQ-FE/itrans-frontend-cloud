import React, { useState } from "react";
import Images from "../../../assets/images/images";
import AdminMenuItem from "./menu-item";
import "./styles.scss";
import { withRouter } from "react-router-dom";
function AdminMenuIcon({ history }) {
  const [openMenu, setOpenMenu] = useState(null);
  const handleOpenMenu = (event) => {
    setOpenMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpenMenu(null);
  };
  const handleLogoutAccount = () => {
    setOpenMenu(false);
    localStorage.removeItem("userInfo");
    history.push("/dang-nhap");
  };
  return (
    <>
      <div className="adminMenuIcon__wrapper">
        <img src={Images.NO_USER} alt="icon admin" onClick={handleOpenMenu} />
      </div>
      <AdminMenuItem
        openMenu={openMenu}
        handleClose={handleCloseMenu}
        handleLogoutAccount={handleLogoutAccount}
      />
    </>
  );
}

export default withRouter(AdminMenuIcon);
