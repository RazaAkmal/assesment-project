import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Spin } from "antd";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.div`
  padding: 50px;
`;

const StyledContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const EditProject = ({ projects, updateProjectData }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const project = projects.find((item) => item.id.toString() === id);

  if (!project) {
    return (
      <StyledContainer>
        <div>Project not found</div>
      </StyledContainer>
    );
  }

  const handleSave = async (values) => {
    setIsLoading(true);
    try {
      await updateProjectData({ ...project, ...values });
      navigate("/");
    } catch (error) {
      toast.error("Failed to save the project. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <Container>
          {" "}
          <Spin tip="Loading..." size="large" />
        </Container>
      )}
      {!isLoading && (
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
      )}
    </>
  );
};

export default EditProject;
