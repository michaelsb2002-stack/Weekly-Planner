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

// Get all tasks from a routine
const getRoutineTasks = (routine, prefix = "", routineId = null) => {
  if (!routine || !routine.tasks) return [];
  
  return routine.tasks.map((task, idx) => ({
    id: `${prefix}-${idx}`,
    text: task,
    completed: false,
    sourceRoutineId: routineId
  }));
};

const createEmptyWeek = () => {
  const week = {};
  days.forEach(d => {
    week[d] = {
      routineIds: [],
      tasks: []
    };
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
      const loadedWeek = parsed.week || createEmptyWeek();
      const normalizedWeek = Object.fromEntries(
        Object.entries(loadedWeek).map(([day, data]) => [
          day,
          {
            routineIds: data?.routineIds || (data?.routineId ? [data.routineId] : []),
            tasks: data?.tasks || []
          }
        ])
      );

      setLists(parsed.lists || {});
      setRoutines(parsed.routines || defaultRoutines);
      setWeek(normalizedWeek);
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
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      maxWidth: "600px",
      margin: "0 auto",
      background: "var(--bg)",
      overflow: "hidden"
    }}>
      <div style={{
        flex: 1,
        overflowY: "auto",
        overscrollBehavior: "contain",
        paddingBottom: 70
      }}>
        {screen === "week" && (
          <WeekScreen
            week={week}
            setWeek={setWeek}
            routines={routines}
            getRoutineTasks={getRoutineTasks}
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
      </div>

      <BottomNav
        screen={screen}
        setScreen={setScreen}
      />
    </div>
  );
}