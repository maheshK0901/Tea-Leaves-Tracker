import { useState } from "react";

export default function AddWeight({ entries, setEntries }) {
  const [date, setDate] = useState("");
  const [bags, setBags] = useState("");
  const [weight, setWeight] = useState("");

  const handleSave = () => {
    if (!date || !bags || !weight) {
      alert("Please fill in all fields.");
      return;
    }
    const newEntry = {
      date,
      bags,
      weight,
    };
    setEntries([...entries, newEntry]);
    setDate("");
    setBags("");
    setWeight("");
    alert("Entry added successfully!");
  };

  return (
    <div className="add-weight-container">
      <div className="form-group">
        <h4>Select Date</h4>
        <input
          type="date"
          className="form-input"
          value={date}
          max={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="form-group">
        <h4>Number of Bags</h4>
        <input
          type="number"
          className="form-input"
          placeholder="Enter number of bags"
          onChange={(e) => setBags(e.target.value)}
          value={bags}
        />
      </div>
      <div className="form-group">
        <h4>Add Weight</h4>
        <input
          type="number"
          className="form-input"
          placeholder="Enter weight"
          onChange={(e) => setWeight(e.target.value)}
          value={weight}
        />
      </div>
      <button className="submit-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}
