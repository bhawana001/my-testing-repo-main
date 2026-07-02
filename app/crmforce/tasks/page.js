"use client";

import { useEffect, useState } from "react";
import { listRecords, createRecord, updateRecord, deleteRecord } from "../lib/api";
import DataTable from "../components/DataTable";
import Badge from "../components/Badge";
import Modal from "../components/Modal";
import RecordForm from "../components/RecordForm";

const TASK_PRIORITIES = ["High", "Normal", "Low"];

const FORM_FIELDS = [
  { name: "subject", label: "Subject", required: true },
  { name: "relatedTo", label: "Related to", half: true },
  { name: "dueDate", label: "Due date", type: "date", half: true },
  { name: "priority", label: "Priority", type: "select", options: TASK_PRIORITIES, half: true },
  { name: "status", label: "Status", type: "select", options: ["Open", "Complete"], half: true },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  async function reload() {
    try {
      setError(null);
      setTasks(await listRecords("tasks"));
    } catch (err) {
      setError(err.message || "Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reload();
  }, []);

  async function toggle(row) {
    try {
      const status = row.status === "Complete" ? "Open" : "Complete";
      await updateRecord("tasks", row.id, { status });
      await reload();
    } catch (err) {
      setError(err.message || "Failed to update task.");
    }
  }

  async function remove(row) {
    try {
      await deleteRecord("tasks", row.id);
      await reload();
    } catch (err) {
      setError(err.message || "Failed to delete task.");
    }
  }

  async function create(values) {
    try {
      const payload = { status: "Open", ...values };
      await createRecord("tasks", payload);
      setModalOpen(false);
      await reload();
    } catch (err) {
      setError(err.message || "Failed to create task.");
    }
  }

  const columns = [
    {
      key: "done",
      header: "Done",
      render: (row) => (
        <input
          type="checkbox"
          checked={row.status === "Complete"}
          onChange={() => toggle(row)}
          aria-label="Toggle complete"
        />
      ),
    },
    {
      key: "subject",
      header: "Subject",
      render: (row) => (
        <span
          style={
            row.status === "Complete"
              ? { textDecoration: "line-through", color: "#5c6280" }
              : undefined
          }
        >
          {row.subject}
        </span>
      ),
    },
    { key: "relatedTo", header: "Related To", render: (row) => row.relatedTo },
    { key: "dueDate", header: "Due", render: (row) => row.dueDate || "—" },
    { key: "priority", header: "Priority", render: (row) => <Badge value={row.priority} /> },
    { key: "status", header: "Status", render: (row) => <Badge value={row.status} /> },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div className="cf-row-actions">
          <button className="cf-btn cf-btn-sm cf-btn-danger" onClick={() => remove(row)}>
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="cf-page-head">
        <div>
          <div className="cf-eyebrow">CRMFORCE</div>
          <h1>Tasks</h1>
          <p>Track to-dos and follow-ups across your pipeline.</p>
        </div>
        <button className="cf-btn cf-btn-primary" onClick={() => setModalOpen(true)}>
          + New Task
        </button>
      </div>

      {error && <div className="cf-error">{error}</div>}

      {loading ? (
        <div className="cf-loading">Loading tasks…</div>
      ) : (
        <div className="cf-card">
          <DataTable columns={columns} rows={tasks} empty="No tasks yet." />
        </div>
      )}

      <Modal open={modalOpen} title="New Task" onClose={() => setModalOpen(false)}>
        <RecordForm
          fields={FORM_FIELDS}
          initial={{ priority: "Normal", status: "Open" }}
          onSubmit={create}
          onCancel={() => setModalOpen(false)}
          submitLabel="Create Task"
        />
      </Modal>
    </div>
  );
}
