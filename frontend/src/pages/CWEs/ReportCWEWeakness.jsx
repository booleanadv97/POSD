import React from "react";
import { Button, Typography, Card, Col, Form, Input, message, Row, Spin } from "antd";
import { useAuthContext } from "../../context/AuthContext";
import { API } from "../../constant";
import { useState } from "react";
import { getToken } from "../../helpers";

const ReportCWEWeakness = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const { TextArea } = Input; 
  const handleSubmit = async (data) => {
    data.users_permissions_user = user?.id;
    setLoading(true);
    try {
      const response = await fetch(`${API}/cwe-weakness-reports`, {
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
      message.success("Report submitted successfully!");
    } catch (error) {
      console.error(error);
      message.error("Error while submitting report!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }
  return (
    <Card className="profile_page_card">
         <Typography.Title level={3}>Vulnerability report</Typography.Title>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
            description: "",
            title: ""
          }}
      >
        <Row gutter={[16, 16]}>
          <Col md={8} lg={8} sm={24} xs={24}>
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Title is required!",
                  type: "string",
                },
              ]}
            >
              <Input placeholder="Title" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
            <Col md={16} lg={16} sm={24} xs={24}>
                <Form.Item
                label="Description"
                name="description"
                rules={[
                    {
                    required: true,
                    message: "Description is required!",
                    type: "string",
                    },
                ]}
                >
                <TextArea rows={4} placeholder="Description" />
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

export default ReportCWEWeakness;
