export default function BottomNav({ screen, setScreen }) {
  return (
    <div style={styles.nav}>
      <button
        onClick={() => setScreen("week")}
        style={{
          ...styles.button,
          ...styles.tabButton,
          borderTopColor: screen === "week" ? "var(--accent)" : "transparent",
          color: screen === "week" ? "var(--accent)" : "var(--text-secondary)"
        }}
      >
        <div style={{ fontSize: 24, marginBottom: 4 }}>📅</div>
        <div style={{ fontSize: 11, fontWeight: 500 }}>Week</div>
      </button>

      <button
        onClick={() => setScreen("routines")}
        style={{
          ...styles.button,
          ...styles.tabButton,
          borderTopColor: screen === "routines" ? "var(--accent)" : "transparent",
          color: screen === "routines" ? "var(--accent)" : "var(--text-secondary)"
        }}
      >
        <div style={{ fontSize: 24, marginBottom: 4 }}>🔁</div>
        <div style={{ fontSize: 11, fontWeight: 500 }}>Routines</div>
      </button>

      <button
        onClick={() => setScreen("home")}
        style={{
          ...styles.button,
          ...styles.tabButton,
          borderTopColor: screen === "home" ? "var(--accent)" : "transparent",
          color: screen === "home" ? "var(--accent)" : "var(--text-secondary)"
        }}
      >
        <div style={{ fontSize: 24, marginBottom: 4 }}>📁</div>
        <div style={{ fontSize: 11, fontWeight: 500 }}>Lists</div>
      </button>
    </div>
  );
}

const styles = {
  nav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    maxWidth: 600,
    margin: "0 auto",
    borderTop: "1px solid var(--border)",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-start",
    background: "var(--card-bg)",
    boxShadow: "0 -1px 3px rgba(0, 0, 0, 0.1)"
  },
  button: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 8,
    fontSize: 12,
    transition: "color 0.2s",
    flex: 1,
    fontFamily: "inherit"
  },
  tabButton: {
    borderTop: "3px solid transparent",
    paddingTop: 5
  }
};