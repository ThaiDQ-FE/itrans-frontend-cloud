import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Images from "../../../../assets/images/images";
import { getLocalStorage } from "../../../../assets/helper/helper";
import "./styles.scss";
function AdminMenuItem(props) {
  const user = getLocalStorage("userInfo");
  return (
    <Menu
      id="simple-menu"
      anchorEl={props.openMenu}
      keepMounted
      open={Boolean(props.openMenu)}
      onClose={props.handleClose}
      className="adminMenuItem__menu"
    >
      <MenuItem>
        <div className="header__menuAvata">
          <span>{user !== null ? user.gmail : ""}</span>
        </div>
      </MenuItem>
      <hr className="header__hr" />
      <MenuItem>
        <div className="header__menuAccount">
          <img src={Images.SETTING} alt="" />
          <span>Quản lý tài khoản</span>
        </div>
      </MenuItem>
      <hr className="header__hr" />
      <MenuItem onClick={props.handleLogoutAccount}>
        <div className="header__menuLogout">
          <img src={Images.LOGOUT} alt="" />
          <span>Thoát</span>
        </div>
      </MenuItem>
    </Menu>
  );
}

export default AdminMenuItem;
