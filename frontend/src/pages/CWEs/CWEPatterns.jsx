import { Spin, Card, Row, Col, Space, Switch, Typography, Input, message } from 'antd';
import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { API } from "../../constant";
import { getToken } from "../../helpers";

const ViewCWEPatterns = () => {
  const [CWEPatterns, setCWEPatterns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { id, cwe_id } = location.state || {};
  const [ellipsis, setEllipsis] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); 
 
  /* Fetch CWE Weakness associated privacy patterns from backend */
  const fetchCWEPatterns = (async (cwe_id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/cwe-weaknesses/${cwe_id}?populate=*`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${getToken()}`, 
          'Content-Type': 'application/json',  
        },
    });
      const data = await response.json();
      console.log(data);
      setCWEPatterns(data.data.attributes.patterns.data ?? []);
    } catch (error) {
      console.error(error);
      message.error("Error while fetching pattern examples!");
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    if(id){
        fetchCWEPatterns(id);
    }
  }, [id]);

  if (isLoading) {
    return <Spin size="large" />;
  }

  /* Filtered CWE Weakness associated Privacy Patterns */
  const filteredCWEPatterns = CWEPatterns.filter((pattern) =>
    pattern.attributes.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pattern.attributes.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Row gutter={[32, 32]}>
      <Space
        className="cwe_card_space"
        direction="vertical"
        align="center"
      > 
        <Typography.Title level={3}>CWE-{cwe_id} associated Privacy Patterns</Typography.Title>
      </Space>

      {/* Search input for filtering CWE Weakness associated Privacy Patterns */}
      <Space direction="vertical" style={{ width: '100%', marginLeft: '16px' }}>
        <Input
          placeholder="Search by Privacy Pattern title or description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
          size="large"
        />
      </Space>

      {/* Switch to toggle ellipsis */}
      <Space direction="vertical" style={{width: '100%', marginLeft: '16px' }}>
        <div> 
          <Switch
            checked={ellipsis}
            onChange={() => setEllipsis(!ellipsis)}
          />
        <Typography.Text style={{marginLeft: '16px'}}>Toggle text truncation</Typography.Text>
        </div>
      </Space>

      {/* Render CWE Weakness associated Privacy Patterns */}
      {filteredCWEPatterns.map((pattern, index) => (
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

export default ViewCWEPatterns;