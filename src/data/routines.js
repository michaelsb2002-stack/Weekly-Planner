export const defaultRoutines = {
  work_home: {
    name: "Work (Home)",
    subroutines: {
      morning: {
        name: "Morning Setup",
        tasks: ["Coffee", "Check emails", "Plan day"]
      },
      focus: {
        name: "Deep Work",
        tasks: ["2 focus sessions", "No distractions"]
      }
    }
  },

  work_office: {
    name: "Work (Office)",
    subroutines: {
      commute: {
        name: "Commute",
        tasks: ["Leave on time", "Check calendar"]
      },
      office: {
        name: "Office Work",
        tasks: ["Standup meeting", "Project tasks"]
      }
    }
  },

  day_off: {
    name: "Day Off",
    subroutines: {
      rest: {
        name: "Rest",
        tasks: ["Sleep in", "Relax"]
      },
      reset: {
        name: "Reset",
        tasks: ["Clean room", "Plan week"]
      }
    }
  }
};