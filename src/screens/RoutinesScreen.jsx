import { useState } from "react";

export default function RoutinesScreen({
  routines,
  setRoutines
}) {
  const [expanded, setExpanded] = useState({});

  // CREATE ROUTINE
  const addRoutine = () => {
    const name = prompt("Routine name:");
    if (!name) return;

    const id = Date.now().toString();

    setRoutines(prev => ({
      ...prev,
      [id]: {
        name,
        tasks: []
      }
    }));
  };

  // DELETE ROUTINE
  const deleteRoutine = (id) => {
    const copy = { ...routines };
    delete copy[id];
    setRoutines(copy);
  };

  // ADD TASK
  const addTask = (routineId) => {
    const taskText = prompt("Task:");
    if (!taskText) return;

    setRoutines(prev => ({
      ...prev,
      [routineId]: {
        ...prev[routineId],
        tasks: [...prev[routineId].tasks, taskText]
      }
    }));
  };

  // EDIT TASK
  const editTask = (routineId, taskIndex, newText) => {
    setRoutines(prev => ({
      ...prev,
      [routineId]: {
        ...prev[routineId],
        tasks: prev[routineId].tasks.map((t, i) =>
          i === taskIndex ? newText : t
        )
      }
    }));
  };

  // DELETE TASK
  const deleteTask = (routineId, taskIndex) => {
    setRoutines(prev => ({
      ...prev,
      [routineId]: {
        ...prev[routineId],
        tasks: prev[routineId].tasks.filter((_, i) => i !== taskIndex)
      }
    }));
  };

  const toggleExpanded = (routineId) => {
    setExpanded(prev => ({
      ...prev,
      [routineId]: !prev[routineId]
    }));
  };

  return (
    <div style={{ padding: "16px 12px", background: "var(--bg)" }}>
      <h1 style={{
        fontSize: 32,
        fontWeight: "700",
        margin: "24px 0 16px 0",
        color: "var(--text)"
      }}>
        Routines
      </h1>

      <button
        onClick={addRoutine}
        style={{
          marginBottom: 16,
          background: "var(--accent)",
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: 8,
          cursor: "pointer",
          fontSize: 15,
          fontWeight: "600",
          fontFamily: "inherit",
          width: "100%"
        }}
      >
        + New Routine
      </button>

      {Object.entries(routines).map(([routineId, routine]) => {
        const isExpanded = expanded[routineId];

        return (
          <div
            key={routineId}
            style={{
              marginBottom: 16,
              borderRadius: 12,
              background: "var(--card-bg)",
              border: "1px solid var(--border)",
              overflow: "hidden",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            {/* ROUTINE HEADER */}
            <div
              onClick={() => toggleExpanded(routineId)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                userSelect: "none",
                padding: "16px",
                borderBottom: isExpanded ? "1px solid var(--border)" : "none"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 18, color: "var(--text-secondary)" }}>
                  {isExpanded ? "▼" : "▶"}
                </span>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: "600", color: "var(--text)" }}>
                    {routine.name}
                  </h3>
                  <p style={{ margin: "4px 0 0 0", fontSize: 13, color: "var(--text-secondary)" }}>
                    {routine.tasks.length} task{routine.tasks.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteRoutine(routineId);
                }}
                style={{
                  background: "var(--red)",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: "600",
                  fontFamily: "inherit"
                }}
              >
                Delete
              </button>
            </div>

            {/* TASKS */}
            {isExpanded && (
              <div>
                {routine.tasks.length > 0 ? (
                  routine.tasks.map((task, taskIndex) => (
                    <div
                      key={taskIndex}
                      style={{
                        display: "flex",
                        gap: 12,
                        padding: "12px 16px",
                        borderBottom: "1px solid var(--border)",
                        alignItems: "center"
                      }}
                    >
                      <input
                        type="text"
                        value={task}
                        onChange={(e) =>
                          editTask(routineId, taskIndex, e.target.value)
                        }
                        style={{
                          flex: 1,
                          padding: "10px 12px",
                          border: "1px solid var(--border)",
                          borderRadius: 6,
                          fontSize: 15,
                          fontFamily: "inherit",
                          background: "var(--bg)",
                          color: "var(--text)"
                        }}
                      />
                      <button
                        onClick={() => deleteTask(routineId, taskIndex)}
                        style={{
                          background: "var(--red)",
                          color: "white",
                          border: "none",
                          padding: "8px 12px",
                          borderRadius: 6,
                          cursor: "pointer",
                          fontSize: 13,
                          fontWeight: "600",
                          fontFamily: "inherit",
                          whiteSpace: "nowrap"
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))
                ) : (
                  <p style={{
                    color: "var(--text-secondary)",
                    fontSize: 15,
                    margin: "16px",
                    textAlign: "center"
                  }}>
                    No tasks yet
                  </p>
                )}

                <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border)" }}>
                  <button
                    onClick={() => addTask(routineId)}
                    style={{
                      background: "var(--green)",
                      color: "white",
                      border: "none",
                      padding: "10px 16px",
                      borderRadius: 6,
                      cursor: "pointer",
                      fontSize: 15,
                      fontWeight: "600",
                      fontFamily: "inherit",
                      width: "100%"
                    }}
                  >
                    + Add Task
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}