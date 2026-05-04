export default function WeekScreen({
  lists,
  week,
  setWeek
}) {
  const days = [
    "monday","tuesday","wednesday",
    "thursday","friday","saturday","sunday"
  ];

  const assignList = (day, listId) => {
    setWeek(prev => ({
      ...prev,
      [day]: { listId }
    }));
  };

  return (
    <div style={{ padding: 16 }}>
      <h1>This Week</h1>

      {days.map(day => {
        // 🧠 SAFE ACCESS (prevents crash)
        const selected = week?.[day]?.listId || "";

        const list = lists?.[selected];

        return (
          <div
            key={day}
            style={{
              marginBottom: 14,
              padding: 12,
              borderRadius: 12,
              background: "#f9f9f9"
            }}
          >
            <strong>{day}</strong>

            <select
              value={selected}
              onChange={(e) =>
                assignList(day, e.target.value)
              }
            >
              <option value="">None</option>

              {Object.entries(lists || {}).map(([id, l]) => (
                <option key={id} value={id}>
                  {l.name}
                </option>
              ))}
            </select>

            {list && (
              <div style={{ marginTop: 8 }}>
                {list.tasks?.map(t => (
                  <div key={t.id}>
                    • {t.text}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}