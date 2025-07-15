import { useState } from "react";
import "./App.css"; // Make sure this CSS is included

export default function App() {
  const [msg, setMsg] = useState("");
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 17);
    return d.toISOString().split("T")[0];
  });
  const [isCurrWeekHoliday, setIsCurrWeekHoliday] = useState(true);

  function getHoliday(currWeakHoliday, targetDate) {
    const currentDate = new Date();
    const thisWeek = currentDate.getDay();
    currentDate.setDate(currentDate.getDate() - thisWeek);

    const targetWeek = targetDate.getDay();
    targetDate.setDate(targetDate.getDate() + (7 - targetWeek));

    currentDate.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const c = new Date(targetDate) - new Date(currentDate);
    const daysDiff = c / (1000 * 60 * 60 * 24);
    const weeks = daysDiff / 7;

    switch (weeks % 2) {
      case 1:
        setMsg(currWeakHoliday ? "🎉 Holiday" : "😢 Bad Luck");
        break;
      case 0:
        setMsg(!currWeakHoliday ? "🎉 Holiday" : "😢 Bad Luck");
        break;
      default:
        setMsg("❓ Error");
    }
  }

  return (
    <div className="app-container">
      <div className="card">
        <h1>Saturday-Off Checker</h1>

        <label>
          📅 Target Date:&nbsp;
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={isCurrWeekHoliday}
            onChange={(e) => setIsCurrWeekHoliday(e.target.checked)}
          />
          &nbsp;Current Week is a Holiday
        </label>

        <button
          className="btn"
          onClick={() => getHoliday(isCurrWeekHoliday, new Date(selectedDate))}
        >
          Check Holiday
        </button>

        <p className={`result ${msg ? "show" : ""}`}>{msg}</p>
      </div>
    </div>
  );
}
