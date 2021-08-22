import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkEmailUser,
  checkIdUser,
  checkRoleUser,
  getLocalStorage,
} from "../../../assets/helper/helper";
import Banner from "../../../components/home-management-component/banner";
import HomeBody from "../../../components/home-management-component/home-body";
import { getListViewArticle } from "../../../store/action/artical.action";
import { getOrgOrInvNotFollow } from "../../../store/action/interest.action";
import "./styles.scss";
import NotAuth from "../../error/auth";
import { withRouter } from "react-router-dom";
import { getDeatilCompany } from "../../../store/action/company.action";
import {
  getListIndustry,
  getListInvestorType,
  getListProvince,
  getListRegion,
  getListStage,
} from "../../../store/action/register.action";
import { getRoundSuggest } from "../../../store/action/round.action";
import { getRoundInvite } from "../../../store/action/deal.action";
function UserHome(props) {
  const { listViewArticle, listSearch } = useSelector((state) => state.article);
  const { listRoundSuggest } = useSelector((state) => state.round);
  const { listInvite } = useSelector((state) => state.deal);
  const { loading } = useSelector((state) => state.loading);
  const [search, setSearch] = useState(false);
  const dispatch = useDispatch();
  let listIndus = [];
  let listPro = [];
  if (listRoundSuggest && listRoundSuggest.length > 0) {
    listRoundSuggest.map((item) => {
      listIndus.push(item.industries);
      listPro.push(item.provinces);
    });
  }

  useEffect(() => {
    setSearch(false);
    dispatch(getDeatilCompany(checkEmailUser(), false));
    dispatch(getListViewArticle(checkEmailUser(), false, props.history));
    dispatch(getOrgOrInvNotFollow(checkEmailUser(), true));
    dispatch(getListProvince());
    dispatch(getListRegion());
    dispatch(getListIndustry());
    dispatch(getListStage());
    dispatch(getListInvestorType());
    if (checkRoleUser() === "INVESTOR") {
      dispatch(getRoundSuggest(checkIdUser(), props.history));
      dispatch(getRoundInvite(checkIdUser(), props.history));
    }
  }, []);
  if (getLocalStorage("userInfo") === null) {
    return <NotAuth />;
  } else if (checkRoleUser() === "ADMIN") {
    return <NotAuth />;
  } else {
    return (
      <>
        <Banner />
        <HomeBody
          listInvite={listInvite}
          listPro={listPro}
          listIndus={listIndus}
          listRound={listRoundSuggest}
          list={listViewArticle}
          listS={listSearch}
          loading={loading}
          search={search}
          setSearch={setSearch}
        />
      </>
    );
  }
}
export default withRouter(UserHome);
