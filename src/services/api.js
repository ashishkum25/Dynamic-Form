const API_BASE_URL = "https://dynamic-form-generator-9rl7.onrender.com";

export const createUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error("Failed to create user");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const getForm = async (rollNumber) => {
  try {
    const response = await fetch(`${API_BASE_URL}/get-form?rollNumber=${rollNumber}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch form");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching form:", error);
    throw error;
  }
};