import { useEffect, useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import WeekScreen from "./screens/WeekScreen";
import BottomNav from "./components/BottomNav";

const days = [
  "monday","tuesday","wednesday",
  "thursday","friday","saturday","sunday"
];

const createEmptyWeek = () => {
  const week = {};
  days.forEach(d => {
    week[d] = { listId: null };
  });
  return week;
};

export default function App() {
  // 🧠 WEEK is now default screen
  const [screen, setScreen] = useState("week");

  const [lists, setLists] = useState({});
  const [week, setWeek] = useState(createEmptyWeek());

  const [activeListId, setActiveListId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("planner");

    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);

      setLists(parsed.lists || {});
      setWeek(parsed.week || createEmptyWeek());
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "planner",
      JSON.stringify({ lists, week })
    );
  }, [lists, week]);

  // ======================
  // LIST VIEW (unchanged)
  // ======================
  if (activeListId) {
    const list = lists[activeListId];

    const addTask = () => {
      const text = prompt("Task:");
      if (!text) return;

      setLists(prev => ({
        ...prev,
        [activeListId]: {
          ...prev[activeListId],
          tasks: [
            ...prev[activeListId].tasks,
            {
              id: Date.now(),
              text,
              done: false
            }
          ]
        }
      }));
    };

    const toggleTask = (taskId) => {
      setLists(prev => ({
        ...prev,
        [activeListId]: {
          ...prev[activeListId],
          tasks: prev[activeListId].tasks.map(t =>
            t.id === taskId ? { ...t, done: !t.done } : t
          )
        }
      }));
    };

    return (
      <div style={{ padding: 16 }}>
        <button onClick={() => setActiveListId(null)}>
          ← Back
        </button>

        <h2>{list.name}</h2>

        <button onClick={addTask}>
          + Add Task
        </button>

        {list.tasks.map(task => (
          <div
            key={task.id}
            style={{
              display: "flex",
              gap: 10,
              padding: 8
            }}
          >
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
            />

            <span
              style={{
                textDecoration: task.done
                  ? "line-through"
                  : "none",
                color: task.done ? "#999" : "#000"
              }}
            >
              {task.text}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // ======================
  // MAIN APP
  // ======================
  return (
    <div style={{ paddingBottom: 70 }}>
      
      {screen === "templates" && (
        <HomeScreen
          lists={lists}
          setLists={setLists}
          openList={setActiveListId}
        />
      )}

      {screen === "week" && (
        <WeekScreen
          lists={lists}
          week={week}
          setWeek={setWeek}
        />
      )}

      <BottomNav
        screen={screen}
        setScreen={setScreen}
      />
    </div>
  );
}