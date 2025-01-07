import React, { useState, useEffect } from "react";
import { Layout, Spin } from "antd";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import ProjectList from "./components/ProjectList";
import EditProject from "./components/EditProject";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3001/data");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        toast.error(`Failed to fetch data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateData = (updatedProject) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === updatedProject.key ? updatedProject : item
      )
    );
  };

  const favouriteProjects = data.filter((item) => item.favourite);
  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

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
                  <ListItem key={project.key}>{project.project_name}</ListItem>
                ))}
              </StyledList>
            </TableContainer>
          </StyledSider>
          <StyledContent>
            <Routes>
              <Route path="/" element={<ProjectList data={data} />} />
              <Route
                path="/edit/:id"
                element={<EditProject data={data} updateData={updateData} />}
              />
            </Routes>
          </StyledContent>
          {/* Mobile Sidebar */}
          <MobileSider className={mobileSidebarOpen ? "open" : ""} width={200}>
            <TableContainer>
              <h4>Favourite Projects</h4>
              <StyledList>
                {favouriteProjects.map((project) => (
                  <ListItem key={project.key}>{project.project_name}</ListItem>
                ))}
              </StyledList>
            </TableContainer>
          </MobileSider>

          {/* Button to open/close the mobile sidebar */}
          <StyledBtn onClick={toggleMobileSidebar}>
            {mobileSidebarOpen ? <LeftOutlined /> : <RightOutlined />}
          </StyledBtn>
        </Layout>
      )}
    </Container>
  );
};

export default AppLayout;
