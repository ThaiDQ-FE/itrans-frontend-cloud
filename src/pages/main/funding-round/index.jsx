import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkEmailUser } from "../../../assets/helper/helper";
import Images from "../../../assets/images/images";
import message from "../../../assets/message/text";
import FundingRoundManagement from "../../../components/funding-round-management";
import {
  getListIndustry,
  getListProvince,
  getListRegion,
  getListStage,
} from "../../../store/action/register.action";
import { getAllRoundActiveV2 } from "../../../store/action/round.action";
import "./styles.scss";
function FundingRound() {
  const dispatch = useDispatch();
  useEffect(() => {
    const min = NaN;
    const max = NaN;
    const listStage = [0];
    const listIndus = [0];
    const listPro = [0];
    const listRe = [0];
    dispatch(getListStage());
    dispatch(getListProvince());
    dispatch(getListRegion());
    dispatch(getListIndustry());
    dispatch(
      getAllRoundActiveV2(
        listIndus,
        checkEmailUser(),
        max,
        min,
        listPro,
        listRe,
        listStage
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="fr__wrapper">
      <div className="im__banner">
        <img className="im__img" src={Images.BANNER_CORPORATE} alt="banner" />
        <div className="im__titleWrapper">
          <div className="im__titleSolo">
            <div className="im__title">Vòng gọi vốn</div>
            <div className="im__slo">
              Tìm kiếm vòng gọi vốn bạn theo mong muốn của bạn và trở thành Nhà
              đầu tư và cùng nhau đi đến thành công.
            </div>
          </div>
        </div>
      </div>
      <FundingRoundManagement />
    </div>
  );
}
export default FundingRound;
