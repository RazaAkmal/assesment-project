import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, DatePicker, Spin } from "antd";
import styled from "styled-components";

const FormContainer = styled.div`
  padding: 50px;
`;
const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const CreateProject = ({ createProject }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (values) => {
    setIsLoading(true);
    try {
      const formattedData = {
        ...values,
        start_date: values.start_date.format("YYYY-MM-DD"),
        end_date: values.end_date.format("YYYY-MM-DD"),
      };
      await createProject(formattedData);
      navigate("/");
    } catch (error) {
      console.error("Failed to create project:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <Container>
          <Spin tip="Loading..." size="large" />
        </Container>
      )}
      {!isLoading && (
        <FormContainer>
          <Form
            layout="horizontal"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 10 }}
            onFinish={handleSave}
          >
            <Form.Item
              label="Project ID"
              name="project_id"
              rules={[
                { required: true, message: "Please enter the project ID!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Project Name"
              name="project_name"
              rules={[
                { required: true, message: "Please enter the project name!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Project Description"
              name="project_description"
              rules={[
                {
                  required: true,
                  message: "Please enter the project description!",
                },
              ]}
            >
              <Input.TextArea rows={6} />
            </Form.Item>
            <Form.Item
              label="Start Date"
              name="start_date"
              rules={[
                { required: true, message: "Please enter the start date!" },
              ]}
            >
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item
              label="End Date"
              name="end_date"
              rules={[
                { required: true, message: "Please enter the end date!" },
              ]}
            >
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item
              label="Project Manager"
              name="project_manager"
              rules={[
                {
                  required: true,
                  message: "Please enter the project manager!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Create Project
              </Button>
            </Form.Item>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default CreateProject;
