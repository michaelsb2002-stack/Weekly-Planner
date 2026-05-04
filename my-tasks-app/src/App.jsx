import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./App.css";

export default function App() {
  const [app, setApp] = useState({
    routines: {},
    currentRoutine: null
  });

  // LOAD
  useEffect(() => {
    const saved = localStorage.getItem("appData");
    if (saved) setApp(JSON.parse(saved));
    else {
      setApp({
        routines: {
          morning: {
            name: "Morning Skincare",
            tasks: [{ id: "1", text: "Cleanser", done: false }]
          }
        },
        currentRoutine: null
      });
    }
  }, []);

  // SAVE
  useEffect(() => {
    localStorage.setItem("appData", JSON.stringify(app));
  }, [app]);

  const createRoutine = () => {
    const name = prompt("Routine name?");
    if (!name) return;

    const id = Date.now().toString();

    setApp({
      ...app,
      routines: {
        ...app.routines,
        [id]: { name, tasks: [] }
      },
      currentRoutine: id
    });
  };

  const addTask = (text) => {
    if (!text.trim()) return;

    const routine = app.routines[app.currentRoutine];

    const newTask = {
      id: Date.now().toString(),
      text,
      done: false
    };

    setApp({
      ...app,
      routines: {
        ...app.routines,
        [app.currentRoutine]: {
          ...routine,
          tasks: [...routine.tasks, newTask]
        }
      }
    });
  };

  const deleteTask = (id) => {
    const routine = app.routines[app.currentRoutine];

    setApp({
      ...app,
      routines: {
        ...app.routines,
        [app.currentRoutine]: {
          ...routine,
          tasks: routine.tasks.filter(t => t.id !== id)
        }
      }
    });
  };

  const toggleTask = (id) => {
    const routine = app.routines[app.currentRoutine];

    const tasks = routine.tasks.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    );

    setApp({
      ...app,
      routines: {
        ...app.routines,
        [app.currentRoutine]: { ...routine, tasks }
      }
    });
  };

  // DRAG END
  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const routine = app.routines[app.currentRoutine];
      const oldIndex = routine.tasks.findIndex(t => t.id === active.id);
      const newIndex = routine.tasks.findIndex(t => t.id === over.id);

      const newTasks = arrayMove(routine.tasks, oldIndex, newIndex);

      setApp({
        ...app,
        routines: {
          ...app.routines,
          [app.currentRoutine]: {
            ...routine,
            tasks: newTasks
          }
        }
      });
    }
  }

  // HOME
  if (!app.currentRoutine) {
    return (
      <div className="container">
        <h2>Routines</h2>

        {Object.entries(app.routines).map(([id, r]) => (
          <div
            key={id}
            className="card"
            onClick={() =>
              setApp({ ...app, currentRoutine: id })
            }
          >
            <span>📝 {r.name}</span>
            <span>{r.tasks.length}</span>
          </div>
        ))}

        <button onClick={createRoutine}>+ New Routine</button>
      </div>
    );
  }

  const routine = app.routines[app.currentRoutine];

  return (
    <div className="container">
      <h2 onClick={() => setApp({ ...app, currentRoutine: null })}>
        ← {routine.name}
      </h2>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={routine.tasks.map(t => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {routine.tasks.map(task => (
            <SortableItem
              key={task.id}
              task={task}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
            />
          ))}
        </SortableContext>
      </DndContext>

      <input
        placeholder="New task"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask(e.target.value);
            e.target.value = "";
          }
        }}
      />
    </div>
  );
}

// SORTABLE ITEM
function SortableItem({ task, toggleTask, deleteTask }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className="task"
      drag="x"
      dragConstraints={{ left: -100, right: 0 }}
      onDragEnd={(e, info) => {
        if (info.offset.x < -80) {
          deleteTask(task.id);
        }
      }}
      {...attributes}
      {...listeners}
    >
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => toggleTask(task.id)}
      />
      <span>{task.text}</span>
    </motion.div>
  );
}