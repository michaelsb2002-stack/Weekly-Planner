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
    <div style={{ padding: "16px 12px", background: "var(--bg)" }}>
      <h1 style={{
        fontSize: 32,
        fontWeight: "700",
        margin: "24px 0 16px 0",
        color: "var(--text)"
      }}>
        Lists
      </h1>

      <button
        onClick={addList}
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
        + New List
      </button>

      {Object.entries(lists).map(([id, list]) => (
        <div
          key={id}
          onClick={() => openList(id)}
          style={{
            marginBottom: 12,
            padding: 16,
            background: "var(--card-bg)",
            borderRadius: 12,
            border: "1px solid var(--border)",
            cursor: "pointer",
            boxShadow: "var(--shadow-sm)",
            transition: "background 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0, 122, 255, 0.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--card-bg)";
          }}
        >
          <h3 style={{
            margin: "0 0 8px 0",
            fontSize: 16,
            fontWeight: "600",
            color: "var(--text)"
          }}>
            {list.name}
          </h3>

          <div style={{
            fontSize: 13,
            color: "var(--text-secondary)"
          }}>
            {list.tasks.length} task{list.tasks.length !== 1 ? 's' : ''}
          </div>
        </div>
      ))}
    </div>
  );
}