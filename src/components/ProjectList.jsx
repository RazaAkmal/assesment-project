import React, { useState } from "react";
import { Table, Button, Space, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import styled from "styled-components";
import { toast } from "react-toastify";

const StyledButton = styled(Button)`
  margin-bottom: 15px;
  float: inline-end;
`;
const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const ButtonLink = styled(Button)`
  color: black;

  &:hover {
    color: black !important;
  }
`;
const ProjectList = ({ projects, updateProjectData, handleCreateProject }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleFavoriteToggle = async (record) => {
    const updatedProject = {
      ...record,
      favourite: !record.favourite,
    };
    setIsLoading(true);
    try {
      await updateProjectData(updatedProject, !record.favourite);
    } catch (err) {
      toast.error(
        "Error occurred while updating the project. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      title: "Project ID",
      dataIndex: "project_id",
      key: "project_id",
      render: (project_id, record) => (
        <ButtonLink
          type="link"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/projects/${record.id}`);
          }}
        >
          {project_id}
        </ButtonLink>
      ),
    },
    {
      title: "Project Name",
      dataIndex: "project_name",
      key: "project_name",
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
    },
    {
      title: "Project Manager",
      dataIndex: "project_manager",
      key: "project_manager",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={
              record.favourite ? (
                <HeartFilled style={{ color: "red" }} />
              ) : (
                <HeartOutlined style={{ color: "gray" }} />
              )
            }
            onClick={(e) => {
              e.stopPropagation();
              handleFavoriteToggle(record);
            }}
          />
          <Button
            type="primary"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/edit/${record.id}`);
            }}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      {isLoading && (
        <Container>
          {" "}
          <Spin tip="Loading..." size="large" />
        </Container>
      )}
      {!isLoading && (
        <>
          <StyledButton type="primary" onClick={handleCreateProject}>
            Create Project
          </StyledButton>
          <Table columns={columns} dataSource={projects} />
        </>
      )}
    </>
  );
};

export default ProjectList;
