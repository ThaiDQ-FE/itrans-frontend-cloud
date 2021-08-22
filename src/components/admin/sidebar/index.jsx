import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import "antd/dist/antd.css";
import "./styles.scss";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  AppstoreOutlined,
  AreaChartOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import Images from "../../../assets/images/images";
function AdminSidebar() {
  const [openSide, setOpenSide] = useState(true);
  const { Sider } = Layout;
  const checkDefaultSelect = () => {
    const path = window.location.pathname;
    let selected;
    if (path === "/admin") {
      selected = ["1"];
    } else if (
      path === "/admin/quan-ly-tai-khoan" ||
      path === "/admin/quan-ly-tai-khoan/chi-tiet"
    ) {
      selected = ["2"];
    } else if (
      path === "/admin/quan-ly-vong-goi-von" ||
      path === "/admin/quan-ly-vong-goi-von/chi-tiet"
    ) {
      selected = ["3"];
    } else if (
      path === "/admin/quan-ly-tin-tuc" ||
      path.includes("/admin/quan-ly-tin-tuc/chi-tiet")
    ) {
      selected = ["4"];
    } else if (path === "/admin/quan-ly-chung") {
      selected = ["5"];
    }
    return selected;
  };
  const onCollapse = (collapsed) => {
    setOpenSide(!openSide);
  };
  return (
    <Layout className="adminSidebar__wrapper">
      <Sider
        collapsible
        collapsed={openSide}
        onCollapse={onCollapse}
        className="adminSidebar__sider"
      >
        <div
          className={`adminSidebar__logo${
            openSide === true ? " adminSidebar__smallLogo" : ""
          }`}
        >
          <img src={Images.LOGO_GREY} alt="logos" />
        </div>
        <Menu
          className="adminSidebar__menu"
          theme="dark"
          defaultSelectedKeys={checkDefaultSelect()}
          mode="inline"
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <NavLink
              activeClassName="active-nav-link-header"
              className="adminSidebar__item"
              to="/admin"
              exact={true}
            >
              TRANG CHỦ
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <NavLink
              activeClassName="active-nav-link-header"
              className="adminSidebar__item"
              to="/admin/quan-ly-tai-khoan"
              exact={true}
            >
              QUẢN LÝ TÀI KHOẢN
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3" icon={<AreaChartOutlined />}>
            <NavLink
              activeClassName="active-nav-link-header"
              className="adminSidebar__item"
              to="/admin/quan-ly-vong-goi-von"
              exact={true}
            >
              VÒNG GỌI VỐN
            </NavLink>
          </Menu.Item>
          <Menu.Item key="4" icon={<ContainerOutlined />}>
            <NavLink
              activeClassName="active-nav-link-header"
              className="adminSidebar__item"
              to="/admin/quan-ly-tin-tuc"
              exact={true}
            >
              QUẢN LÝ BÀI VIẾT
            </NavLink>
          </Menu.Item>
          <Menu.Item key="5" icon={<AppstoreOutlined />}>
            <NavLink
              activeClassName="active-nav-link-header"
              className="adminSidebar__item"
              to="/admin/quan-ly-chung"
              exact={true}
            >
              QUẢN LÝ CHUNG
            </NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
}

export default withRouter(AdminSidebar);
