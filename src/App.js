import "./App.css";
import { adminRouter, generalRouter, mainRouter } from "./configs/router";
import RouterMainTemplate from "./templates/main";
import RouterAdminTemplate from "./templates/admin";
import { BrowserRouter, Switch } from "react-router-dom";
import RouterGeneralTemplate from "./templates/login";
import { getLocalStorage } from "./assets/helper/helper";
import Gruad from "./core/graud";

function App() {
  const renderMainRouter = () => {
    return mainRouter.map(({ path, exact, Component }, index) => {
      return (
        <RouterMainTemplate
          key={index}
          path={path}
          exact={exact}
          Component={Component}
        ></RouterMainTemplate>
      );
    });
  };

  const renderAdminRouter = () => {
    return adminRouter.map(({ path, exact, Component }, index) => {
      return (
        <RouterAdminTemplate
          key={index}
          path={path}
          exact={exact}
          Component={Component}
        ></RouterAdminTemplate>
      );
    });
  };

  const renderGeneralRouter = () => {
    return generalRouter.map(({ path, exact, Component }, index) => {
      return (
        <RouterGeneralTemplate
          key={index}
          path={path}
          exact={exact}
          Component={Component}
        ></RouterGeneralTemplate>
      );
    });
  };

  return (
    <>
      <BrowserRouter>
        <Switch>{renderAdminRouter()}</Switch>
        <Gruad>
          <Switch>{renderMainRouter()}</Switch>
        </Gruad>
        <Switch>{renderGeneralRouter()}</Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
