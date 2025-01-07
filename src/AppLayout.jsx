import React, { useState } from "react";
import { Layout, Spin } from "antd";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import ProjectList from "./components/ProjectList";
import EditProject from "./components/EditProject";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { ToastContainer } from "react-toastify";
import { useProjects } from "./hooks/useProjects";
import "react-toastify/dist/ReactToastify.css";

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

const AppLayout = () => {
  const { projects, loading, updateProjectData } = useProjects();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const favouriteProjects = projects.filter((project) => project.favourite);
  console.log(favouriteProjects, 'pro')

  return (
    <Container>
      <ToastContainer />
      {loading && <Spin tip="Loading..." size="large" />}
      {!loading && (
        <Layout>
          <StyledSider width={200}>
            <TableContainer>
              <h4>Favourite Projects</h4>
              <StyledList>
                {favouriteProjects.map((project) => (
                  <ListItem key={project.id}>{project.project_name}</ListItem>
                ))}
              </StyledList>
            </TableContainer>
          </StyledSider>
          <StyledContent>
            <Routes>
              <Route
                path="/"
                element={<ProjectList projects={projects} />}
              />
              <Route
                path="/edit/:id"
                element={
                  <EditProject
                    projects={projects}
                    updateProjectData={(updatedData) => updateProjectData(updatedData)}
                  />
                }
              />
            </Routes>
          </StyledContent>
          <MobileSider
            className={mobileSidebarOpen ? "open" : ""}
            width={200}
          >
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
        </Layout>
      )}
    </Container>
  );
};

export default AppLayout;
