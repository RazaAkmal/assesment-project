import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Row, Col } from "antd";
import styled from "styled-components";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

const Container = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const StyledContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
const ItemContainer = styled(Row)`
  display: flex;
  align-items: flex-start;
`;
const ItemDiv = styled(Col)`
  display: flex;
  align-items: center;
  gap: 25px;
`;

const ButtonContainer = styled(Row)`
  display: flex;
  align-items: center;
  gap: 50px;
  padding: 10px 25px;
`;

const ViewProject = ({ projects }) => {
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

  return (
    <Container>
      <ItemContainer>
        <ItemDiv span={6}>Project ID:</ItemDiv>
        <ItemDiv span={12}>{project.project_id}</ItemDiv>
        <ItemDiv span={6}>
          {project.favourite && <HeartFilled style={{ color: "red" }} />}
        </ItemDiv>
      </ItemContainer>
      <ItemContainer>
        <ItemDiv span={6}>Project Name:</ItemDiv>
        <ItemDiv span={12}>{project.project_name}</ItemDiv>
      </ItemContainer>
      <ItemContainer>
        <ItemDiv span={6}>Project Description:</ItemDiv>
        <ItemDiv span={12}>{project.project_description}</ItemDiv>
      </ItemContainer>
      <ItemContainer>
        <ItemDiv span={6}>Start Date:</ItemDiv>
        <ItemDiv span={12}>{project.start_date}</ItemDiv>
      </ItemContainer>
      <ItemContainer>
        <ItemDiv span={6}>End Date:</ItemDiv>
        <ItemDiv span={12}>{project.end_date}</ItemDiv>
      </ItemContainer>
      <ItemContainer>
        <ItemDiv span={6}>Project Manager:</ItemDiv>
        <ItemDiv span={12}>{project.project_manager}</ItemDiv>
      </ItemContainer>
      <ButtonContainer>
        <Button type="primary" onClick={() => navigate("/")}>
          Back
        </Button>
        <Button type="primary" onClick={() => navigate(`/edit/${project.id}`)}>
          Edit
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default ViewProject;
