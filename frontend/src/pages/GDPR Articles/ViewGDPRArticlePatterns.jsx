import { Spin, Card, Row, Col, Space, Switch, Typography, message } from 'antd';
import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { API } from "../../constant";
import { getToken } from "../../helpers";
const ViewGDPRArticlePatterns = () => {
  const [patterns, setPatterns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { article_id, article_title } = location.state || {};
  const [ellipsis, setEllipsis] = useState(true);
  <Switch
      checked={ellipsis}
      onChange={() => {
        setEllipsis(!ellipsis);
      }}
    />

  const fetchPatterns = (async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/patterns?filters[gdpr_articles][$contains]=${id}`, {
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
      message.error("Error while fetching article's associated patterns!");
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    if(article_id){
        fetchPatterns(article_id);
    }
  }, [article_id]);

  if (isLoading) {
    return <Spin size="large" />;
  }
  return (
    <Row gutter={[32, 32]}>
    <Space
              className="pattern_card_space"
              direction="vertical"
              align="center"
            > <Typography.Title level={3}>{article_title} associated patterns</Typography.Title> </Space>
      {patterns.map((pattern, index) => (
        <Col md={8} lg={8} sm={24} xs={24} key={`${pattern.id}_${index}`}>
          <Card className="pattern_card">
            <Space
              className="pattern_card_space"
              direction="vertical"
              align="center"
            >
              <Typography.Title level={5}>{pattern.attributes.title}</Typography.Title> 
              <Typography.Paragraph ellipsis={ellipsis ? { rows: 4, expandable: true, symbol: 'more' } : false}>{pattern.attributes.description}</Typography.Paragraph>
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ViewGDPRArticlePatterns;