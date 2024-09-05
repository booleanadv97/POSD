  import { Spin, Card, Row, Col, Space, Button, Switch, Typography, Input, message } from 'antd';
  import React, { useEffect, useState } from "react";
  import { API } from "../../constant";
  import { useNavigate } from "react-router-dom";
  import { getToken } from "../../helpers";

  const Patterns = () => {
    const [patterns, setPatterns] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [ellipsis, setEllipsis] = useState(true);
    const [searchTerm, setSearchTerm] = useState(''); 
    const navigate = useNavigate();
   
    /* Redirects to ViewPatternExample */
    const viewPatternExample = (pattern_id, pattern_title) => {
      const data = { pattern_id: pattern_id, pattern_title: pattern_title };
      navigate('/patterns/viewpatternexample', { state: data });
    };

    /* Redirects to ViewCWEsByPattern */
    const viewCWEsByPattern = (pattern_id, pattern_title) => {
      const data = { pattern_id: pattern_id, pattern_title: pattern_title };
      navigate('/patterns/viewcwesbypattern', { state: data });
    };

    /* Fetch Privacy Patterns from backend */
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
    
  /* Filtered Privacy Patterns */
  const filteredPrivacyPatterns = patterns.filter((pattern) =>
    pattern.attributes.title.toLowerCase().includes(searchTerm.toLowerCase())  || 
    pattern.attributes.description.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

    return (
      <Row gutter={[32, 32]}>
        {/* Search input for filtering Privacy Patterns */}
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

        {/* Render filtered Privacy Patterns */}
        {filteredPrivacyPatterns.map((pattern, index) => (
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