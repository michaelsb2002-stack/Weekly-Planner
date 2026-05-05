import { useState, useEffect } from "react";
import { getWeekDates } from "../utils/dateUtils";

export default function WeekScreen({
  week,
  setWeek,
  routines,
  getRoutineTasks
}) {
  const weekDates = getWeekDates();
  const days = Object.keys(weekDates);
  const [newTaskInput, setNewTaskInput] = useState({});
  const [deletionMode, setDeletionMode] = useState({});
  const [selectedForDeletion, setSelectedForDeletion] = useState({});

  // Select routine for a day
  const selectRoutine = (day, routineId) => {
    const routine = routines[routineId];
    const tasks = getRoutineTasks(routine);

    setWeek(prev => ({
      ...prev,
      [day]: {
        routineId,
        tasks
      }
    }));

    // Clear deletion state when routine changes
    setDeletionMode(prev => ({
      ...prev,
      [day]: false
    }));
    setSelectedForDeletion(prev => ({
      ...prev,
      [day]: []
    }));
  };

  // Toggle task completion
  const toggleTaskComplete = (day, taskId) => {
    setWeek(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        tasks: prev[day].tasks.map(t =>
          t.id === taskId ? { ...t, completed: !t.completed } : t
        )
      }
    }));
  };

  // Edit task text
  const editTaskText = (day, taskId, newText) => {
    setWeek(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        tasks: prev[day].tasks.map(t =>
          t.id === taskId ? { ...t, text: newText } : t
        )
      }
    }));
  };

  // Toggle task selection for deletion
  const toggleTaskSelection = (day, taskId) => {
    setSelectedForDeletion(prev => ({
      ...prev,
      [day]: prev[day]?.includes(taskId)
        ? prev[day].filter(id => id !== taskId)
        : [...(prev[day] || []), taskId]
    }));
  };

  // Enter deletion mode
  const enterDeletionMode = (day) => {
    setDeletionMode(prev => ({
      ...prev,
      [day]: true
    }));
  };

  // Cancel deletion mode
  const cancelDeletion = (day) => {
    setDeletionMode(prev => ({
      ...prev,
      [day]: false
    }));
    setSelectedForDeletion(prev => ({
      ...prev,
      [day]: []
    }));
  };

  // Confirm and delete selected tasks
  const confirmDeletion = (day) => {
    const toDelete = selectedForDeletion[day] || [];
    
    setWeek(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        tasks: prev[day].tasks.filter(t => !toDelete.includes(t.id))
      }
    }));

    setDeletionMode(prev => ({
      ...prev,
      [day]: false
    }));
    setSelectedForDeletion(prev => ({
      ...prev,
      [day]: []
    }));
  };

  // Add custom task
  const addCustomTask = (day) => {
    const taskText = newTaskInput[day];
    if (!taskText || taskText.trim() === "") return;

    const newTask = {
      id: `custom-${Date.now()}`,
      text: taskText,
      completed: false
    };

    setWeek(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        tasks: [...prev[day].tasks, newTask]
      }
    }));

    setNewTaskInput(prev => ({
      ...prev,
      [day]: ""
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
        This Week
      </h1>

      {days.map(day => {
        const dayData = week[day];
        const dateInfo = weekDates[day];
        const isInDeletionMode = deletionMode[day] || false;

        return (
          <div
            key={day}
            style={{
              marginBottom: 16,
              padding: 0,
              borderRadius: 12,
              background: "var(--card-bg)",
              border: "1px solid var(--border)",
              overflow: "hidden",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            {/* Day Header */}
            <div style={{
              padding: "14px 16px",
              borderBottom: "1px solid var(--border)",
              background: "var(--card-bg)"
            }}>
              <h3 style={{
                margin: 0,
                fontSize: 16,
                fontWeight: "600",
                color: "var(--text)"
              }}>
                {dateInfo.name}
              </h3>
              <p style={{
                margin: "4px 0 0 0",
                fontSize: 13,
                color: "var(--text-secondary)"
              }}>
                {dateInfo.date}
              </p>
            </div>

            {/* Routine Dropdown */}
            <select
              value={dayData.routineId || ""}
              onChange={(e) => selectRoutine(day, e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderBottom: "1px solid var(--border)",
                borderRadius: 0,
                border: "none",
                fontSize: 15,
                background: "var(--card-bg)",
                color: "var(--text)",
                fontFamily: "inherit",
                cursor: "pointer",
                appearance: "none",
                paddingRight: "32px",
                backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
                backgroundSize: "20px"
              }}
            >
              <option value="">Select a routine...</option>
              {Object.entries(routines).map(([id, routine]) => (
                <option key={id} value={id}>
                  {routine.name}
                </option>
              ))}
            </select>

            {/* Tasks */}
            <div style={{ padding: "8px 0" }}>
              {dayData.tasks && dayData.tasks.length > 0 ? (
                dayData.tasks.map((task, idx) => {
                  const isSelected = (selectedForDeletion[day] || []).includes(task.id);

                  return (
                    <div
                      key={task.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "12px 16px",
                        borderBottom: idx === dayData.tasks.length - 1 ? "none" : "1px solid var(--border)",
                        background: isSelected ? "var(--accent-light)" : "var(--card-bg)"
                      }}
                    >
                      {/* Checkbox */}
                      {isInDeletionMode && (
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleTaskSelection(day, task.id)}
                          style={{
                            width: 20,
                            height: 20,
                            cursor: "pointer",
                            flexShrink: 0,
                            accentColor: "var(--accent)"
                          }}
                        />
                      )}

                      {!isInDeletionMode && (
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTaskComplete(day, task.id)}
                          style={{
                            width: 20,
                            height: 20,
                            cursor: "pointer",
                            flexShrink: 0,
                            accentColor: "var(--accent)"
                          }}
                        />
                      )}

                      {/* Task Text */}
                      <input
                        type="text"
                        value={task.text}
                        onChange={(e) =>
                          editTaskText(day, task.id, e.target.value)
                        }
                        disabled={isInDeletionMode}
                        style={{
                          flex: 1,
                          border: "none",
                          background: "transparent",
                          fontSize: 15,
                          textDecoration: task.completed ? "line-through" : "none",
                          color: task.completed ? "var(--text-secondary)" : "var(--text)",
                          fontFamily: "inherit",
                          cursor: isInDeletionMode ? "not-allowed" : "text",
                          opacity: isInDeletionMode ? 0.6 : 1
                        }}
                      />
                    </div>
                  );
                })
              ) : (
                <p style={{
                  color: "var(--text-secondary)",
                  fontSize: 15,
                  margin: "16px",
                  textAlign: "center"
                }}>
                  Select a routine to see tasks
                </p>
              )}
            </div>

            {/* Bottom Actions */}
            <div style={{
              display: "flex",
              gap: 8,
              padding: "12px 16px",
              borderTop: "1px solid var(--border)",
              background: "var(--card-bg)",
              alignItems: "center"
            }}>
              {!isInDeletionMode ? (
                <>
                  <input
                    type="text"
                    placeholder="Add a task..."
                    value={newTaskInput[day] || ""}
                    onChange={(e) =>
                      setNewTaskInput(prev => ({
                        ...prev,
                        [day]: e.target.value
                      }))
                    }
                    onKeyPress={(e) => {
                      if (e.key === "Enter") addCustomTask(day);
                    }}
                    style={{
                      flex: 1,
                      padding: "10px 12px",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      fontSize: 15,
                      fontFamily: "inherit",
                      background: "var(--bg)",
                      color: "var(--text)"
                    }}
                  />
                  <button
                    onClick={() => addCustomTask(day)}
                    style={{
                      background: "var(--green)",
                      color: "white",
                      border: "none",
                      padding: "10px 16px",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontSize: 14,
                      fontWeight: "600",
                      fontFamily: "inherit",
                      whiteSpace: "nowrap"
                    }}
                  >
                    + Add
                  </button>
                  <button
                    onClick={() => enterDeletionMode(day)}
                    style={{
                      background: "var(--red)",
                      color: "white",
                      border: "none",
                      padding: "10px 16px",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontSize: 14,
                      fontWeight: "600",
                      fontFamily: "inherit",
                      whiteSpace: "nowrap"
                    }}
                  >
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <div style={{ flex: 1 }} />
                  <button
                    onClick={() => cancelDeletion(day)}
                    style={{
                      background: "var(--gray)",
                      color: "white",
                      border: "none",
                      padding: "10px 16px",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontSize: 14,
                      fontWeight: "600",
                      fontFamily: "inherit",
                      whiteSpace: "nowrap"
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => confirmDeletion(day)}
                    style={{
                      background: "var(--red)",
                      color: "white",
                      border: "none",
                      padding: "10px 16px",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontSize: 14,
                      fontWeight: "600",
                      fontFamily: "inherit",
                      whiteSpace: "nowrap"
                    }}
                  >
                    Confirm
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}