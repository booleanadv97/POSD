import {
  Row,
  Typography,
} from "antd";
import React from "react";
import { useAuthContext } from "../../context/AuthContext";

const Home = () => {
  const {user} = useAuthContext();
  return (
    <>
    <Row align="center" gutter={[32, 32]}>
      <Typography.Title level={3}>Welcome back to POSD, {user.username}!</Typography.Title>
    </Row>
    </>
  );
};

export default Home;