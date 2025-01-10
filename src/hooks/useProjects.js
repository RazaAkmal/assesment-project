import { useState, useEffect } from "react";
import { fetchProjects, updateProject, createProject as apiCreateProject } from "../services/api";
import { toast } from "react-toastify";

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all projects
  useEffect(() => {
    const fetchAllProjects = async () => {
      setLoading(true);
      try {
        const fetchedProjects = await fetchProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        toast.error(`Failed to fetch projects: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProjects();
  }, []);

  // Update a specific project
  const updateProjectData = async (updatedProject, isFav = null) => {
    try {
      const updated = await updateProject(updatedProject.id, updatedProject);
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === updated.id ? updated : project
        )
      );
      if (isFav !== null) {
        if (isFav) {
          toast.success("Project added to favourites!");
        } else {
          toast.info("Project removed from favourites.");
        }
      } else {
        toast.success("Project updated successfully!");
      }
    } catch (error) {
      toast.error(`Failed to update project: ${error.message}`);
    }
  };

  const createProject = async (newProject) => {
    try {
      const createdProject = await apiCreateProject(newProject);
      setProjects((prevProjects) => [...prevProjects, createdProject]);
      toast.success("Project created successfully!");
    } catch (error) {
      toast.error(`Failed to create project: ${error.message}`);
    }
  };

  return {
    projects,
    loading,
    updateProjectData,
    createProject
  };
};
