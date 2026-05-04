export default function HomeScreen({
  lists,
  setLists,
  openList
}) {
  const addList = () => {
    const name = prompt("List name:");
    if (!name) return;

    const id = Date.now().toString();

    setLists(prev => ({
      ...prev,
      [id]: {
        name,
        tasks: []
      }
    }));
  };

  return (
    <div style={{ padding: 16 }}>
      <h1>Lists</h1>

      <button onClick={addList}>
        + New List
      </button>

      {Object.entries(lists).map(([id, list]) => (
        <div
          key={id}
          onClick={() => openList(id)}   // 👈 THIS IS THE KEY FIX
          style={{
            padding: 12,
            marginTop: 10,
            border: "1px solid #eee",
            borderRadius: 10,
            cursor: "pointer"
          }}
        >
          <strong>{list.name}</strong>

          <div style={{ fontSize: 12, color: "#666" }}>
            {list.tasks.length} tasks
          </div>
        </div>
      ))}
    </div>
  );
}