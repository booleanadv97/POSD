import { Spin, Card, Row, Col, Space, Button, Switch, Typography, Tooltip, Input, message } from 'antd';
import React, { useEffect, useState } from "react";
import { API } from "../../constant";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../helpers";

const CWEs = () => {
  const [CWEs, setCWEs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ellipsis, setEllipsis] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); 
  const navigate = useNavigate();

  {/* Redirect to ReportCWEWeakness */}
  const reportCWEWeakness = () => {
    navigate('/reportcweweakness');
  };

  {/* Redirect to ViewCWEPatterns */}
  const viewCWEPatterns = (id, cwe_id) => {
    const data = { id: id, cwe_id: cwe_id };
    navigate('/viewcwepatterns', { state: data });
  };

  {/* Fetch CWEs from backend */}
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
 
  {/* Filtered CWEs */}
  const filteredCWEs = CWEs.filter((cwe) =>
    cwe.attributes.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ("CWE-"+cwe.attributes.cwe_id.toString()).toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <>
     {/* Report a vulnerability */}
     <Space className="cwe_card_space" direction="vertical" align="end">
        <Button size="large" type="primary" onClick={() => reportCWEWeakness()} danger>Report a vulnerability</Button>
      </Space>
      
      <Typography.Title align={"center"} level={3}>CWE Weaknesses</Typography.Title>

      {/* Search input for filtering CWEs */}
      <Space direction="vertical" style={{ width: '100%', margin: '16px' }}>
        <Input
          placeholder="Search by CWE ID or description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
          size="large"
        />
      </Space>

      <Row gutter={[32, 32]}>
        {/* Switch to toggle ellipsis */}
          <Space direction="vertical" style={{width: '100%', marginLeft: '32px' }}>
            <div> 
              <Switch
                checked={ellipsis}
                onChange={() => setEllipsis(!ellipsis)}
              />
            <Typography.Text style={{marginLeft: '16px'}}>Toggle text truncation</Typography.Text>
            </div>
          </Space>
          
        {/* Render filtered CWEs */}
        {filteredCWEs.map((cwe, index) => (
          <Col md={8} lg={8} sm={24} xs={24} key={`${cwe.id}_${index}`}>
            <Card className="cwe_card">
              <Space className="cwe_card_space" direction="vertical" align="center">
                <Typography.Title level={3}>CWE-{cwe.attributes.cwe_id}</Typography.Title>
                <Typography.Paragraph ellipsis={ellipsis ? { rows: 4, expandable: true } : false}>
                  {cwe.attributes.description}
                </Typography.Paragraph>
                <Button type="link" onClick={() => viewCWEPatterns(cwe.id, cwe.attributes.cwe_id)}>View associated patterns</Button>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CWEs;