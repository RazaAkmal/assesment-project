import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Spin } from "antd";
import styled from "styled-components";

const FormContainer = styled.div`
  padding: 50px;
`;
const StyledLabel = styled.p`
  margin: 0;
`;

const StyledContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
const EditProject = ({ data, updateData }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { TextArea } = Input;

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const project = data?.find((item) => item.key.toString() === id);
    if (project) {
      setFormData(project);
    }
    setLoading(false);
  }, [id, data]);

  const handleSave = () => {
    updateData(formData);
    navigate("/");
  };

  if (loading) {
    return (
      <StyledContainer>
        <Spin tip="Loading..." size="large" />
      </StyledContainer>
    );
  }

  if (!formData) {
    return (
      <StyledContainer>
        <div>Project not found</div>
      </StyledContainer>
    );
  }

  return (
    <FormContainer>
      <Form
        layout="horizental"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
        onFinish={handleSave}
      >
        <Form.Item
          label="Project ID"
          name="project_id"
          initialValue={formData.project_id}
        >
          <StyledLabel>{formData.project_id}</StyledLabel>
        </Form.Item>
        <Form.Item
          label="Project Name"
          name="project_name"
          initialValue={formData.project_name}
        >
          <Input
            value={formData.project_name}
            onChange={(e) =>
              setFormData({ ...formData, project_name: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item
          label="Project Description"
          name="project_description"
          initialValue={formData.project_description}
        >
          <TextArea
            value={formData.project_description}
            onChange={(e) =>
              setFormData({
                ...formData,
                project_description: e.target.value,
              })
            }
            rows={4}
          />
        </Form.Item>
        <Form.Item
          label="Start Date"
          name="start_date"
          initialValue={formData.start_date}
        >
          <Input
            value={formData.start_date}
            onChange={(e) =>
              setFormData({ ...formData, start_date: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item
          label="End Date"
          name="end_date"
          initialValue={formData.end_date}
        >
          <Input
            value={formData.end_date}
            onChange={(e) =>
              setFormData({ ...formData, end_date: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item
          label="Project Manager"
          name="project_manager"
          initialValue={formData.project_manager}
        >
          <Input
            value={formData.project_manager}
            onChange={(e) =>
              setFormData({ ...formData, project_manager: e.target.value })
            }
          />
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
