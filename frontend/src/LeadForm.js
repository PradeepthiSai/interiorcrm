import { useState } from "react";
import axios from "axios";

function LeadForm({ onLeadAdded }) {
  const [form, setForm] = useState({
    clientName: "",
    roomType: "",
    estimatedBudget: "",
    status: "New",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/leads", form);
      onLeadAdded(res.data); // update parent state
      setForm({ clientName: "", roomType: "", estimatedBudget: "", status: "New" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
      <input name="clientName" placeholder="Client Name" value={form.clientName} onChange={handleChange} />
      <input name="roomType" placeholder="Room Type" value={form.roomType} onChange={handleChange} />
      <input name="estimatedBudget" placeholder="Budget" value={form.estimatedBudget} onChange={handleChange} />
      <select name="status" value={form.status} onChange={handleChange}>
        <option>New</option>
        <option>Contacted</option>
        <option>Converted</option>
      </select>
      <button type="submit">Add Lead</button>
    </form>
  );
}

export default LeadForm;
