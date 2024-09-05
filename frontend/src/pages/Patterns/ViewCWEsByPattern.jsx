import { Spin, Card, Row, Col, Space, Switch, Typography, Input, message } from 'antd';
import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { API } from "../../constant";
import { getToken } from "../../helpers";
const ViewCWEsByPattern = () => {
  const [CWEs, setCWEs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { pattern_id, pattern_title } = location.state || {};
  const [ellipsis, setEllipsis] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); 
   
  {/* Fetch Privacy Pattern associated CWE Weaknesses */}
  const fetchCWEs = (async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/cwe-weaknesses?filters[patterns][$contains]=${id}`, {
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
      message.error("Error while fetching pattern associated CWEs!");
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    if(pattern_id){
        fetchCWEs(pattern_id);
    }
  }, [pattern_id]);

  if (isLoading) {
    return <Spin size="large" />;
  }

   {/* Filtered Privacy Pattern associated CWE Weaknesses */}
   const filteredCWEs = CWEs.filter((cwe) =>
    cwe.attributes.description.toLowerCase().includes(searchTerm.toLowerCase())  || 
    ("CWE-"+cwe.attributes.cwe_id).toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  return (
    <Row gutter={[32, 32]}>
      <Space
        className="pattern_card_space"
        direction="vertical"
        align="center"
      > 
        <Typography.Title level={3}>{pattern_title} associated CWE Weaknesses </Typography.Title> 
      </Space>

      {/* Search input for filtering Privacy Pattern associated CWE Weaknesses */}
      <Space direction="vertical" style={{ width: '100%', marginLeft: '16px' }}>
        <Input
          placeholder="Search by CWE number or description"
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

      {/* Render Privacy Pattern associated CWE Weaknesses */}
      {filteredCWEs.map((cwe, index) => (
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

export default ViewCWEsByPattern;