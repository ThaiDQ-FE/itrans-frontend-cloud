import React, { useEffect } from "react";
import "./styles.scss";
import AdminDetailAccount from "../../../../components/admin/admin-detail-account";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStorage } from "../../../../assets/helper/helper";
import { getDeatilCompany } from "../../../../store/action/company.action";
import { getListTeamMember } from "../../../../store/action/team.action";
function AdminDetailAccountManagement() {
  const { detailCompany } = useSelector((state) => state.detailCompany);
  const { listTeamMember } = useSelector((state) => state.teamMember);
  const dispatch = useDispatch();
  useEffect(() => {
    const local = getLocalStorage("adminDetailAccount");
    if (local !== null) {
      dispatch(getDeatilCompany(local.gmail, true));
      dispatch(getListTeamMember(local.gmail, false));
    }
  }, []);
  return (
    <div className="adminDetailAccountManagement__wrapper">
      <AdminDetailAccount
        detail={detailCompany}
        team={listTeamMember}
        indus={detailCompany.industries}
        pro={detailCompany.provinces}
        stage={detailCompany.stages}
        region={detailCompany.regions}
        type={detailCompany.investorTypes}
      />
    </div>
  );
}

export default AdminDetailAccountManagement;
