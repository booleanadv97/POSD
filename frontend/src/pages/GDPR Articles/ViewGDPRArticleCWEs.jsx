import { Spin, Card, Row, Col, Space, Switch, Typography, message } from 'antd';
import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { API } from "../../constant";
import { getToken } from "../../helpers";
const ViewGDPRArticleCWEs = () => {
  const [CWEs, setCWEs] = useState([]);
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

  const fetchCWEs = (async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/cwe-weaknesses?filters\[patterns\][gdpr_articles][$contains]=${id}`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${getToken()}`, 
          'Content-Type': 'application/json',  
        },
    });
      const data = await response.json();
      setCWEs(data.data ?? []);
    } catch (error) {
      console.error(error);
      message.error("Error while fetching article's associated CWEs!");
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    if(article_id){
        fetchCWEs(article_id);
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
            > <Typography.Title level={3}>{article_title} associated CWEs</Typography.Title> </Space>
      {CWEs.map((cwe, index) => (
        <Col md={8} lg={8} sm={24} xs={24} key={`${cwe.id}_${index}`}>
          <Card className="pattern_card">
            <Space
              className="pattern_card_space"
              direction="vertical"
              align="center"
            >
              <Typography.Title level={5}>CWE-{cwe.attributes.cwe_id}</Typography.Title> 
              <Typography.Paragraph ellipsis={ellipsis ? { rows: 4, expandable: true, symbol: 'more' } : false}>{cwe.attributes.description}</Typography.Paragraph>
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ViewGDPRArticleCWEs;