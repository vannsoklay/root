import React, { useEffect, useState } from "react";
import { Layout, theme, Breadcrumb } from "antd";
const { Content } = Layout;
import Header from "./Header";
import Sidebar from "./Sidebar";

type Props = {
  children: string | JSX.Element | JSX.Element[] | JSX.Element;
};

const LayoutComponent: React.FC<Props> = ({ children }) => {
  const [reload, setReload] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setReload(true);
    }, 500);
    setReload(false);
  }, []);
  return reload ? (
    <Layout>
      <Sidebar />
      <Layout>
        <Header />
        <Breadcrumb style={{ margin: "16px 0" }} items={[]}/>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  ) : (
    <div>laoding...</div>
  );
};

export default LayoutComponent;
