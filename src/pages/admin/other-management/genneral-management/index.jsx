import React from "react";
import "./styles.scss";
import AdminManagementGenneralComponent from "../../../../components/admin/admin-management-genneral";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getValueListIndustry,
  getValueListProvince,
  getValueListRegion,
  getValueListStage,
} from "../../../../store/action/value.action";
function AdminManagementGenneral() {
  const {
    listValueProvince,
    listValueStage,
    listValueIndustry,
    listValueRegion,
  } = useSelector((state) => state.value);
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getValueListIndustry("Admin-industry"));
    dispatch(getValueListStage("Admin-stage"));
    dispatch(getValueListProvince("Admin-province"));
    dispatch(getValueListRegion("Admin-region"));
  }, []);
  return (
    <div className="adminManagementGenneral__wrapper">
      <AdminManagementGenneralComponent
        province={listValueProvince}
        stage={listValueStage}
        industry={listValueIndustry}
        region={listValueRegion}
        loading={loading}
      />
    </div>
  );
}

export default AdminManagementGenneral;
