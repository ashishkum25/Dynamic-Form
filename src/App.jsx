import { useState } from "react";
import Login from "./components/Login";
import DynamicForm from "./components/DynamicForm";
import { createUser, getForm } from "./services/api";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (userData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Register the user
      await createUser(userData);
      
      // Fetch the form after successful registration
      const form = await getForm(userData.rollNumber);
      
      setUser(userData);
      setFormData(form);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      {error && <div className="error-message">{error}</div>}
      
      {!user ? (
        <Login onLoginSuccess={handleLogin} isLoading={isLoading} />
      ) : formData ? (
        <DynamicForm formData={formData} />
      ) : (
        <div className="loading">Loading form data...</div>
      )}
    </div>
  );
}

export default App;