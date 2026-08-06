import { Check, Circle, ClipboardList, Pencil, Trash2 } from "lucide-react";

function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
  }).format(new Date(value));
}

export function TaskList({ tasks, isLoading, hasFilters, onComplete, onDelete, onEdit }) {
  if (isLoading) {
    return (
      <div className="task-skeletons" aria-label="Carregando tarefas">
        {[1, 2, 3].map(item => <div className="task-skeleton" key={item} />)}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon"><ClipboardList size={28} /></span>
        <h3>{hasFilters ? "Nenhum resultado encontrado" : "Sua lista está livre"}</h3>
        <p>{hasFilters ? "Tente mudar a busca ou o filtro selecionado." : "Adicione sua primeira tarefa e comece a avançar."}</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <article className={`task-card ${task.completed_at ? "is-completed" : ""}`} key={task.id}>
          <button
            type="button"
            className="complete-button"
            onClick={() => onComplete(task.id)}
            aria-label={task.completed_at ? "Marcar como pendente" : "Marcar como concluída"}
          >
            {task.completed_at ? <Check size={17} strokeWidth={3} /> : <Circle size={19} />}
          </button>

          <div className="task-content">
            <div className="task-title-row">
              <h3>{task.title}</h3>
              <span className="task-number">#{String(index + 1).padStart(2, "0")}</span>
            </div>
            {task.description && <p>{task.description}</p>}
            <div className="task-meta">
              <span className="status-dot" />
              <span>{task.completed_at ? "Concluída" : "Em aberto"}</span>
              {task.created_at && <><i /> <span>Criada em {formatDate(task.created_at)}</span></>}
            </div>
          </div>

          <div className="task-actions">
            <button type="button" onClick={() => onEdit(task)} aria-label={`Editar ${task.title}`}>
              <Pencil size={16} />
            </button>
            <button type="button" className="delete" onClick={() => onDelete(task.id)} aria-label={`Excluir ${task.title}`}>
              <Trash2 size={16} />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
