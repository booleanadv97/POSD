import React from "react";
import { useNavigate } from "react-router-dom";

const NotAuthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleGoHome = () => {
    navigate("/"); // Redirect to the home page
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>403 - Not Authorized</h1>
      <p style={styles.message}>You do not have permission to view this page.</p>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleGoBack}>
          Go Back
        </button>
        <button style={styles.button} onClick={handleGoHome}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
  },
  title: {
    fontSize: "48px",
    color: "#ff4c4c",
  },
  message: {
    fontSize: "18px",
    color: "#555",
  },
  buttonContainer: {
    marginTop: "20px",
  },
  button: {
    padding: "10px 20px",
    margin: "0 10px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
};

export default NotAuthorized;
