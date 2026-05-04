import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

/* =========================
   📋 TASK ITEM (CHECKBOX ONLY)
========================= */
function TaskItem({ task, onToggle }) {
  return (
    <div
      style={{
        background: "white",
        padding: "14px",
        borderRadius: 12,
        margin: "6px 0",
        display: "flex",
        alignItems: "center",
        gap: 12
      }}
    >
      {/* ☑️ Large checkbox */}
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
        style={{
          width: 22,
          height: 22,
          accentColor: "#007aff"
        }}
      />

      {/* Text */}
      <span
        style={{
          fontSize: 16,
          color: task.done ? "#8e8e93" : "#000",
          textDecoration: task.done ? "line-through" : "none",
          opacity: task.done ? 0.6 : 1
        }}
      >
        {task.text}
      </span>
    </div>
  );
}

/* =========================
   📱 APP
========================= */
export default function App() {
  const [app, setApp] = useState({
    routines: {},
    current: null
  });

  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newListName, setNewListName] = useState("");

  /* =========================
     🧠 PRESET ROUTINES
  ========================= */
  const defaultRoutines = {
    morning: {
      name: "Morning Routine",
      tasks: [
        { id: "m1", text: "Cleanser", done: false },
        { id: "m2", text: "Moisturiser", done: false },
        { id: "m3", text: "Sunscreen", done: false }
      ]
    },
    night: {
      name: "Night Routine",
      tasks: [
        { id: "n1", text: "Cleanser", done: false },
        { id: "n2", text: "Retinol", done: false },
        { id: "n3", text: "Moisturiser", done: false }
      ]
    },
    shopping: {
      name: "Shopping List",
      tasks: [
        { id: "s1", text: "Milk", done: false },
        { id: "s2", text: "Bread", done: false }
      ]
    }
  };

  /* 💾 LOAD */
  useEffect(() => {
    const saved = localStorage.getItem("app");

    if (saved) {
      setApp(JSON.parse(saved));
    } else {
      setApp({
        routines: defaultRoutines,
        current: null
      });
    }
  }, []);

  /* 💾 SAVE */
  useEffect(() => {
    localStorage.setItem("app", JSON.stringify(app));
  }, [app]);

  /* =========================
     🔁 REORDER TASKS
  ========================= */
  const moveTask = (from, to) => {
    const tasks = [...routine.tasks];
    const [item] = tasks.splice(from, 1);
    tasks.splice(to, 0, item);

    setApp({
      ...app,
      routines: {
        ...app.routines,
        [app.current]: {
          ...routine,
          tasks
        }
      }
    });
  };

  /* =========================
     🏠 HOME SCREEN
  ========================= */
  if (!app.current) {
    return (
      <div>
        <div className="header">Reminders</div>

        <div className="section-title">My Lists</div>

        <div style={{ padding: 12 }}>
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

        {/* ➕ New List Button */}
        <button
          onClick={() => setShowModal(true)}
          style={{
            position: "fixed",
            bottom: 20,
            left: 20,
            right: 20,
            borderRadius: 14,
            padding: 14,
            background: "#007aff",
            color: "white",
            border: "none",
            fontSize: 16,
            fontWeight: 600
          }}
        >
          + New List
        </button>

        {/* 🧾 Modal */}
        {showModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: "flex-end"
            }}
            onClick={() => setShowModal(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                background: "#f2f2f7",
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                padding: 16
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 600 }}>
                New List
              </div>

              <input
                placeholder="List name"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
              />

              <button
                onClick={() => {
                  if (!newListName.trim()) return;

                  const id = Date.now().toString();

                  setApp({
                    ...app,
                    routines: {
                      ...app.routines,
                      [id]: {
                        name: newListName,
                        tasks: []
                      }
                    }
                  });

                  setNewListName("");
                  setShowModal(false);
                }}
              >
                Create
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* =========================
     📋 ROUTINE VIEW
  ========================= */
  const routine = app.routines[app.current];

  const addTask = () => {
    if (!input.trim()) return;

    setApp({
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
    });

    setInput("");
  };

  const toggleTask = (id) => {
    const updated = routine.tasks.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    );

    setApp({
      ...app,
      routines: {
        ...app.routines,
        [app.current]: {
          ...routine,
          tasks: updated
        }
      }
    });
  };

  return (
    <div>
      <div className="header" onClick={() => setApp({ ...app, current: null })}>
        ← {routine.name}
      </div>

      <div className="section-title">Tasks</div>

      {/* Tasks */}
      <div style={{ padding: 12 }}>
        {routine.tasks.map((task, index) => (
          <motion.div
            key={task.id}
            draggable
            onDragEnd={(e, info) => {
              const direction =
                info.offset.y > 50 ? 1 :
                info.offset.y < -50 ? -1 : 0;

              const newIndex = Math.max(
                0,
                Math.min(routine.tasks.length - 1, index + direction)
              );

              if (newIndex !== index) {
                moveTask(index, newIndex);
              }
            }}
          >
            <TaskItem task={task} onToggle={toggleTask} />
          </motion.div>
        ))}
      </div>

      {/* Input */}
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