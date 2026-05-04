export default function BottomNav({ screen, setScreen }) {
  return (
    <div style={styles.nav}>

      <button
        onClick={() => setScreen("week")}
        style={{
          ...styles.button,
          opacity: screen === "week" ? 1 : 0.5
        }}
      >
        📅 Week
      </button>

      <button
        onClick={() => setScreen("routines")}
        style={{
          ...styles.button,
          opacity: screen === "routines" ? 1 : 0.5
        }}
      >
        🔁 Routines
      </button>

      <button
        onClick={() => setScreen("home")}
        style={{
          ...styles.button,
          opacity: screen === "home" ? 1 : 0.5
        }}
      >
        📁 Lists
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
    fontSize: 13
  }
};