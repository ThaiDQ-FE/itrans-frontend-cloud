import React from "react";
import "./styles.scss";
import AdminManagementRoundComponent from "../../../../components/admin/admin-management-round";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListAllRound } from "../../../../store/action/round.action";
function AdminManagementRound() {
  const { listAllRound } = useSelector((state) => state.round);
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListAllRound());
  }, []);
  return (
    <div className="adminManagementRound__wrapper">
      <AdminManagementRoundComponent
        listRound={listAllRound}
        loading={loading}
      />
    </div>
  );
}

export default AdminManagementRound;
