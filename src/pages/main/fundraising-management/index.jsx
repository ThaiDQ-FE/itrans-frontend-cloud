import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkIdUser } from "../../../assets/helper/helper";
import CurrentFundingRound from "../../../components/current-funding-round";
import PendingFundingRound from "../../../components/pending-funding-round";
import PreviousFundingRound from "../../../components/pre-funding-round";
import { getListDealByIdOrganization } from "../../../store/action/deal.action";
import {
  getListRoundActiveByIdOrganization,
  getListRoundPassByIdOrganization,
  getListRoundPendingByIdOrganization,
} from "../../../store/action/round.action";
import "./styles.scss";
function FundraisingManagement() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListRoundActiveByIdOrganization(checkIdUser()));
    dispatch(getListRoundPendingByIdOrganization(checkIdUser()));
    dispatch(getListRoundPassByIdOrganization(checkIdUser()));
    dispatch(getListDealByIdOrganization(checkIdUser()));
  }, []);
  return (
    <div className="fundm__wrapper">
      <h1 className="fundm__title">Quản lý vòng gọi vốn</h1>
      <CurrentFundingRound />
      <hr className="fundm__hr" />
      <PendingFundingRound />
      <hr className="fundm__hr" />
      <PreviousFundingRound />
    </div>
  );
}
export default FundraisingManagement;
