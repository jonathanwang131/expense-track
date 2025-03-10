"use client";

import { useState } from "react";
import api from "../utils/api"; // Use the axios instance that includes the token

const ExpenseForm = ({ onExpenseAdded }: { onExpenseAdded: () => void }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/expenses/", {
        title,
        amount: parseFloat(amount),
        category,
      });

      console.log("Expense added:", response.data);
      setTitle("");
      setAmount("");
      setCategory("Food");
      onExpenseAdded(); // Refresh the list after adding
      setError("");
    } catch (err) {
      console.error("Error adding expense:", err);
      setError("Failed to add expense. Check your input.");
    }
  };

  return (
    <div>
      <h3>Add Expense</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Food">Food</option>
          <option value="Transit">Transit</option>
          <option value="Bills">Bills</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>
        <button type="submit">Add Expense</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ExpenseForm;
