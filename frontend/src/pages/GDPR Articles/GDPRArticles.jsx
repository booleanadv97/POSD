import { Spin, Card, Row, Col, Button, Space, Switch, Typography, Input, message } from 'antd';
import React, { useEffect, useState } from "react";
import { API } from "../../constant";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../helpers";

const GDPRArticles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ellipsis, setEllipsis] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); 
  const navigate = useNavigate();

  /* Redirect to ViewGDPRArticlePatterns */
  const viewGDPRArticlePatterns = (article_id, article_title) => {
    const data = { article_id: article_id, article_title: article_title };
    navigate('/gdprarticles/viewgdprarticlepatterns', { state: data });
  };

  /* Redirect to ViewGDPRArticleCWEs */
  const viewGDPRArticleCWEs = (article_id, article_title) => {
    const data = { article_id: article_id, article_title: article_title };
    navigate('/gdprarticles/viewgdprarticlecwes', { state: data });
  };

  /* Fetch GDPR Articles from Backend */
  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/gdpr-articles`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${getToken()}`, 
          'Content-Type': 'application/json',  
        },
    });
      const data = await response.json();
      setArticles(data.data ?? []);
    } catch (error) {
      console.error(error);
      message.error("Error while fetching GDPR Articles!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (isLoading) {
    return <Spin size="large" />;
  }

  /* Filtered GDPR Articles*/
  const filteredGDPRArticles = articles.filter((pattern) =>
    pattern.attributes.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ("Article "+ pattern.attributes.article_number.toString()).toLowerCase().includes(searchTerm.toLowerCase()) ||
    pattern.attributes.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Row gutter={[32, 32]}>
      <Space direction="vertical" align="center" style={{ width: '100%'}}> 
        <Typography.Title level={3}>GDPR Articles</Typography.Title>
      </Space>
       {/* Search input for filtering GDPR Articles */}
       <Space direction="vertical" style={{ width: '100%', marginLeft: '16px' }}>
        <Input
          placeholder="Search by GDPR Article title, number or description"
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

      {/* Render filtered GDPR Articles */}
      {filteredGDPRArticles.map((article, index) => (
        <Col md={8} lg={8} sm={24} xs={24} key={`${article.id}_${index}`}>
          <Card className="pattern_card">
            <Space
              className="pattern_card_space"
              direction="vertical"
              align="center"
            >
              <Typography.Title level={2}>Article {article.attributes.article_number}</Typography.Title>
              <Typography.Title level={3}>{article.attributes.title}</Typography.Title>
              <Typography.Paragraph ellipsis={ellipsis ? { rows: 4, expandable: true, symbol: 'more' } : false}>{article.attributes.description}</Typography.Paragraph>
              <Button type="link" onClick={() => viewGDPRArticlePatterns(article.id, article.attributes.title)}>View patterns associated</Button>
              <Button type="link" onClick={() => viewGDPRArticleCWEs(article.id, article.attributes.title)}>View CWEs associated</Button>
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default GDPRArticles;