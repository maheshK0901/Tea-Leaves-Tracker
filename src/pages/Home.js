import { useState, useEffect } from "react";
import AddWeight from "../components/AddWeight";
import TodayHistory from "../components/TodayHistory";
import "../styles/home.css"; // Assuming you have a CSS file for styling
import Calendar from "../components/Calendar";

export default function Home() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("teaEntries");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("teaEntries", JSON.stringify(entries));
  }, [entries]);

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = `${year}-${month}-${day}`;
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = days[date.getDay()];

  return (
    <div>
      <div className="main-content">
        <div className="home-container">
          <h1>Welcome to the Tea Tracker!</h1>
          <p>
            This app helps you to keep track of your tea leaves.
          </p>
          <h4>Today is {formattedDate}</h4>
          <h5>{dayOfWeek}</h5>
          <AddWeight entries={entries} setEntries={setEntries} />
        </div>
        <div className="calendar-container">
          <Calendar entries={entries} />
        </div>
      </div>
      <hr />
      <div>
        <TodayHistory entries={entries} setEntries={setEntries} />
      </div>
    </div>
  );
}
