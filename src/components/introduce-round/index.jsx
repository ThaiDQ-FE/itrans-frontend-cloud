import React from "react";
import "./styles.scss";
import { useSelector } from "react-redux";

function IntroduceRound() {
  const { roundAndOrganization } = useSelector((state) => state.round);
  const renderHTML = (rawHTML) =>
    React.createElement("div", {
      dangerouslySetInnerHTML: { __html: rawHTML },
    });
  const description = roundAndOrganization.description;
  return (
    <>
      <div className="ir__wrapper">
        <div className="ir__gioiThoi">Giới thiệu sơ lược</div>
        {renderHTML(description)}
      </div>
    </>
  );
}
export default IntroduceRound;
