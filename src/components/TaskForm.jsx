import { useState } from "react";
import { PlusCircle } from "lucide-react";

export function TaskForm({ onCreateTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    await onCreateTask({ title, description });
    setTitle("");
    setDescription("");
    setLoading(false);
  }

  return (
    <div
      className="glass"
      style={{
        borderRadius: "16px",
        padding: "1.5rem",
        animation: "slideIn 0.3s ease",
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 32px rgba(124,58,237,0.1)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
    >
      <h2 style={{
        fontSize: "0.85rem",
        fontWeight: "600",
        marginBottom: "1rem",
        color: "var(--purple-light)",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
      }}>
        <PlusCircle size={15} />
        Nova Tarefa
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <input
          type="text"
          placeholder="Título da tarefa *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
          style={{
            backgroundColor: "var(--bg-input)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            padding: "0.8rem 1rem",
            color: "#e1e1e1",
            fontSize: "0.9rem",
            width: "100%",
          }}
        />

        <textarea
          placeholder="Descrição (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          style={{
            backgroundColor: "var(--bg-input)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            padding: "0.8rem 1rem",
            color: "#e1e1e1",
            fontSize: "0.9rem",
            resize: "vertical",
            width: "100%",
          }}
        />

        <button
          onClick={handleSubmit}
          disabled={loading || !title.trim()}
          className="btn-primary"
          style={{
            background: loading || !title.trim()
              ? "rgba(124,58,237,0.3)"
              : "linear-gradient(135deg, #7c3aed, #6d28d9)",
            color: loading || !title.trim() ? "var(--text-muted)" : "white",
            padding: "0.8rem 1rem",
            borderRadius: "10px",
            fontSize: "0.9rem",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            cursor: loading || !title.trim() ? "not-allowed" : "pointer",
            boxShadow: loading || !title.trim() ? "none" : "0 4px 16px rgba(124,58,237,0.3)",
          }}
        >
          <PlusCircle size={18} />
          {loading ? "Criando..." : "Criar Tarefa"}
        </button>
      </div>
    </div>
  );
}