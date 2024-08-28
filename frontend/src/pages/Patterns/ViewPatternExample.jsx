import { Spin, Card, Row, Button, Col, Space, Switch, Typography, message } from 'antd';
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { API } from "../../constant";
import { getToken } from "../../helpers";
const ViewPatternExample = () => {
  const [examples, setExamples] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { pattern_id, pattern_title } = location.state || {};
  const [ellipsis, setEllipsis] = useState(true);
  const navigate = useNavigate();
  <Switch
      checked={ellipsis}
      onChange={() => {
        setEllipsis(!ellipsis);
      }}
    />

  const sendFeedback = (pattern_example_id) => {
    const data = { pattern_example_id: pattern_example_id};
    navigate('/patterns/sendfeedback', { state: data });
  };

  const fetchExamples = (async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/pattern-examples?filters[pattern][$eq]=${id}`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${getToken()}`, 
          'Content-Type': 'application/json',  
        },
    });
      const data = await response.json();
      setExamples(data.data ?? []);
    } catch (error) {
      console.error(error);
      message.error("Error while fetching pattern examples!");
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    if(pattern_id){
      fetchExamples(pattern_id);
    }
  }, [pattern_id]);

  if (isLoading) {
    return <Spin size="large" />;
  }
  return (
    <Row gutter={[32, 32]}>
    <Space
              className="pattern_card_space"
              direction="vertical"
              align="center"
            > <Typography.Title level={3}>{pattern_title} examples</Typography.Title> </Space>
      {examples.map((pattern_example, index) => (
        <Col md={8} lg={8} sm={24} xs={24} key={`${pattern_example.id}_${index}`}>
          <Card className="pattern_card">
            <Space
              className="pattern_card_space"
              direction="vertical"
              align="center"
            >
              <Typography.Paragraph ellipsis={ellipsis ? { rows: 4, expandable: true, symbol: 'more' } : false}>{pattern_example.attributes.description}</Typography.Paragraph>
              <Button type="link" onClick={() => sendFeedback(pattern_example.id)}>Send feedback</Button>
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ViewPatternExample;