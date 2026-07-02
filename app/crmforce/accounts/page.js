"use client";

import { useEffect, useState } from "react";
import { listRecords, createRecord, updateRecord, deleteRecord } from "../lib/api";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import RecordForm from "../components/RecordForm";

const FIELDS = [
  { name: "name", label: "Account name", required: true },
  {
    name: "industry",
    label: "Industry",
    type: "select",
    options: ["Technology", "Manufacturing", "Energy", "Finance", "Healthcare", "Retail", "Other"],
    half: true,
  },
  { name: "employees", label: "Employees", type: "number", half: true },
  { name: "website", label: "Website", placeholder: "acme.example.com", half: true },
  { name: "billingCity", label: "Billing city", half: true },
];

export default function AccountsPage() {
  const [accounts, setAccounts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  async function reload() {
    try {
      setError(null);
      const [accountRows, contactRows] = await Promise.all([
        listRecords("accounts"),
        listRecords("contacts"),
      ]);
      setAccounts(accountRows);
      setContacts(contactRows);
    } catch (err) {
      setError(err.message || "Failed to load accounts.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reload();
  }, []);

  function contactCount(accountId) {
    return contacts.filter((c) => c.accountId === accountId).length;
  }

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(row) {
    setEditing(row);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditing(null);
  }

  async function save(values) {
    try {
      if (editing) {
        await updateRecord("accounts", editing.id, values);
      } else {
        await createRecord("accounts", values);
      }
      closeModal();
      await reload();
    } catch (err) {
      setError(err.message || "Failed to save account.");
    }
  }

  async function handleDelete(row) {
    try {
      await deleteRecord("accounts", row.id);
      await reload();
    } catch (err) {
      setError(err.message || "Failed to delete account.");
    }
  }

  const columns = [
    {
      key: "name",
      header: "Name",
      render: (row) => <span className="cf-strong">{row.name}</span>,
    },
    { key: "industry", header: "Industry" },
    {
      key: "website",
      header: "Website",
      render: (row) =>
        row.website ? (
          <a href={`https://${row.website}`} target="_blank" rel="noreferrer">
            {row.website}
          </a>
        ) : (
          "—"
        ),
    },
    {
      key: "employees",
      header: "Employees",
      render: (row) => (row.employees ? row.employees.toLocaleString() : "—"),
    },
    { key: "billingCity", header: "City" },
    {
      key: "contacts",
      header: "Contacts",
      render: (row) => contactCount(row.id),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div className="cf-row-actions">
          <button className="cf-btn cf-btn-sm" onClick={() => openEdit(row)}>
            Edit
          </button>
          <button className="cf-btn cf-btn-sm cf-btn-danger" onClick={() => handleDelete(row)}>
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
          <span className="cf-eyebrow">CRMFORCE</span>
          <h1>Accounts</h1>
          <p>Companies and organizations you sell to.</p>
        </div>
        <button className="cf-btn cf-btn-primary" onClick={openCreate}>
          + New Account
        </button>
      </div>

      {error && <div className="cf-error">{error}</div>}

      {loading ? (
        <div className="cf-loading">Loading accounts…</div>
      ) : (
        <div className="cf-card">
          <DataTable columns={columns} rows={accounts} empty="No accounts yet." />
        </div>
      )}

      <Modal open={modalOpen} title={editing ? "Edit Account" : "New Account"} onClose={closeModal}>
        <RecordForm
          fields={FIELDS}
          initial={editing || {}}
          onSubmit={save}
          onCancel={closeModal}
          submitLabel={editing ? "Save" : "Create"}
        />
      </Modal>
    </div>
  );
}
