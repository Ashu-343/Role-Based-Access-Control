import React, { useEffect, useState } from "react";
import { getLoggedInUser, logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getLoggedInUser();
        if (response.success) {
          setUser(response.user);
        } else {
          navigate("/login");
        }
      } catch (err) {
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user.firstName} {user.lastName}</h2>
      <h3>Role: {user.accountType}</h3>
      <button onClick={handleLogout}>Logout</button>
      {user.accountType === "Admin" && <p>Admin Dashboard</p>}
      {user.accountType === "Instructor" && <p>Instructor Dashboard</p>}
      {user.accountType === "Student" && <p>Student Dashboard</p>}
    </div>
  );
};

export default Dashboard;