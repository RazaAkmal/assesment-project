import React, { useState } from "react";
import { Layout, Spin } from "antd";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import { Routes, Route, useNavigate } from "react-router-dom";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "react-toastify/dist/ReactToastify.css";

import { useProjects } from "./hooks/useProjects";

import ProjectList from "./components/ProjectList";
import EditProject from "./components/EditProject";
import ViewProject from "./components/ViewProject";
import CreateProject from "./components/CreateProject";

const { Content, Sider } = Layout;
const TableContainer = styled.div`
  padding: 16px;
`;

const StyledList = styled.ul`
  padding: 5px 5px 5px 20px;
  margin: 0;
`;

const ListItem = styled.li`
  padding: 5px;
  cursor: pointer;
`;

const StyledSider = styled(Sider)`
  height: 100vh;
  border-right: 1px solid black;
  background: white !important;
  padding: 16px;

  @media (max-width: 767px) {
    display: none;
  }
`;

const StyledContent = styled(Content)`
  padding: 16px;
  background: white !important;
`;

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const MobileSider = styled(Sider)`
  height: 100%;
  background: white !important;
  padding: 16px;
  border-right: 1px solid black;
  display: none;

  @media (max-width: 767px) {
    display: block;
    position: fixed !important;
    z-index: 100;
    top: 0;
    left: 0;
    width: 200px;
    transition: transform 0.3s ease;
    transform: translateX(-100%);
    &.open {
      transform: translateX(0);
    }
  }
`;

const StyledBtn = styled.div`
  position: absolute;
  top: 20px;
  left: 30px;
  z-index: 101;
  padding: 5px;
  background: #1677ff;
  color: white;
  display: none;
  border-radius: 5px;

  @media (max-width: 767px) {
    display: block;
  }
`;

const SyledLayout = styled(Layout)`
  height: 100%;
`;

const AppLayout = () => {
  const navigate = useNavigate();
  const { projects, loading, updateProjectData, createProject } = useProjects();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const favouriteProjects = projects.filter((project) => project.favourite);

  const handleViewProject = (id) => {
    navigate(`/projects/${id}`);
  };

  const handleCreateProject = () => {
    navigate("/create");
  };

  return (
    <Container>
      <ToastContainer />
      {loading && <Spin tip="Loading..." size="large" />}
      {!loading && (
        <SyledLayout>
          <StyledSider width={200}>
            <TableContainer>
              <h4>Favourite Projects</h4>
              <StyledList>
                {favouriteProjects.map((project) => (
                  <ListItem
                    key={project.id}
                    onClick={() => handleViewProject(project.id)}
                  >
                    {project.project_name}
                  </ListItem>
                ))}
              </StyledList>
            </TableContainer>
          </StyledSider>
          <StyledContent>
            <Routes>
              <Route
                path="/"
                element={
                  <ProjectList
                    projects={projects}
                    handleCreateProject={handleCreateProject}
                    updateProjectData={(updatedData, isFav) =>
                      updateProjectData(updatedData, isFav)
                    }
                  />
                }
              />
              <Route
                path="/edit/:id"
                element={
                  <EditProject
                    projects={projects}
                    updateProjectData={(updatedData) =>
                      updateProjectData(updatedData)
                    }
                  />
                }
              />
              <Route
                path="/projects/:id"
                element={<ViewProject projects={projects} />}
              />
              <Route
                path="/create"
                element={<CreateProject createProject={createProject} />}
              />
            </Routes>
          </StyledContent>
          <MobileSider className={mobileSidebarOpen ? "open" : ""} width={200}>
            <TableContainer>
              <h4>Favourite Projects</h4>
              <StyledList>
                {favouriteProjects.map((project) => (
                  <ListItem key={project.id}>{project.project_name}</ListItem>
                ))}
              </StyledList>
            </TableContainer>
          </MobileSider>
          <StyledBtn onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}>
            {mobileSidebarOpen ? <LeftOutlined /> : <RightOutlined />}
          </StyledBtn>
        </SyledLayout>
      )}
    </Container>
  );
};

export default AppLayout;
