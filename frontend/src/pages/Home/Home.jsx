import {
  Card,
  Col,
  message,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { API } from "../../constant";

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProfiles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/users`);
      const data = await response.json();
      setProfiles(data ?? []);
    } catch (error) {
      console.error(error);
      message.error("Error while fetching profiles!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <Row gutter={[32, 32]}>
      {profiles.map((profile, index) => (
        <Col md={8} lg={8} sm={24} xs={24} key={`${profile.id}_${index}`}>
          <Card className="social_card">
            <Space
              className="social_card_space"
              direction="vertical"
              align="center"
            >
              <Typography.Title level={3}>{profile.username}</Typography.Title>
              <Typography.Title level={5}>{profile.email}</Typography.Title>
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Home;