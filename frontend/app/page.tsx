"use client";

import { useState, useEffect } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Login from "../components/Login";

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [refresh, setRefresh] = useState(false); // Add state to trigger refresh

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div>
      <h1>Expense Tracker</h1>
      {isAuthenticated ? (
        <>
          <ExpenseForm onExpenseAdded={() => setRefresh(!refresh)} />
          <ExpenseList key={refresh.toString()} />
        </>
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </div>
  );
};

export default HomePage;
