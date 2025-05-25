import { useState } from "react";

export default function TodayHistory({ entries, setEntries }) {
  const today = new Date().toISOString().split("T")[0];

  // Map today's entries and include original index
  const todayEntries = entries
    .map((entry, index) => ({ ...entry, originalIndex: index }))
    .filter((entry) => entry.date === today);

  const handleDelete = (indexToDelete) => {
    const updated = entries.filter((_, index) => index !== indexToDelete);
    setEntries(updated);
    localStorage.setItem("teaEntries", JSON.stringify(updated));
  };

  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({ date: "", bags: "", weight: "" });

  const startEdit = (entry) => {
    setEditIndex(entry.originalIndex); // Now this is valid
    setEditData({ date: entry.date, bags: entry.bags, weight: entry.weight });
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditData({ date: "", bags: "", weight: "" });
  };

  const saveEdit = () => {
    const updatedEntries = entries.map((entry, idx) =>
      idx === editIndex ? { ...editData } : entry
    );
    setEntries(updatedEntries);
    localStorage.setItem("teaEntries", JSON.stringify(updatedEntries));
    cancelEdit();
  };

  return (
    <div className="today-history-container">
      <h3>Today Records</h3>
      {todayEntries.length === 0 ? (
        <p>No records found for today.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Bags</th>
              <th>Weight</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todayEntries.map((entry) => (
              <tr key={entry.originalIndex}>
                {editIndex === entry.originalIndex ? (
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
                    <td>
                      <button onClick={() => startEdit(entry)}>Edit</button>
                      <button onClick={() => handleDelete(entry.originalIndex)}>
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
