export const getWeekDates = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  
  // Monday = 1, Sunday = 0 -> adjust so Monday is first
  const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const monday = new Date(today.setDate(diff));
  
  const weekDates = {};
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  
  days.forEach((day, index) => {
    const date = new Date(monday);
    date.setDate(date.getDate() + index);
    weekDates[day] = {
      name: day.charAt(0).toUpperCase() + day.slice(1),
      date: date.toLocaleDateString("en-US", { 
        month: "short", 
        day: "numeric" 
      })
    };
  });
  
  return weekDates;
};
