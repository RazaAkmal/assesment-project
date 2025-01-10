const simulateDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchProjects = async () => {
  await simulateDelay(2000);
  const response = await fetch("http://localhost:3001/projects");
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  return data || [];
};

export const updateProject = async (id, updatedData) => {
  await simulateDelay(2000);
  try {
    const response = await fetch(`http://localhost:3001/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData), 
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data
  } catch (error) {
    console.error('Failed to update project:', error.message);
  }
};

export const createProject = async (newProject) => {
  await simulateDelay(2000);
  try {
    const response = await fetch("http://localhost:3001/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to create project:", error.message);
    throw error;
  }
};
