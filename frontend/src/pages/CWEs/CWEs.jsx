import { Spin, Card, Row, Col, Space, Button, Switch, Typography, message } from 'antd';
import React, { useEffect, useState } from "react";
import { API } from "../../constant";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../helpers";
const CWEs = () => {
  const [CWEs, setCWEs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ellipsis, setEllipsis] = useState(true);
  const navigate = useNavigate();
  <Switch
      checked={ellipsis}
      onChange={() => {
        setEllipsis(!ellipsis);
      }}
    />

  const viewCWEPatterns = (id, cwe_id) => {
    const data = { id: id, cwe_id: cwe_id };
    navigate('/viewcwepatterns', { state: data });
  };

  const fetchCWEs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/cwe-weaknesses`, {
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
      message.error("Error while fetching CWEs!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCWEs();
  }, []);

  if (isLoading) {
    return <Spin size="large" />;
  }
  return (
    <Row gutter={[32, 32]}>
      {CWEs.map((cwe, index) => (
        <Col md={8} lg={8} sm={24} xs={24} key={`${cwe.id}_${index}`}>
          <Card className="cwe_card">
            <Space
              className="cwe_card_space"
              direction="vertical"
              align="center"
            >
              <Typography.Title level={3}>CWE-{cwe.attributes.cwe_id}</Typography.Title>
              <Typography.Paragraph ellipsis={ellipsis ? { rows: 4, expandable: true, symbol: 'more' } : false}>{cwe.attributes.description}</Typography.Paragraph>
              <Button type="link" onClick={() => viewCWEPatterns(cwe.id, cwe.attributes.cwe_id)}>View examples</Button>
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CWEs;