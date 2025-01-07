// hooks/useProjects.js
import { useState, useEffect } from "react";
import { fetchProjects, updateProject } from "../services/api";
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
  const updateProjectData = async (updatedProject) => {
    try {
      const updated = await updateProject(updatedProject.id, updatedProject);
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === updated.id ? updated : project
        )
      );
      toast.success("Project updated successfully!");
    } catch (error) {
      toast.error(`Failed to update project: ${error.message}`);
    }
  };

  return {
    projects,
    loading,
    updateProjectData,
  };
};
