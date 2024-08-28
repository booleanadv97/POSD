import { Spin, Card, Row, Col, Space, Divider, Switch, Typography, message } from 'antd';
import React, { useEffect, useState } from "react";
import { API } from "../../constant";
import { getToken } from "../../helpers";
const Contexts = () => {
  const [patterns, setPatterns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ellipsis, setEllipsis] = useState(true);
  <Switch
      checked={ellipsis}
      onChange={() => {
        setEllipsis(!ellipsis);
      }}
    />
  const fetchPatterns = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/patterns`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${getToken()}`, 
          'Content-Type': 'application/json',  
        },
    });
      const data = await response.json();
      setPatterns(data.data ?? []);
    } catch (error) {
      console.error(error);
      message.error("Error while fetching patterns!");
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
                <Typography.Title level={3}>Contexts</Typography.Title>
        </Space>  
        {patterns.map((pattern, index) => (
            <Col md={8} lg={8} sm={24} xs={24} key={`${pattern.id}_${index}`}>
            <Card className="pattern_card">
                <Divider 
                    orientation="left">Pattern</Divider>
                <Space
                className="pattern_card_space"
                direction="vertical"
                > 
                    <Typography.Paragraph>{pattern.attributes.title}</Typography.Paragraph>
                </Space>
                <Space
                className="pattern_card_space"
                direction="vertical"
                align="center"
                ></Space>
                <Divider 
                    orientation="left">Context</Divider>
                <Space
                className="pattern_card_space"
                direction="vertical"
                >
                <Typography.Paragraph ellipsis={ellipsis ? { rows: 4, expandable: true, symbol: 'more' } : false}>{pattern.attributes.context}</Typography.Paragraph>
                </Space>
            </Card>
            </Col>
      ))}
    </Row>
  );
};

export default Contexts;