export default function BottomNav({ screen, setScreen }) {
  return (
    <div style={styles.nav}>
      
      {/* WEEK FIRST (now default + primary) */}
      <button
        onClick={() => setScreen("week")}
        style={{
          ...styles.button,
          opacity: screen === "week" ? 1 : 0.5
        }}
      >
        📅 Week
      </button>

      {/* TEMPLATES SECOND (renamed Home) */}
      <button
        onClick={() => setScreen("templates")}
        style={{
          ...styles.button,
          opacity: screen === "templates" ? 1 : 0.5
        }}
      >
        📁 Templates
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
    height: 60,
    borderTop: "1px solid #eee",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    background: "white"
  },
  button: {
    background: "none",
    border: "none",
    fontSize: 14
  }
};