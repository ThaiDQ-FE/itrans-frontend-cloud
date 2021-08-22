import React from "react";
import {
  checkPathUrl,
  checkRoleUser,
  pathQuanLyTaiKhoan,
  pathToChuc,
} from "../../../assets/helper/helper";
import RoundByIdInvestor from "./round-investor";
import RoundByIdOrganization from "./round-organization";
import "./styles.scss";
function RoundById(props) {
  if (checkPathUrl() === pathQuanLyTaiKhoan()) {
    return (
      <>
        {checkRoleUser() === "INVESTOR" ? (
          <RoundByIdInvestor listRound={props.listRoundByIdInvestor} />
        ) : (
          <RoundByIdOrganization listRound={props.listRoundByIdOrganization} />
        )}
      </>
    );
  } else {
    return (
      <>
        {checkPathUrl() === pathToChuc() ? (
          <RoundByIdOrganization listRound={props.listRoundByIdOrganization} />
        ) : (
          <RoundByIdInvestor listRound={props.listRoundByIdInvestor} />
        )}
      </>
    );
  }
}

export default RoundById;
