// services/api.js
export const fetchProjects = async () => {
  const response = await fetch("http://localhost:3001/projects");
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  return data || [];
};

export const updateProject = async (id, updatedData) => {
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
