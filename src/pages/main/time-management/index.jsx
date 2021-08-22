import React from "react";
import { Tabs } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import RegisterFreeTime from "../../../components/register-free-time";
import ScheduleManagement from "../../../components/schedule-management";
import ScheduleManagementInvestor from "../../../components/schedule-management-investor";
import { checkRoleUser } from "../../../assets/helper/helper";
function TimeManagement() {
  const { TabPane } = Tabs;
  return (
    <div className="tm__wrapper">
      {checkRoleUser() === "INVESTOR" ? (
        <Tabs defaultActiveKey="1" type="card" size="large">
          <TabPane tab="ĐĂNG KÝ THỜI GIAN RÃNH" key="1">
            <RegisterFreeTime />
          </TabPane>
          <TabPane tab="QUẢN LÝ LỊCH TRÌNH" key="2">
            <ScheduleManagementInvestor />
          </TabPane>
        </Tabs>
      ) : (
        <ScheduleManagement />
      )}
    </div>
  );
}
export default TimeManagement;
