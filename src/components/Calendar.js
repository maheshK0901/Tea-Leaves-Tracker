// components/Calendar.js
import "../styles/calendar.css";

export default function Calendar({ entries }) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0);

  const totalDays = endOfMonth.getDate();
  const startDay = startOfMonth.getDay();

  const getDateKey = (d) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(
      2,
      "0"
    )}`;

  const markedDates = new Set(entries.map((e) => e.date));

  const days = [];

  // Fill initial empty cells
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }

  // Fill actual days
  for (let d = 1; d <= totalDays; d++) {
    const key = getDateKey(d);
    const isMarked = markedDates.has(key);
    days.push(
      <div
        key={key}
        className={`calendar-day ${isMarked ? "marked" : ""}`}
        title={isMarked ? "Tea plucked this day" : ""}
      >
        {d}
      </div>
    );
  }

  return (
    <div className="calendar-container">
        <h2>Tea Plucking of This Month</h2>
      <h3>
        {today.toLocaleString("default", { month: "long" })} {year}
      </h3>
      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="calendar-header">
            {day}
          </div>
        ))}
        {days}
      </div>
    </div>
  );
}
