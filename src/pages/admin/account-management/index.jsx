import React, { useEffect } from "react";
import "./styles.scss";
import AdminManagementAccountTabs from "../../../components/admin/admin-management-account-component/amac-tabs";
import { useDispatch, useSelector } from "react-redux";
import { getListAccountNotConfirm } from "../../../store/action/user.action";
import { getValueAccount } from "../../../store/action/admin.action";
import { withRouter } from "react-router-dom";
function AdminManagementAccount(props) {
  const { listAccountNotConfirm } = useSelector((state) => state.user);
  const { listAccount } = useSelector((state) => state.value);
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListAccountNotConfirm());
    dispatch(getValueAccount(props.history, true));
  }, []);
  return (
    <div className="adminManagementAccount__warpper">
      <AdminManagementAccountTabs
        listAccount={listAccountNotConfirm}
        loading={loading}
        list={listAccount}
      />
    </div>
  );
}

export default withRouter(AdminManagementAccount);
