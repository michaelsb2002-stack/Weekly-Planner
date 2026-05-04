import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

/* =========================
   🍎 SWIPEABLE TASK ITEM
========================= */
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div style={{ position: "relative", margin: "6px 0", overflow: "hidden", borderRadius: 12 }}>

      {/* 🔴 iOS-style delete background */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 100,
          background: "#ff3b30",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: 600
        }}
      >
        Delete
      </div>

      {/* 🧲 Swipe layer */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -120, right: 0 }}
        onDragEnd={(e, info) => {
          if (info.offset.x < -80) {
            onDelete(task.id);
          }
        }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: "tween", duration: 0.15 }}
        style={{
          background: "white",
          padding: "14px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          borderRadius: 12,
          position: "relative"
        }}
      >
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
        />

        <span
          style={{
            textDecoration: task.done ? "line-through" : "none",
            color: task.done ? "#8e8e93" : "#000"
          }}
        >
          {task.text}
        </span>
      </motion.div>
    </div>
  );
}

/* =========================
   📱 MAIN APP
========================= */
export default function App() {
  const [app, setApp] = useState({
    routines: {},
    current: null
  });

  const [input, setInput] = useState("");

  /* 💾 LOAD */
  useEffect(() => {
    const saved = localStorage.getItem("app");

    if (saved) {
      setApp(JSON.parse(saved));
    } else {
      const initial = {
        routines: {
          morning: {
            name: "Morning Routine",
            tasks: [
              { id: "1", text: "Cleanser", done: false },
              { id: "2", text: "Moisturiser", done: false }
            ]
          },
          chores: {
            name: "House Chores",
            tasks: [
              { id: "3", text: "Wash dishes", done: false }
            ]
          }
        },
        current: null
      };

      setApp(initial);
    }
  }, []);

  /* 💾 SAVE */
  useEffect(() => {
    localStorage.setItem("app", JSON.stringify(app));
  }, [app]);

  /* =========================
     🏠 HOME SCREEN (Apple style)
  ========================= */
  if (!app.current) {
    return (
      <div>
        <div className="header">Reminders</div>

        <div className="section-title">My Lists</div>

        <div className="list">
          {Object.entries(app.routines).map(([id, r]) => (
            <div
              key={id}
              className="card"
              onClick={() => setApp({ ...app, current: id })}
            >
              <div style={{ fontWeight: 600 }}>{r.name}</div>
              <div style={{ color: "#8e8e93" }}>{r.tasks.length}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* =========================
     📋 ROUTINE VIEW
  ========================= */
  const routine = app.routines[app.current];

  const addTask = () => {
    if (!input.trim()) return;

    const updated = {
      ...app,
      routines: {
        ...app.routines,
        [app.current]: {
          ...routine,
          tasks: [
            ...routine.tasks,
            {
              id: Date.now().toString(),
              text: input,
              done: false
            }
          ]
        }
      }
    };

    setApp(updated);
    setInput("");
  };

  const toggleTask = (id) => {
    const updatedTasks = routine.tasks.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    );

    setApp({
      ...app,
      routines: {
        ...app.routines,
        [app.current]: {
          ...routine,
          tasks: updatedTasks
        }
      }
    });
  };

  const deleteTask = (id) => {
    const filtered = routine.tasks.filter(t => t.id !== id);

    setApp({
      ...app,
      routines: {
        ...app.routines,
        [app.current]: {
          ...routine,
          tasks: filtered
        }
      }
    });
  };

  return (
    <div>
      {/* 🍎 Header */}
      <div className="header" onClick={() => setApp({ ...app, current: null })}>
        ← {routine.name}
      </div>

      <div className="section-title">Tasks</div>

      {/* 📋 Tasks */}
      <div className="list">
        {routine.tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </div>

      {/* ➕ Add task */}
      <input
        placeholder="New task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTask()}
      />

      <button onClick={addTask}>Add Task</button>
    </div>
  );
}