"use client";

// Generic data table.
// columns: [{ key, header, render?(row), width? }]
export default function DataTable({ columns, rows, empty = "No records yet." }) {
  if (!rows || rows.length === 0) {
    return <div className="cf-empty">{empty}</div>;
  }
  return (
    <div className="cf-table-wrap">
      <table className="cf-table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} style={c.width ? { width: c.width } : undefined}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((c) => (
                <td key={c.key}>{c.render ? c.render(row) : row[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
