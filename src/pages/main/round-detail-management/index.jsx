import React from "react";
import ListDealSlider from "../../../components/list-deal-slider";
import IntroduceRound from "../../../components/introduce-round";
import "./styles.scss";
import CommentRound from "../../../components/comment-round";
import RoundDeail from "../../../components/round-detail";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLocalStorage } from "../../../assets/helper/helper";
import {
  getDealByRound,
  getListQuestionAndAnswer,
  getRoundAndOrganization,
} from "../../../store/action/round.action";
import { useSelector } from "react-redux";
import {
  getListDocumentByRoundId,
  getListIntroduceByRoundId,
} from "../../../store/action/introduce.action";
import DocumentRound from "../../../components/document-round";
import { getInvestorSuggest } from "../../../store/action/investor.action";
import { withRouter } from "react-router-dom";
import SuggestInvestor from "../../../components/suggest-investor";
function RoundDetailManagement(props) {
  const dispatch = useDispatch();
  const userLogin = getLocalStorage("userInfo");
  const idRound = getLocalStorage("idRound");
  useEffect(() => {
    dispatch(getListQuestionAndAnswer(userLogin.gmail, idRound));
    dispatch(getRoundAndOrganization(idRound));
    dispatch(getDealByRound(userLogin.gmail, idRound));
    dispatch(getListIntroduceByRoundId(idRound));
    dispatch(getListDocumentByRoundId(idRound));
    dispatch(getInvestorSuggest(idRound, true, props.history));
  });
  return (
    <div className="rdm__wrapper">
      <RoundDeail />
      <SuggestInvestor />
      <ListDealSlider />
      <hr className="rdm__hr" />
      <IntroduceRound />
      <DocumentRound />
      <CommentRound />
    </div>
  );
}
export default withRouter(RoundDetailManagement);
