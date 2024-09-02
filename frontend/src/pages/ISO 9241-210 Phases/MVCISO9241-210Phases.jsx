import { Spin, Card, Row, Col, Divider, List, Space, Typography, message } from 'antd';
import React, { useEffect, useState } from "react";
import { API } from "../../constant";
import { getToken } from "../../helpers";
const MVCISO9241_210Phases = () => {
  const [patterns, setPatterns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPatterns = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/patterns?populate[iso_9241_210_phases]=true&populate[mvc_components]=true`, {
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
      message.error("Error while fetching phases!");
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
      <Typography.Title level={3} > Privacy Patterns associated ISO 9241-210 Phases and MVC Components</Typography.Title>
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
            <Divider orientation="left">ISO 9241-210 Phases</Divider>
            <Space
              className="pattern_card_space"
              direction="vertical"
              align="left"
            >
            <List
              bordered
              dataSource={pattern.attributes.iso_9241_210_phases.data}
              renderItem={(item) => (
                  <List.Item>
                  {item.attributes.number}  {item.attributes.name}
                  </List.Item>
              )}
            />
            </Space>
            <Divider orientation="left">MVC Components</Divider>
            <Space
              className="pattern_card_space"
              direction="vertical"
              align="left"
            >
            <List
              bordered
              dataSource={pattern.attributes.mvc_components.data}
              renderItem={(item) => (
                  <List.Item>
                  {item.attributes.name}
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

export default MVCISO9241_210Phases;