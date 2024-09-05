import { Spin, Card, Row, Col, Space, Button, Typography, message } from 'antd';
import React, { useEffect, useState } from "react";
import { API } from "../../constant";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../helpers";

const Strategies = () => {
  const [strategies, setStrategies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
 
  /* Fetch Strategies from Backend */
  const fetchStrategies = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/strategies`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${getToken()}`, 
          'Content-Type': 'application/json',  
        },
    });
      const data = await response.json();
      setStrategies(data.data ?? []);
    } catch (error) {
      console.error(error);
      message.error("Error while fetching strategies!");
    } finally {
      setIsLoading(false);
    }
  };

  /* Redirect to ViewStrategyDetails */
  const viewStrategyDetails = (strategy_id, strategy_name) => {
    const data = { strategy_id: strategy_id, strategy_name: strategy_name };
    navigate('/strategies/viewstrategydetails', { state: data });
  };

  useEffect(() => {
    fetchStrategies();
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
                <Typography.Title level={3}>Strategies</Typography.Title>
        </Space>  
        {/* Render Strategies */}
        {strategies.map((strategy, index) => (
            <Col md={8} lg={8} sm={24} xs={24} key={`${strategy.id}_${index}`}>
            <Card className="pattern_card">
                <Space
                className="pattern_card_space"
                direction="vertical"
                align="center"
                > 
                    <Typography.Title level={5}>{strategy.attributes.name}</Typography.Title>
                    <Button type="link" onClick={() => viewStrategyDetails(strategy.id, strategy.attributes.name)}>View details</Button>
                </Space>
            </Card>
            </Col>
      ))}
    </Row>
  );
};

export default Strategies;