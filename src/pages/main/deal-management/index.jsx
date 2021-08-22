import React, { useEffect } from "react";
import { Button } from "antd";
import "./styles.scss";
import "antd/dist/antd.css";
import CurrentDeal from "../../../components/current-deal";
import PreviousDeal from "../../../components/pre-deal";
import AffterDeal from "../../../components/after-deal";
import { useDispatch } from "react-redux";
import { getCancelDeal, getCurrentDeal, getDoneDeal } from "../../../store/action/deal.action";
import { checkIdUser } from "../../../assets/helper/helper";
function DealManagement() {
  const dispatch = useDispatch();
  const id = checkIdUser();
  useEffect(()=>{
    dispatch(getCurrentDeal(id, 0));
    dispatch(getDoneDeal(id, 0));
    dispatch(getCancelDeal(id, 0));
  },[])
  return (
    <div className="dm__wrapper">
      <div className="dm__button">
      </div>
      <h1 className="dm__title">Quản lý Deal</h1>
      <CurrentDeal />
      <PreviousDeal />
      <AffterDeal />
    </div>
  );
}
export default DealManagement;
