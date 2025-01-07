import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Spin } from "antd";
import styled from "styled-components";

const FormContainer = styled.div`
  padding: 50px;
`;

const StyledContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const EditProject = ({ projects, updateProjectData }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((item) => item.id.toString() === id);

  if (!project) {
    return (
      <StyledContainer>
        <div>Project not found</div>
      </StyledContainer>
    );
  }

  const handleSave = (values) => {
    updateProjectData({ ...project, ...values });
    navigate("/");
  };

  return (
    <FormContainer>
      <Form
        initialValues={project}
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
        onFinish={handleSave}
      >
        <Form.Item label="Project Name" name="project_name">
          <Input />
        </Form.Item>
        <Form.Item label="Project Description" name="project_description">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Start Date" name="start_date">
          <Input />
        </Form.Item>
        <Form.Item label="End Date" name="end_date">
          <Input />
        </Form.Item>
        <Form.Item label="Project Manager" name="project_manager">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default EditProject;
