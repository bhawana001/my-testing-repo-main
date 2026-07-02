"use client";

import { useEffect, useState } from "react";
import { listRecords, formatCurrency } from "./lib/api";
import ActivityTimeline from "./components/ActivityTimeline";
import "./crmforce.css";

const OPPORTUNITY_STAGES = [
  "Prospecting",
  "Qualification",
  "Proposal",
  "Negotiation",
  "Closed Won",
  "Closed Lost",
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      listRecords("leads"),
      listRecords("opportunities"),
      listRecords("tasks"),
      listRecords("activities"),
    ]).then(([leadsData, oppsData, tasksData, activitiesData]) => {
      if (cancelled) return;
      setLeads(leadsData);
      setOpportunities(oppsData);
      setTasks(tasksData);
      setActivities(activitiesData);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const openOpps = opportunities.filter(
    (o) => o.stage !== "Closed Won" && o.stage !== "Closed Lost"
  );
  const openPipeline = openOpps.reduce((sum, o) => sum + (o.amount || 0), 0);

  const wonCount = opportunities.filter((o) => o.stage === "Closed Won").length;
  const lostCount = opportunities.filter((o) => o.stage === "Closed Lost").length;
  const winRate =
    wonCount + lostCount > 0
      ? Math.round((wonCount / (wonCount + lostCount)) * 100) + "%"
      : "—";

  const newLeads = leads.filter((l) => l.status === "New").length;

  const openTasks = tasks.filter((t) => t.status !== "Complete").length;

  const stageSums = OPPORTUNITY_STAGES.map((stage) => ({
    stage,
    sum: opportunities
      .filter((o) => o.stage === stage)
      .reduce((sum, o) => sum + (o.amount || 0), 0),
  }));
  const maxSum = Math.max(...stageSums.map((s) => s.sum), 0);

  return (
    <div>
      <div className="cf-page-head">
        <div>
          <div className="cf-eyebrow">CRMFORCE</div>
          <h1>Dashboard</h1>
          <p>Pipeline, leads, and activity at a glance</p>
        </div>
      </div>

      {loading ? (
        <div className="cf-loading">Loading dashboard…</div>
      ) : (
        <>
          <div className="cf-kpi-grid">
            <div className="cf-kpi">
              <div className="cf-kpi-label">Open Pipeline</div>
              <div className="cf-kpi-value">{formatCurrency(openPipeline)}</div>
              <div className="cf-kpi-sub">{openOpps.length} open deals</div>
            </div>
            <div className="cf-kpi">
              <div className="cf-kpi-label">Win Rate</div>
              <div className="cf-kpi-value">{winRate}</div>
              <div className="cf-kpi-sub">
                {wonCount} won · {lostCount} lost
              </div>
            </div>
            <div className="cf-kpi">
              <div className="cf-kpi-label">New Leads</div>
              <div className="cf-kpi-value">{newLeads}</div>
              <div className="cf-kpi-sub">of {leads.length} leads</div>
            </div>
            <div className="cf-kpi">
              <div className="cf-kpi-label">Open Tasks</div>
              <div className="cf-kpi-value">{openTasks}</div>
              <div className="cf-kpi-sub">{openTasks} due</div>
            </div>
          </div>

          <div className="cf-grid-2">
            <div className="cf-card">
              <div className="cf-card-head">
                <h2>Pipeline by Stage</h2>
              </div>
              <div className="cf-card-pad">
                {stageSums.map(({ stage, sum }) => {
                  const pct = maxSum > 0 ? (sum / maxSum) * 100 : 0;
                  return (
                    <div className="cf-bar-row" key={stage}>
                      <span>{stage}</span>
                      <div className="cf-bar-track">
                        <div
                          className="cf-bar-fill"
                          style={{ width: pct + "%" }}
                        />
                      </div>
                      <span className="cf-bar-val">{formatCurrency(sum)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="cf-card">
              <div className="cf-card-head">
                <h2>Recent Activity</h2>
              </div>
              <div className="cf-card-pad">
                <ActivityTimeline
                  items={activities.slice(0, 8)}
                  empty="No recent activity"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
