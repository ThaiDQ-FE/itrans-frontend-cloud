import React from "react";
import { NavLink, Redirect, Route } from "react-router-dom";
import { checkPathUrl, checkRoleUser } from "../../assets/helper/helper";
import Images from "../../assets/images/images";
import UserFooter from "../../components/footer";
import Header from "../../components/header";
import "./styles.scss";
function MainTemplate(props) {
  const test = JSON.parse(localStorage.getItem("userInfo"));
  console.log(test);
  if (test === null) {
    localStorage.removeItem("userInfo");
    return <Redirect to="/dang-nhap" />;
  } else {
    return (
      <>
        <header>
          <Header />
        </header>
        <main>{props.children}</main>
        <UserFooter />
        {checkPathUrl() === "/" ||
        checkPathUrl() === "/nha-dau-tu" ||
        checkPathUrl() === "/to-chuc" ||
        checkPathUrl() === "/vong-goi-von" ? (
          <div className="easy-icon">
            <ul className="easy-list">
              <li className="easy-icons easy-home">
                <NavLink className="easy-nav" to="/" exact={true}>
                  <img className="img-icon" src={Images.HOUSE} alt="house" />
                  Trang chủ
                </NavLink>
              </li>
              {checkRoleUser() === "ORGANIZATION" ? (
                <li className="easy-icons easy-inves">
                  <NavLink className="easy-nav" to="/nha-dau-tu" exact={true}>
                    <img
                      className="img-icon"
                      src={Images.INVESTOR_REGISTER}
                      alt="inve"
                    />
                    Nhà đầu tư
                  </NavLink>
                </li>
              ) : (
                <>
                  <li className="easy-icons easy-org">
                    <NavLink className="easy-nav" to="/to-chuc" exact={true}>
                      <img
                        className="img-icon"
                        src={Images.ORGANIZATION_REGISTER}
                        alt="org"
                      />
                      Tổ chức khởi nghiệp
                    </NavLink>
                  </li>
                  <li className="easy-icons easy-round">
                    <NavLink
                      className="easy-nav"
                      to="/vong-goi-von"
                      exact={true}
                    >
                      <img
                        className="img-icon"
                        src={Images.FUNDS}
                        alt="round"
                      />
                      Vòng gọi vốn
                    </NavLink>
                  </li>
                </>
              )}
              <li className="easy-icons easy-pers">
                <NavLink
                  className="easy-nav"
                  to="/quan-ly-tai-khoan"
                  exact={true}
                >
                  <img className="img-icon" src={Images.BUILDINGS} alt="per" />
                  Trang cá nhân
                </NavLink>
              </li>
            </ul>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}
const RouterMainTemplate = ({ path, exact, Component }) => {
  return (
    <Route path={path} exact={exact}>
      <MainTemplate>
        <Component />
      </MainTemplate>
    </Route>
  );
};
export default RouterMainTemplate;
