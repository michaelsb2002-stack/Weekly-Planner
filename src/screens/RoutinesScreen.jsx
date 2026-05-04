export default function RoutinesScreen({
  routines,
  setRoutines
}) {

  // CREATE ROUTINE
  const addRoutine = () => {
    const name = prompt("Routine name:");
    if (!name) return;

    const id = Date.now().toString();

    setRoutines(prev => ({
      ...prev,
      [id]: {
        name,
        subroutines: {}
      }
    }));
  };

  // DELETE ROUTINE
  const deleteRoutine = (id) => {
    const copy = { ...routines };
    delete copy[id];
    setRoutines(copy);
  };

  return (
    <div style={{ padding: 16 }}>
      <h1>Routines</h1>

      <button onClick={addRoutine}>
        + New Routine
      </button>

      {Object.entries(routines).map(([id, r]) => (
        <div
          key={id}
          style={{
            marginTop: 10,
            padding: 12,
            border: "1px solid #eee",
            borderRadius: 10
          }}
        >
          <strong>{r.name}</strong>

          <button
            onClick={() => deleteRoutine(id)}
            style={{ marginLeft: 10 }}
          >
            Delete
          </button>

          {/* SUBROUTINES */}
          <div style={{ marginTop: 8 }}>
            {Object.values(r.subroutines).map((s, i) => (
              <div key={i} style={{ marginLeft: 10 }}>
                • {s.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}