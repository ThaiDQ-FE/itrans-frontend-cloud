import React from "react";
import "antd/dist/antd.css";
import "./styles.scss";
import { Tabs, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ANACTablePending from "../anac-table/anac-table-pending";
import ANACTableDone from "../anac-table/anac-table-done";
function AdminManagementAccountTabs(props) {
  const { TabPane } = Tabs;
  return (
    <div className="adat__wrapper">
      <Tabs type="card">
        <TabPane tab="Chờ phê duyệt" key="1">
          <ANACTablePending
            listAccount={props.listAccount}
            loading={props.loading}
          />
        </TabPane>
        <TabPane tab="Đã phê duyệt" key="2">
          <ANACTableDone loading={props.loading} list={props.list} />
        </TabPane>
      </Tabs>
      <div className="adat__search">
        <Input
          size="large"
          placeholder="Tìm kiếm"
          prefix={<SearchOutlined />}
        />
      </div>
    </div>
  );
}

export default AdminManagementAccountTabs;
