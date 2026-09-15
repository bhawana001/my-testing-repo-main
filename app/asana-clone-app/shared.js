"use client";
// Asanah (Asana) clone: tasks that notify the person they are assigned to, a
// board whose moves are recorded in the task's history, subtasks and a real
// dependency that refuses completion while the blocker is open, and a My Tasks
// view grouped by due date rather than by hand.
import { createStore } from "../clones/kit/store";

export const BRAND = { name: "Asanah", slug: "asana", mark: "⬤", home: "/asana-clone-app",
  accent: "#f06a6a", accentText: "#fff", bg: "#fff7f6" };
export const BASE = "/asana-clone-app";

/** Fixed "today" so the My Tasks grouping is the same on every run. */
export const TODAY = "2026-09-16";

export const ME = "Priya Nair";
export const PEOPLE = [ME, "Tom Alvarez", "Mira Shah", "Dan Okafor"];
export const SECTIONS = ["To do", "In progress", "Blocked", "Done"];

const SEED = {
  project: "Launch — Acme Robotics",
  tasks: [
    { id: "t1", name: "Write the launch note", assignee: "Priya Nair", due: "2026-09-16",
      section: "To do", done: false, subtasks: [], blockedBy: null,
      history: [{ at: "09:02", text: "Created in To do" }] },
    { id: "t2", name: "Sign off the pricing page", assignee: "Mira Shah", due: "2026-09-14",
      section: "In progress", done: false, subtasks: [], blockedBy: null,
      history: [{ at: "08:40", text: "Created in In progress" }] },
    { id: "t3", name: "Book the launch webinar", assignee: "Priya Nair", due: "2026-09-19",
      section: "To do", done: false, subtasks: [], blockedBy: null,
      history: [{ at: "08:55", text: "Created in To do" }] },
    { id: "t4", name: "Draft the FAQ", assignee: "Dan Okafor", due: "2026-10-05",
      section: "To do", done: false, subtasks: [], blockedBy: null,
      history: [{ at: "08:58", text: "Created in To do" }] },
  ],
  notifications: [],
  counter: 100,
};

export const { useStore, reset } = createStore("asana", SEED);
export const nextId = (n) => `t${n}`;

/**
 * My Tasks sections, decided from the due date against a fixed today. This is
 * the grouping the view asserts, so it lives here rather than in the component.
 */
export function bucketOf(due) {
  if (!due) return "No date";
  if (due < TODAY) return "Overdue";
  if (due === TODAY) return "Today";
  // Anything inside the next seven days is "Upcoming"; past that is "Later".
  const d = new Date(due + "T00:00:00Z") - new Date(TODAY + "T00:00:00Z");
  return d <= 7 * 86400000 ? "Upcoming" : "Later";
}
export const BUCKETS = ["Overdue", "Today", "Upcoming", "Later", "No date"];

/** A task cannot be completed while the task it depends on is still open. */
export function completionBlocker(task, tasks) {
  if (!task.blockedBy) return null;
  const blocker = tasks.find((t) => t.id === task.blockedBy);
  if (!blocker || blocker.done) return null;
  return blocker;
}
