import React from "react";
import "antd/dist/antd.css";
import "./styles.scss";
import AdminChartLine from "./chart-line";
function AdminHomeComponent() {
  return (
    <div className="ahc__wrapper">
      <AdminChartLine />
    </div>
  );
}

export default AdminHomeComponent;
