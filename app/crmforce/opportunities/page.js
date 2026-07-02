"use client";

import { useEffect, useState } from "react";
import { listRecords, createRecord, updateRecord, formatCurrency } from "../lib/api";
import Modal from "../components/Modal";
import RecordForm from "../components/RecordForm";

const OPPORTUNITY_STAGES = [
  "Prospecting",
  "Qualification",
  "Proposal",
  "Negotiation",
  "Closed Won",
  "Closed Lost",
];

export default function OpportunitiesPage() {
  const [opps, setOpps] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [dragId, setDragId] = useState(null);
  const [dragOverStage, setDragOverStage] = useState(null);

  async function reload() {
    try {
      setError(null);
      const [oppData, accountData] = await Promise.all([
        listRecords("opportunities"),
        listRecords("accounts"),
      ]);
      setOpps(oppData);
      setAccounts(accountData);
    } catch (err) {
      setError(err.message || "Failed to load opportunities.");
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

  function byStage(stage) {
    return opps.filter((o) => o.stage === stage);
  }

  function onDragStart(e, id) {
    setDragId(id);
    e.dataTransfer.effectAllowed = "move";
  }

  function onDragOver(e, stage) {
    e.preventDefault();
    setDragOverStage(stage);
  }

  function onDragLeave(stage) {
    if (dragOverStage === stage) setDragOverStage(null);
  }

  async function onDrop(e, stage) {
    e.preventDefault();
    setDragOverStage(null);
    const id = dragId;
    setDragId(null);
    const opp = opps.find((o) => o.id === id);
    if (opp && opp.stage !== stage) {
      try {
        await updateRecord("opportunities", id, { stage });
        reload();
      } catch (err) {
        setError(err.message || "Failed to move opportunity.");
      }
    }
  }

  async function create(values) {
    try {
      await createRecord("opportunities", values);
      setModalOpen(false);
      reload();
    } catch (err) {
      setError(err.message || "Failed to create opportunity.");
    }
  }

  function closeModal() {
    setModalOpen(false);
  }

  const fields = [
    { name: "name", label: "Opportunity name", required: true },
    {
      name: "accountId",
      label: "Account",
      type: "select",
      options: accounts.map((a) => ({ value: a.id, label: a.name })),
    },
    { name: "amount", label: "Amount (USD)", type: "number", half: true },
    { name: "probability", label: "Probability %", type: "number", half: true },
    { name: "stage", label: "Stage", type: "select", options: OPPORTUNITY_STAGES, half: true },
    { name: "closeDate", label: "Close date", type: "date", half: true },
  ];

  return (
    <div>
      <div className="cf-page-head">
        <div>
          <div className="cf-eyebrow">CRMFORCE</div>
          <h1>Opportunities</h1>
          <p>Drag deals across the pipeline.</p>
        </div>
        <button className="cf-btn cf-btn-primary" onClick={() => setModalOpen(true)}>
          + New Opportunity
        </button>
      </div>

      {error && <div className="cf-error">{error}</div>}

      {loading ? (
        <div className="cf-loading">Loading…</div>
      ) : (
        <div className="cf-kanban">
          {OPPORTUNITY_STAGES.map((stage) => {
            const stageOpps = byStage(stage);
            const total = stageOpps.reduce((sum, o) => sum + (Number(o.amount) || 0), 0);
            return (
              <div
                key={stage}
                className={"cf-kan-col" + (dragOverStage === stage ? " cf-dragover" : "")}
                onDragOver={(e) => onDragOver(e, stage)}
                onDrop={(e) => onDrop(e, stage)}
                onDragLeave={() => onDragLeave(stage)}
              >
                <div className="cf-kan-col-head">
                  <span className="cf-kan-col-title">{stage}</span>
                  <span className="cf-kan-col-total">
                    {stageOpps.length} · {formatCurrency(total)}
                  </span>
                </div>
                {stageOpps.map((opp) => (
                  <div
                    key={opp.id}
                    className="cf-kan-card"
                    draggable
                    onDragStart={(e) => onDragStart(e, opp.id)}
                  >
                    <div className="cf-kan-card-name">{opp.name}</div>
                    <div className="cf-kan-card-amt">{formatCurrency(opp.amount)}</div>
                    <div className="cf-kan-card-meta">
                      <span>{accountName(opp.accountId)}</span>
                      <span>{opp.closeDate || "—"}</span>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      <Modal open={modalOpen} title="New Opportunity" onClose={closeModal}>
        <RecordForm
          fields={fields}
          initial={{ stage: "Prospecting" }}
          onSubmit={create}
          onCancel={closeModal}
          submitLabel="Create"
        />
      </Modal>
    </div>
  );
}
