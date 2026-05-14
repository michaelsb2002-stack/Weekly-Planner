export const getMonday = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const getWeekKey = (date) => getMonday(date).toISOString();

export const getWeekDates = (startDate = new Date()) => {
  const today = new Date(startDate);
  const dayOfWeek = today.getDay();
  
  // Monday = 1, Sunday = 0 -> adjust so Monday is first
  const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const monday = new Date(today.setDate(diff));
  
  const weekDates = {};
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  
  days.forEach((day, index) => {
    const date = new Date(monday);
    date.setDate(date.getDate() + index);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const dayNum = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    weekDates[day] = {
      name: day.charAt(0).toUpperCase() + day.slice(1),
      date: `${dayNum}/${month}/${year}`
    };
  });
  
  return weekDates;
};
