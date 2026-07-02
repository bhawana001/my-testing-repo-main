"use client";

import { useEffect, useState } from "react";
import { listRecords, createRecord, updateRecord, deleteRecord } from "../lib/api";
import DataTable from "../components/DataTable";
import Badge from "../components/Badge";
import Modal from "../components/Modal";
import RecordForm from "../components/RecordForm";

const LEAD_STATUSES = ["New", "Working", "Qualified", "Unqualified"];
const LEAD_SOURCES = ["Web", "Referral", "Event", "Cold Call", "Partner"];

const LEAD_FORM_FIELDS = [
  { name: "name", label: "Name", required: true, half: true },
  { name: "company", label: "Company", required: true, half: true },
  { name: "title", label: "Title", half: true },
  { name: "email", label: "Email", type: "email", half: true },
  { name: "phone", label: "Phone", type: "tel", half: true },
  { name: "status", label: "Status", type: "select", options: LEAD_STATUSES, half: true },
  { name: "source", label: "Source", type: "select", options: LEAD_SOURCES },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  async function reload() {
    setLeads(await listRecords("leads"));
  }

  useEffect(() => {
    (async () => {
      try {
        await reload();
      } catch (err) {
        setError(err?.message || "Failed to load leads.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function changeStatus(row, status) {
    try {
      await updateRecord("leads", row.id, { status });
      await reload();
    } catch (err) {
      setError(err?.message || "Failed to update status.");
    }
  }

  async function remove(row) {
    try {
      await deleteRecord("leads", row.id);
      await reload();
    } catch (err) {
      setError(err?.message || "Failed to delete lead.");
    }
  }

  async function convert(row) {
    try {
      const name = row.name || "";
      const spaceIndex = name.indexOf(" ");
      const firstName = spaceIndex === -1 ? name : name.slice(0, spaceIndex);
      const lastName = spaceIndex === -1 ? "" : name.slice(spaceIndex + 1);
      await createRecord("contacts", {
        firstName,
        lastName,
        title: row.title,
        email: row.email,
        phone: row.phone,
      });
      await createRecord("opportunities", {
        name: `${row.company} — New Opportunity`,
        amount: 0,
        stage: "Prospecting",
        probability: 10,
        closeDate: "",
      });
      await deleteRecord("leads", row.id);
      await reload();
    } catch (err) {
      setError(err?.message || "Failed to convert lead.");
    }
  }

  async function handleCreate(values) {
    await createRecord("leads", values);
    setModalOpen(false);
    await reload();
  }

  const columns = [
    {
      key: "name",
      header: "Name",
      render: (row) => <span className="cf-strong">{row.name}</span>,
    },
    { key: "company", header: "Company" },
    { key: "title", header: "Title" },
    { key: "email", header: "Email" },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <select
          className="cf-select"
          value={row.status}
          onChange={(e) => changeStatus(row, e.target.value)}
        >
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      ),
    },
    { key: "source", header: "Source" },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div className="cf-row-actions">
          <button className="cf-btn cf-btn-sm" onClick={() => convert(row)}>
            Convert
          </button>
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
          <h1>Leads</h1>
          <p>Track and convert your prospects.</p>
        </div>
        <button className="cf-btn cf-btn-primary" onClick={() => setModalOpen(true)}>
          + New Lead
        </button>
      </div>

      {error && <div className="cf-error">{error}</div>}

      {loading ? (
        <div className="cf-loading">Loading leads…</div>
      ) : (
        <div className="cf-card">
          <DataTable columns={columns} rows={leads} empty="No leads yet." />
        </div>
      )}

      <Modal open={modalOpen} title="New Lead" onClose={() => setModalOpen(false)}>
        <RecordForm
          fields={LEAD_FORM_FIELDS}
          initial={{ status: "New", source: "Web" }}
          onSubmit={handleCreate}
          onCancel={() => setModalOpen(false)}
          submitLabel="Create Lead"
        />
      </Modal>
    </div>
  );
}
