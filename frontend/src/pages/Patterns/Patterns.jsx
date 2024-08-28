  import { Spin, Card, Row, Col, Space, Button, Switch, Typography, message } from 'antd';
  import React, { useEffect, useState } from "react";
  import { API } from "../../constant";
  import { useNavigate } from "react-router-dom";
  import { getToken } from "../../helpers";
  const Patterns = () => {
    const [patterns, setPatterns] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [ellipsis, setEllipsis] = useState(true);
    const navigate = useNavigate();
    <Switch
        checked={ellipsis}
        onChange={() => {
          setEllipsis(!ellipsis);
        }}
      />
  
    const viewPatternExample = (pattern_id, pattern_title) => {
      const data = { pattern_id: pattern_id, pattern_title: pattern_title };
      navigate('/patterns/viewpatternexample', { state: data });
    };

    const viewCWEsByPattern = (pattern_id, pattern_title) => {
      const data = { pattern_id: pattern_id, pattern_title: pattern_title };
      navigate('/patterns/viewcwesbypattern', { state: data });
    };

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
        {patterns.map((pattern, index) => (
          <Col md={8} lg={8} sm={24} xs={24} key={`${pattern.id}_${index}`}>
            <Card className="pattern_card">
              <Space
                className="pattern_card_space"
                direction="vertical"
                align="center"
              >
                <Typography.Title level={3}>{pattern.attributes.title}</Typography.Title>
                <Typography.Paragraph ellipsis={ellipsis ? { rows: 4, expandable: true, symbol: 'more' } : false}>{pattern.attributes.description}</Typography.Paragraph>
                <Button type="link" onClick={() => viewPatternExample(pattern.id, pattern.attributes.title)}>View examples</Button>
                <Button type="link" onClick={() => viewCWEsByPattern(pattern.id, pattern.attributes.title)}>View CWEs associated</Button>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  export default Patterns;