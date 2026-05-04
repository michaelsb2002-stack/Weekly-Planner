import { useEffect, useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import WeekScreen from "./screens/WeekScreen";
import RoutinesScreen from "./screens/RoutinesScreen";
import BottomNav from "./components/BottomNav";
import { defaultRoutines } from "./data/routines";

const days = [
  "monday","tuesday","wednesday",
  "thursday","friday","saturday","sunday"
];

const createEmptyWeek = () => {
  const week = {};
  days.forEach(d => {
    week[d] = { routineId: null };
  });
  return week;
};

export default function App() {
  const [screen, setScreen] = useState("week");

  const [lists, setLists] = useState({});
  const [routines, setRoutines] = useState(defaultRoutines);
  const [week, setWeek] = useState(createEmptyWeek());

  const [activeListId, setActiveListId] = useState(null);

  // LOAD
  useEffect(() => {
    const saved = localStorage.getItem("planner");

    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);

      setLists(parsed.lists || {});
      setRoutines(parsed.routines || defaultRoutines);
      setWeek(parsed.week || createEmptyWeek());
    } catch {}
  }, []);

  // SAVE
  useEffect(() => {
    localStorage.setItem(
      "planner",
      JSON.stringify({ lists, routines, week })
    );
  }, [lists, routines, week]);

  // ================= LIST VIEW =================
  if (activeListId) {
    const list = lists[activeListId];

    return (
      <div style={{ padding: 16 }}>
        <button onClick={() => setActiveListId(null)}>
          ← Back
        </button>

        <h2>{list.name}</h2>

        {list.tasks?.map(t => (
          <div key={t.id}>• {t.text}</div>
        ))}
      </div>
    );
  }

  // ================= MAIN APP =================
  return (
    <div style={{ paddingBottom: 70 }}>

      {screen === "week" && (
        <WeekScreen
          week={week}
          setWeek={setWeek}
          routines={routines}
        />
      )}

      {screen === "routines" && (
        <RoutinesScreen
          routines={routines}
          setRoutines={setRoutines}
        />
      )}

      {screen === "home" && (
        <HomeScreen
          lists={lists}
          setLists={setLists}
          openList={setActiveListId}
        />
      )}

      <BottomNav
        screen={screen}
        setScreen={setScreen}
      />
    </div>
  );
}