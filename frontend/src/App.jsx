import React from "react";
import { Layout } from "antd";
import AppHeader from "./components/Appheader/Appheader";
import Sidebar from './components/Sidebar/Sidebar'; 
import AppRoutes from "./Routes";
const { Header, Content , Sider} = Layout;

const App = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: "#03233f", height: "80px"}}>
        <AppHeader />
      </Header>
      <Layout>
        <Sider>
          <Sidebar />
        </Sider>
        <Layout style={{ padding: '0 24px', minHeight: '100vh' }}>
          <Content style={{ padding: '24px', margin: 0 }}>
            <AppRoutes />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;