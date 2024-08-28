import React from "react";
import { Button, Rate, Typography, Card, Col, Form, Input, message, Row, Spin } from "antd";
import { useAuthContext } from "../../context/AuthContext";
import { useLocation } from 'react-router-dom';
import { API } from "../../constant";
import { useState } from "react";
import { getToken } from "../../helpers";

const SendFeedback = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const { TextArea } = Input; 
  const location = useLocation();
  const { pattern_example_id } = location.state || {};
  const handleSubmit = async (data) => {
    data.users_permissions_user = user?.id;
    data.pattern_example = pattern_example_id;
    setLoading(true);
    try {
      const response = await fetch(`${API}/feedbacks`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`, 
          'Content-Type': 'application/json',  
        },
        body: JSON.stringify({ data }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.error.message || "Something went wrong!");
      }
      message.success("Feedback submitted successfully!");
    } catch (error) {
      console.error("Error while submitting feedback:", error);
      message.error(error?.message || 'There was an error submitting your feedback.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }
  return (
    <Card className="profile_page_card">
         <Typography.Title level={3}>Submit your feedback</Typography.Title>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
            description: "",
            title: ""
          }}
      >
        <Row gutter={[16, 16]}>
            <Col md={16} lg={16} sm={24} xs={24}>
                <Form.Item
                label="Feedback"
                name="content"
                rules={[
                    {
                    type: "string",
                    },
                ]}
                >
                <TextArea rows={4} placeholder="Feedback" />
                </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
            <Col md={16} lg={16} sm={24} xs={24}> 
                <Form.Item
                        name="rating"
                        label="Rating"
                        rules={[{ required: true, message: 'Please rate the example' }]}
                    >
                        <Rate />
                </Form.Item>
            </Col>
        </Row>
        <Button
          htmlType="submit"
          type="primary"
          size="large"
        >
          {loading ? (
            <>
              <Spin size="small" /> Submitting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </Form>
    </Card>
  );
};

export default SendFeedback;
