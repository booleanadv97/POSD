import { Spin, Card, Divider, Row, List, Col, Space, Switch, Typography, message } from 'antd';
import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { API } from "../../constant";
import { getToken } from "../../helpers";
const ViewStrategyDetails = () => {
  const [gdpr_articles, setGdprArticles] = useState([]);
  const [principles, setPrinciples] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { strategy_id, strategy_name } = location.state || {};
  
  const fetchDetails = (async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/patterns?populate[principles]=true&populate[gdpr_articles]=true&filters[strategies][$contains]=${id}`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${getToken()}`, 
          'Content-Type': 'application/json',  
        },
    });
      const data = await response.json();
      setPatterns(data.data.map(item => item.attributes));
      const gdprArticles = data.data.flatMap(item => item.attributes.gdpr_articles.data);
      setGdprArticles(Array.from(new Map(gdprArticles.map(article => [article.id, article])).values()));
      const principles = data.data.flatMap(item => item.attributes.principles.data);
      setPrinciples(Array.from(new Map(principles.map(principle => [principle.id, principle])).values()));
    } catch (error) {
      console.error(error);
      message.error("Error while fetching strategy details!");
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    if(strategy_id){
        fetchDetails(strategy_id);
    }
  }, [strategy_id]);

  if (isLoading) {
    return <Spin size="large" />;
  }
  return (
    <Row gutter={[32, 32]}>
         <Space
                className="pattern_card_space"
                direction="vertical"
                align="center"
                > <Typography.Title level={3}>{strategy_name} strategy details</Typography.Title> </Space>
    <Col span={6}> 
        <Divider orientation="left">Patterns</Divider>
        <List
        bordered
        dataSource={patterns}
        renderItem={(item) => (
            <List.Item>
            {item.title}
            </List.Item>
        )}
        />
    </Col>
    <Col span={6}> 
        <Divider orientation="left">GDPR Articles</Divider>
        <List
        bordered
        dataSource={gdpr_articles}
        renderItem={(item) => (
            <List.Item>
            Article {item.attributes.article_number}
            </List.Item>
        )}
        />
    </Col>
    <Col span={6}> 
        <Divider orientation="left">Principles</Divider>
        <List
        bordered
        dataSource={principles}
        renderItem={(item) => (
            <List.Item>
            {item.attributes.name}
            </List.Item>
        )}
        />
    </Col>
    </Row>
  );
};

export default ViewStrategyDetails;