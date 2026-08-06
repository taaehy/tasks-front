import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { Search, LayoutList, CheckCheck } from "lucide-react";

const API_URL = "https://tasks-api-ggyw.onrender.com";

async function fetchTasks(search) {
  const query = search ? `?title=${encodeURIComponent(search)}` : "";
  const response = await fetch(`${API_URL}/tasks${query}`);
  return response.json();
}

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  async function loadTasks() {
    const data = await fetchTasks(search);
    setTasks(data);
  }

  useEffect(() => {
    let shouldUpdate = true;

    fetchTasks(search).then(data => {
      if (shouldUpdate) {
        setTasks(data);
      }
    });

    return () => {
      shouldUpdate = false;
    };
  }, [search]);

  async function handleCreateTask({ title, description }) {
    await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    loadTasks();
  }

  async function handleComplete(id) {
    await fetch(`${API_URL}/tasks/${id}/complete`, { method: "PATCH" });
    loadTasks();
  }

  async function handleDelete(id) {
    await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
    loadTasks();
  }

  function handleEdit(task) {
    setEditingTask(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description ?? "");
  }

  async function handleSaveEdit() {
    await fetch(`${API_URL}/tasks/${editingTask}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editTitle, description: editDescription }),
    });
    setEditingTask(null);
    loadTasks();
  }

  const total = tasks.length;
  const concluidas = tasks.filter(t => t.completed_at).length;

  return (
    <div style={{ minHeight: "100vh" }}>
      <Header />

      <main style={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1rem" }}>

        {/* Stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.75rem",
          marginBottom: "1.5rem",
        }}>
          <div className="glass" style={{
            borderRadius: "12px",
            padding: "1rem 1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}>
            <div style={{
              width: "36px", height: "36px",
              backgroundColor: "rgba(124,58,237,0.15)",
              borderRadius: "10px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <LayoutList size={18} color="var(--purple-light)" />
            </div>
            <div>
              <p style={{ fontSize: "1.4rem", fontWeight: "700", color: "#fff" }}>{total}</p>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Total de tarefas</p>
            </div>
          </div>

          <div className="glass" style={{
            borderRadius: "12px",
            padding: "1rem 1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}>
            <div style={{
              width: "36px", height: "36px",
              backgroundColor: "rgba(34,197,94,0.12)",
              borderRadius: "10px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <CheckCheck size={18} color="var(--success)" />
            </div>
            <div>
              <p style={{ fontSize: "1.4rem", fontWeight: "700", color: "#fff" }}>{concluidas}</p>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Concluídas</p>
            </div>
          </div>
        </div>

        <TaskForm onCreateTask={handleCreateTask} />

        {/* Search */}
        <div
          className="glass search-bar"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            margin: "1rem 0",
            borderRadius: "10px",
            padding: "0.75rem 1rem",
            transition: "all 0.2s ease",
          }}>
          <Search size={17} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Buscar por título..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              background: "none",
              color: "#e1e1e1",
              fontSize: "0.9rem",
              width: "100%",
            }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{
                background: "none",
                color: "var(--text-muted)",
                fontSize: "1rem",
                padding: "0 4px",
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Edit modal */}
        {editingTask && (
          <div className="glass" style={{
            border: "1px solid rgba(124,58,237,0.4)",
            borderRadius: "14px",
            padding: "1.25rem",
            marginBottom: "1rem",
            boxShadow: "0 0 32px rgba(124,58,237,0.1)",
            animation: "fadeInUp 0.2s ease",
          }}>
            <h3 style={{
              color: "var(--purple-light)",
              marginBottom: "1rem",
              fontSize: "0.85rem",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}>
              ✏️ Editando tarefa
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <input
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
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
                value={editDescription}
                onChange={e => setEditDescription(e.target.value)}
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
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                  onClick={handleSaveEdit}
                  className="btn-primary"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                    color: "white",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "10px",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                    boxShadow: "0 4px 16px rgba(124,58,237,0.3)",
                  }}
                >
                  Salvar
                </button>
                <button
                  onClick={() => setEditingTask(null)}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "var(--text-muted)",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "10px",
                    fontSize: "0.9rem",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        <TaskList
          tasks={tasks}
          onComplete={handleComplete}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </main>
    </div>
  );
}
