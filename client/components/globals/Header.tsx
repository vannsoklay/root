import React from "react";
import { Button, Layout } from "antd";

const { Header } = Layout;

const HeaderComponent: React.FC = () => {
  return (
    <Header
      style={{
        padding: 0,
        background: "white",
      }}
    >
      <div>
        <Button>Card</Button>
        <Button>Login</Button>
      </div>
    </Header>
  );
};

export default HeaderComponent;
