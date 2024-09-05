import { Spin, Card, Row, Col, Divider, List, Space, Typography, Input, message } from 'antd';
import React, { useEffect, useState } from "react";
import { API } from "../../constant";
import { getToken } from "../../helpers";
const OWASPs = () => {
  const [patterns, setPatterns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); 

  {/* Fetch Privacy Patterns associated OWASPs */}
  const fetchPatterns = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/patterns?populate[owasps]=true`, {
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
      message.error("Error while fetching OWASPs!");
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

  {/* Filtered Privacy Patterns associated OWASPs*/}
  const filteredPrivacyPatterns = patterns.filter((pattern) =>
    pattern.attributes.title.toLowerCase().includes(searchTerm.toLowerCase())  || 
    pattern.attributes.owasps.data.some((owasp) => owasp.attributes.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    pattern.attributes.owasps.data.some((owasp) => owasp.attributes.number.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Row gutter={[32, 32]}>
      <Space
              className="pattern_card_space"
              direction="vertical"
              align="center"
            > 
      <Typography.Title level={3} > Privacy Patterns associated OWASPs</Typography.Title>
      </Space>

      {/* Search input for filtering Privacy Patterns associated OWASPs */}
      <Space direction="vertical" style={{ width: '100%', marginLeft: '16px' }}>
        <Input
          placeholder="Search by Privacy Pattern title, associated OWASP number or title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
          size="large"
        />
      </Space>

      {/* Render filtered Privacy Patterns associated OWASPs */}
      {filteredPrivacyPatterns.map((pattern, index) => (
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
            <Divider orientation="left">OWASPs</Divider>
            <Space
              className="pattern_card_space"
              direction="vertical"
              align="left"
            >
            <List
              bordered
              dataSource={pattern.attributes.owasps.data}
              renderItem={(item) => (
                  <List.Item>
                  {item.attributes.number} : {item.attributes.name}
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

export default OWASPs;