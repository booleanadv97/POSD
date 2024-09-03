import { Spin, Card, Row, Col, Divider, List, Space, Typography, message } from 'antd';
import React, { useEffect, useState } from "react";
import { API } from "../../constant";
import { getToken } from "../../helpers";
const OWASPs = () => {
  const [patterns, setPatterns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPatterns = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/patterns?populate[owasps]=true`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${getToken()}`, 
          'Content-Type': 'application/json',  
        },
    });
      const data = await response.json();
      setPatterns(data.data ?? []);
      console.log(data.data);
    } catch (error) {
      console.error(error);
      message.error("Error while fetching OWASPs!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPatterns();
  }, []);

  if (isLoading) {
    return <Spin size="large" />;
  }
  return (
    <Row gutter={[32, 32]}>
      <Space
              className="pattern_card_space"
              direction="vertical"
              align="center"
            > 
      <Typography.Title level={3} > Privacy Patterns associated OWASPs</Typography.Title>
      </Space>
      {patterns.map((pattern, index) => (
        <Col md={8} lg={8} sm={24} xs={24} key={`${pattern.id}_${index}`}>
          <Card className="pattern_card">
            <Divider orientation="left">Pattern</Divider>
            <Space
              className="pattern_card_space"
              direction="vertical"
              align="left"
            >
              <Typography.Title level={5}>{pattern.attributes.title}</Typography.Title>
            </Space>
            <Divider orientation="left">OWASPs</Divider>
            <Space
              className="pattern_card_space"
              direction="vertical"
              align="left"
            >
            <List
              bordered
              dataSource={pattern.attributes.owasps.data}
              renderItem={(item) => (
                  <List.Item>
                  {item.attributes.number} : {item.attributes.name}
                  </List.Item>
              )}
            />
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default OWASPs;