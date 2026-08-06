import { useEffect, useMemo, useState } from "react";
import {
  CheckCheck,
  CircleDashed,
  LayoutGrid,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { Header } from "./components/Header";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";

const API_URL = "https://tasks-api-ggyw.onrender.com";

async function apiRequest(path, options) {
  const response = await fetch(`${API_URL}${path}`, options);

  if (!response.ok) {
    throw new Error("Não foi possível concluir a operação.");
  }

  if (response.status === 204) return null;
  return response.json();
}

function fetchTasks(search) {
  const query = search ? `?title=${encodeURIComponent(search)}` : "";
  return apiRequest(`/tasks${query}`);
}

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    fetchTasks(search)
      .then(data => {
        if (active) {
          setTasks(data);
          setError("");
        }
      })
      .catch(() => {
        if (active) setError("A API está demorando para responder. Tente novamente.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [search]);

  async function reloadTasks() {
    setIsLoading(true);
    try {
      const data = await fetchTasks(search);
      setTasks(data);
      setError("");
      return true;
    } catch {
      setError("Não foi possível sincronizar suas tarefas.");
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  async function runMutation(path, options) {
    setError("");
    try {
      await apiRequest(path, options);
      await reloadTasks();
      return true;
    } catch {
      setError("Não foi possível salvar a alteração. Tente novamente.");
      return false;
    }
  }

  function handleSearch(value) {
    setIsLoading(true);
    setSearch(value);
  }

  function handleCreateTask({ title, description }) {
    return runMutation("/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
  }

  function handleComplete(id) {
    return runMutation(`/tasks/${id}/complete`, { method: "PATCH" });
  }

  function handleDelete(id) {
    return runMutation(`/tasks/${id}`, { method: "DELETE" });
  }

  function handleEdit(task) {
    setEditingTask(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description ?? "");
  }

  async function handleSaveEdit(event) {
    event.preventDefault();
    if (!editTitle.trim()) return;

    const saved = await runMutation(`/tasks/${editingTask}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editTitle.trim(),
        description: editDescription,
      }),
    });

    if (saved) setEditingTask(null);
  }

  const completed = tasks.filter(task => task.completed_at).length;
  const pending = tasks.length - completed;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  const visibleTasks = useMemo(() => {
    if (statusFilter === "completed") return tasks.filter(task => task.completed_at);
    if (statusFilter === "pending") return tasks.filter(task => !task.completed_at);
    return tasks;
  }, [statusFilter, tasks]);

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  }).format(new Date());
  const today = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <div className="app-shell" id="top">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <Header apiStatus={error ? "offline" : isLoading ? "syncing" : "online"} />

      <main className="dashboard">
        <section className="hero">
          <div>
            <span className="eyebrow"><Sparkles size={14} /> Seu espaço de foco</span>
            <h1>Organize hoje.<br /><span>Avance todos os dias.</span></h1>
            <p>Capture o que importa, acompanhe seu ritmo e transforme planos em progresso real.</p>
          </div>
          <div className="today-card">
            <span>Hoje</span>
            <strong>{today}</strong>
            <div className="progress-line"><i style={{ width: `${progress}%` }} /></div>
            <small>{progress}% das tarefas concluídas</small>
          </div>
        </section>

        <section className="stats-grid" aria-label="Resumo das tarefas">
          <article className="stat-card stat-total">
            <div className="stat-icon"><LayoutGrid size={20} /></div>
            <div><span>Total</span><strong>{tasks.length}</strong></div>
            <small>Tarefas encontradas</small>
          </article>
          <article className="stat-card stat-pending">
            <div className="stat-icon"><CircleDashed size={20} /></div>
            <div><span>Em aberto</span><strong>{pending}</strong></div>
            <small>Próximos passos</small>
          </article>
          <article className="stat-card stat-completed">
            <div className="stat-icon"><CheckCheck size={20} /></div>
            <div><span>Concluídas</span><strong>{completed}</strong></div>
            <small>Progresso realizado</small>
          </article>
        </section>

        {error && (
          <div className="error-banner" role="alert">
            <span>{error}</span>
            <button onClick={reloadTasks}>Tentar novamente</button>
          </div>
        )}

        <section className="workspace">
          <aside className="composer-column">
            <TaskForm onCreateTask={handleCreateTask} />
            <div className="focus-note">
              <span>Uma ideia de cada vez</span>
              <p>Tarefas claras são mais fáceis de começar e muito melhores de concluir.</p>
            </div>
          </aside>

          <div className="tasks-panel">
            <div className="panel-heading">
              <div>
                <span className="section-kicker">Minha lista</span>
                <h2>Tarefas</h2>
              </div>
              <span className="result-count">{visibleTasks.length} {visibleTasks.length === 1 ? "item" : "itens"}</span>
            </div>

            <div className="toolbar">
              <label className="search-field">
                <Search size={18} />
                <input
                  type="search"
                  aria-label="Buscar tarefas por título"
                  placeholder="Buscar uma tarefa..."
                  value={search}
                  onChange={event => handleSearch(event.target.value)}
                />
                {search && (
                  <button type="button" onClick={() => handleSearch("")} aria-label="Limpar busca">
                    <X size={16} />
                  </button>
                )}
              </label>

              <div className="filters" aria-label="Filtrar por status">
                {[
                  ["all", "Todas"],
                  ["pending", "Pendentes"],
                  ["completed", "Concluídas"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    className={statusFilter === value ? "active" : ""}
                    onClick={() => setStatusFilter(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <TaskList
              tasks={visibleTasks}
              isLoading={isLoading}
              hasFilters={Boolean(search) || statusFilter !== "all"}
              onComplete={handleComplete}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </div>
        </section>
      </main>

      {editingTask && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setEditingTask(null)}>
          <form className="edit-modal" onSubmit={handleSaveEdit} onMouseDown={event => event.stopPropagation()}>
            <div className="modal-heading">
              <div>
                <span className="section-kicker">Atualizar tarefa</span>
                <h2>Editar detalhes</h2>
              </div>
              <button type="button" className="icon-button" onClick={() => setEditingTask(null)} aria-label="Fechar edição">
                <X size={19} />
              </button>
            </div>
            <label>
              Título
              <input value={editTitle} onChange={event => setEditTitle(event.target.value)} autoFocus />
            </label>
            <label>
              Descrição
              <textarea value={editDescription} onChange={event => setEditDescription(event.target.value)} rows={4} />
            </label>
            <div className="modal-actions">
              <button type="button" className="button-ghost" onClick={() => setEditingTask(null)}>Cancelar</button>
              <button type="submit" className="button-primary" disabled={!editTitle.trim()}>Salvar alterações</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
