import React from "react";
import { Layout, Menu } from "antd";

const SidebarComponent: React.FC = () => {
  return (
    <Layout.Sider width={200}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
        items={[]}
      />
    </Layout.Sider>
  );
};

export default SidebarComponent;
