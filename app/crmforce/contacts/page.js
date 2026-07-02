"use client";

import { useEffect, useState } from "react";
import { listRecords, createRecord, updateRecord, deleteRecord } from "../lib/api";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import RecordForm from "../components/RecordForm";

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  async function reload() {
    setLoading(true);
    setError(null);
    try {
      const [contactRows, accountRows] = await Promise.all([
        listRecords("contacts"),
        listRecords("accounts"),
      ]);
      setContacts(contactRows);
      setAccounts(accountRows);
    } catch (err) {
      setError(err?.message || "Failed to load contacts.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reload();
  }, []);

  function accountName(id) {
    return accounts.find((a) => a.id === id)?.name || "—";
  }

  function openNew() {
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
        await updateRecord("contacts", editing.id, values);
      } else {
        await createRecord("contacts", values);
      }
      closeModal();
      await reload();
    } catch (err) {
      setError(err?.message || "Failed to save contact.");
      throw err;
    }
  }

  async function handleDelete(row) {
    try {
      await deleteRecord("contacts", row.id);
      await reload();
    } catch (err) {
      setError(err?.message || "Failed to delete contact.");
    }
  }

  const columns = [
    {
      key: "name",
      header: "Name",
      render: (row) => (
        <span className="cf-strong">
          {row.firstName} {row.lastName}
        </span>
      ),
    },
    { key: "title", header: "Title" },
    { key: "email", header: "Email" },
    { key: "phone", header: "Phone" },
    {
      key: "account",
      header: "Account",
      render: (row) => accountName(row.accountId),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => (
        <div className="cf-row-actions">
          <button className="cf-btn cf-btn-sm" onClick={() => openEdit(row)}>
            Edit
          </button>
          <button
            className="cf-btn cf-btn-sm cf-btn-danger"
            onClick={() => handleDelete(row)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const formFields = [
    { name: "firstName", label: "First name", required: true, half: true },
    { name: "lastName", label: "Last name", required: true, half: true },
    { name: "title", label: "Title", half: true },
    { name: "email", label: "Email", type: "email", half: true },
    { name: "phone", label: "Phone", type: "tel", half: true },
    {
      name: "accountId",
      label: "Account",
      type: "select",
      options: accounts.map((a) => ({ value: a.id, label: a.name })),
    },
  ];

  return (
    <div>
      <div className="cf-page-head">
        <div>
          <div className="cf-eyebrow">CRMFORCE</div>
          <h1>Contacts</h1>
          <p>People connected to your accounts.</p>
        </div>
        <button className="cf-btn cf-btn-primary" onClick={openNew}>
          + New Contact
        </button>
      </div>

      {error && <div className="cf-error">{error}</div>}

      {loading ? (
        <div className="cf-loading">Loading contacts…</div>
      ) : (
        <div className="cf-card">
          <DataTable columns={columns} rows={contacts} empty="No contacts yet." />
        </div>
      )}

      <Modal
        open={modalOpen}
        title={editing ? "Edit Contact" : "New Contact"}
        onClose={closeModal}
      >
        <RecordForm
          fields={formFields}
          initial={editing || {}}
          onSubmit={save}
          onCancel={closeModal}
          submitLabel={editing ? "Save" : "Create"}
        />
      </Modal>
    </div>
  );
}
