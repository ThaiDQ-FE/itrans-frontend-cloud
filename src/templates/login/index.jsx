import React from "react";
import { Route } from "react-router";
function GeneralTemplate(props) {
  return <main>{props.children}</main>;
}

const RouterGeneralTemplate = ({ path, exact, Component }) => {
  return (
    <Route path={path} exact={exact}>
      <GeneralTemplate>
        <Component />
      </GeneralTemplate>
    </Route>
  );
};
export default RouterGeneralTemplate;
