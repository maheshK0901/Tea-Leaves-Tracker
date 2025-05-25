import { useEffect, useState } from "react";
import "../styles/history.css";

export default function History() {
  const [entries, setEntries] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({ date: "", bags: "", weight: "" });

  useEffect(() => {
    const saved = localStorage.getItem("teaEntries");
    setEntries(saved ? JSON.parse(saved) : []);
  }, []);

  const getCurrentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  };
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const getMonthFromDate = (date) => date.slice(0, 7); // YYYY-MM

  const uniqueMonths = [
    ...new Set(entries.map((entry) => getMonthFromDate(entry.date))),
  ].sort((a, b) => (a < b ? 1 : -1)); // recent first

  const filteredEntries = entries.filter(
    (entry) => getMonthFromDate(entry.date) === selectedMonth
  );

  const isCurrentMonth = selectedMonth === getCurrentMonth();

  const totalBags = filteredEntries.reduce((sum, e) => sum + Number(e.bags), 0);
  const totalWeight = filteredEntries.reduce(
    (sum, e) => sum + Number(e.weight),
    0
  );

  const handleDelete = (indexToDelete) => {
    const updated = entries.filter((_, index) => index !== indexToDelete);
    setEntries(updated);
    localStorage.setItem("teaEntries", JSON.stringify(updated));
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditData(entries[index]);
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditData({ date: "", bags: "", weight: "" });
  };

  const saveEdit = () => {
    const updatedEntries = entries.map((entry, index) =>
      index === editIndex ? { ...editData } : entry
    );
    setEntries(updatedEntries);
    localStorage.setItem("teaEntries", JSON.stringify(updatedEntries));
    cancelEdit();
  };

  return (
    <div className="history-container">
      <h2>History Records</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="monthFilter">Filter by Month: </label>
        <select
          id="monthFilter"
          value={selectedMonth}
          onChange={(e) => {
            setSelectedMonth(e.target.value);
            cancelEdit();
          }}
        >
          {uniqueMonths.map((month) => (
            <option key={month} value={month}>
              {new Date(`${month}-01`).toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </option>
          ))}
        </select>
      </div>
      <span>
        <h4>Total Bags: {totalBags}</h4>
        <h4>Total Weight: {totalWeight} kg</h4>
      </span>
      {filteredEntries.length === 0 ? (
        <p>No records found for this month.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Bags</th>
              <th>Weight</th>
              {isCurrentMonth && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((entry, i) => {
              const globalIndex = entries.findIndex(
                (e) =>
                  e.date === entry.date &&
                  e.bags === entry.bags &&
                  e.weight === entry.weight
              );

              return (
                <tr key={i}>
                  {editIndex === globalIndex ? (
                    <>
                      <td>
                        <input
                          type="date"
                          value={editData.date}
                          onChange={(e) =>
                            setEditData({ ...editData, date: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={editData.bags}
                          onChange={(e) =>
                            setEditData({ ...editData, bags: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={editData.weight}
                          onChange={(e) =>
                            setEditData({ ...editData, weight: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <button onClick={saveEdit}>Save</button>
                        <button onClick={cancelEdit}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{entry.date}</td>
                      <td>{entry.bags}</td>
                      <td>{entry.weight}</td>
                      {isCurrentMonth && (
                        <td>
                          <button onClick={() => startEdit(globalIndex)}>
                            Edit
                          </button>
                          <button onClick={() => handleDelete(globalIndex)}>
                            Delete
                          </button>
                        </td>
                      )}
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
