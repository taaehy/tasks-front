import { Trash2, CheckCircle, Circle, Pencil } from "lucide-react";

export function TaskList({ tasks, onComplete, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return (
      <div className="glass" style={{
        textAlign: "center",
        padding: "3.5rem",
        borderRadius: "16px",
        animation: "fadeInUp 0.3s ease",
      }}>
        <p style={{ fontSize: "2.5rem" }}>📋</p>
        <p style={{ marginTop: "0.75rem", fontSize: "0.95rem", color: "#e1e1e1" }}>
          Nenhuma tarefa encontrada
        </p>
        <p style={{ marginTop: "0.25rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
          Crie uma tarefa acima para começar
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {tasks.map(task => (
        <div
          key={task.id}
          className="task-card glass"
          style={{
            border: `1px solid ${task.completed_at ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.07)"}`,
            borderRadius: "14px",
            padding: "1.25rem",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "1rem",
            background: task.completed_at
              ? "rgba(34,197,94,0.04)"
              : "rgba(255,255,255,0.03)",
          }}>
          <div style={{ display: "flex", gap: "0.75rem", flex: 1 }}>
            <button
              onClick={() => onComplete(task.id)}
              className="btn-action"
              style={{ background: "none", marginTop: "2px", flexShrink: 0 }}
            >
              {task.completed_at
                ? <CheckCircle size={20} color="var(--success)" />
                : <Circle size={20} color="var(--text-muted)" />
              }
            </button>

            <div>
              <p style={{
                fontWeight: "600",
                fontSize: "0.95rem",
                textDecoration: task.completed_at ? "line-through" : "none",
                color: task.completed_at ? "var(--text-muted)" : "#f0f0f0",
                transition: "all 0.2s ease",
              }}>
                {task.title}
              </p>
              {task.description && (
                <p style={{
                  fontSize: "0.82rem",
                  color: "var(--text-muted)",
                  marginTop: "4px",
                  lineHeight: "1.5",
                }}>
                  {task.description}
                </p>
              )}
              <span style={{
                display: "inline-block",
                marginTop: "8px",
                fontSize: "0.7rem",
                fontWeight: "600",
                padding: "2px 10px",
                borderRadius: "20px",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                backgroundColor: task.completed_at
                  ? "rgba(34,197,94,0.1)"
                  : "rgba(136,136,136,0.08)",
                color: task.completed_at ? "var(--success)" : "var(--text-muted)",
                border: `1px solid ${task.completed_at ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.06)"}`,
              }}>
                {task.completed_at ? "✓ Concluída" : "Pendente"}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
            <button
              onClick={() => onEdit(task)}
              className="btn-action btn-edit"
              style={{
                background: "rgba(255,255,255,0.05)",
                padding: "7px",
                borderRadius: "8px",
                color: "var(--purple-light)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <Pencil size={15} />
            </button>

            <button
              onClick={() => onDelete(task.id)}
              className="btn-action btn-delete"
              style={{
                background: "rgba(255,255,255,0.05)",
                padding: "7px",
                borderRadius: "8px",
                color: "var(--danger)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}