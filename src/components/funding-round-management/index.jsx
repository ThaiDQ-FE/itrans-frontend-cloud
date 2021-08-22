import React from "react";
import FilterFundingRound from "./filter-funding-round";
import CardFundingRound from "./card-funding-round";
import "./styles.scss";
function FundingRoundWrapper() {
  return (
    <>
      <FilterFundingRound />
      <hr className="frw__hr" />
      <CardFundingRound />
    </>
  );
}

export default FundingRoundWrapper;
