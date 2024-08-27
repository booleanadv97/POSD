import { Spin, Card, Row, Col, Space, Button, Switch, Typography, message } from 'antd';
import React, { useEffect, useState } from "react";
import { API } from "../../constant";
import { getToken } from "../../helpers";
const GDPRArticles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ellipsis, setEllipsis] = useState(true);
  <Switch
      checked={ellipsis}
      onChange={() => {
        setEllipsis(!ellipsis);
      }}
    />

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/gdpr-articles`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${getToken()}`, 
          'Content-Type': 'application/json',  
        },
    });
      const data = await response.json();
      setArticles(data.data ?? []);
    } catch (error) {
      console.error(error);
      message.error("Error while fetching GDPR Articles!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (isLoading) {
    return <Spin size="large" />;
  }
  return (
    <Row gutter={[32, 32]}>
      {articles.map((article, index) => (
        <Col md={8} lg={8} sm={24} xs={24} key={`${article.id}_${index}`}>
          <Card className="pattern_card">
            <Space
              className="pattern_card_space"
              direction="vertical"
              align="center"
            >
              <Typography.Title level={3}>{article.attributes.title}</Typography.Title>
              <Typography.Paragraph ellipsis={ellipsis ? { rows: 4, expandable: true, symbol: 'more' } : false}>{article.attributes.description}</Typography.Paragraph>
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default GDPRArticles;