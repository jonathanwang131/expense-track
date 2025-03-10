"use client";

import { useState, useEffect } from "react";
import api from "../utils/api"; // Use the authenticated API instance

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");

  const fetchExpenses = async () => {
    try {
      const response = await api.get("/expenses/");
      setExpenses(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching expenses:", err);
      setError("Failed to load expenses.");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div>
      <h3>Expense List</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {expenses.map((expense: any) => (
          <li key={expense.id}>
            {expense.title} - ${expense.amount} ({expense.category})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
