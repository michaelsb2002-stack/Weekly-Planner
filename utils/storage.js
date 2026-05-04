export const saveData = (data) => {
  localStorage.setItem("planner", JSON.stringify(data));
};

export const loadData = () => {
  const saved = localStorage.getItem("planner");
  if (!saved) return null;

  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
};