import { Spin, Card, Row, Col, Space, Switch, Typography, Input, message } from 'antd';
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
  const [searchTerm, setSearchTerm] = useState(''); 
  
  /* Fetch GDPR Article associated CWE Weaknesses */
  const fetchCWEs = (async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/cwe-weaknesses?filters[patterns][gdpr_articles][$contains]=${id}`, {
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

  /* Filtered GDPR Article associated CWE Weaknesses */
  const filteredGDPRArticleCWEs = CWEs.filter((CWE) =>
    ("CWE-"+ CWE.attributes.cwe_id.toString()).toLowerCase().includes(searchTerm.toLowerCase()) ||
    CWE.attributes.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Row gutter={[32, 32]}>
    <Space
      className="pattern_card_space"
      direction="vertical"
      align="center"
    > 
      <Typography.Title level={3}>{article_title} associated CWE Weaknesses</Typography.Title> 
    </Space>

    {/* Search input for filtering GDPR Article associated CWE Weaknesses */}
    <Space direction="vertical" style={{ width: '100%', marginLeft: '16px' }}>
        <Input
          placeholder="Search by CWE Weakness number or description"
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

      {/* Render filtered GDPR Article associated CWE Weaknesses */}
      {filteredGDPRArticleCWEs.map((cwe, index) => (
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