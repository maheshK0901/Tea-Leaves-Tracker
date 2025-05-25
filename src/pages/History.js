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
      {entries.length === 0 ? (
        <p>No records found.</p>
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
            {entries.map((entry, index) => (
              <tr key={index}>
                {editIndex === index ? (
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
                      <button onClick={() => startEdit(index)}>Edit</button>
                      <button onClick={() => handleDelete(index)}>
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
