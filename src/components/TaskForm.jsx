import { useState } from "react";
import { ArrowRight, Plus, WandSparkles } from "lucide-react";

export function TaskForm({ onCreateTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim() || loading) return;

    setLoading(true);
    const created = await onCreateTask({
      title: title.trim(),
      description: description.trim(),
    });

    if (created) {
      setTitle("");
      setDescription("");
    }
    setLoading(false);
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <span className="form-icon"><WandSparkles size={18} /></span>
        <div>
          <span className="section-kicker">Capturar ideia</span>
          <h2>Nova tarefa</h2>
        </div>
      </div>

      <label>
        O que precisa ser feito?
        <input
          type="text"
          placeholder="Ex.: Revisar apresentação"
          value={title}
          onChange={event => setTitle(event.target.value)}
          maxLength={120}
        />
      </label>

      <label>
        Adicione contexto <span>(opcional)</span>
        <textarea
          placeholder="Detalhes, links ou próximos passos..."
          value={description}
          onChange={event => setDescription(event.target.value)}
          rows={5}
        />
      </label>

      <button type="submit" className="create-button" disabled={loading || !title.trim()}>
        <span className="create-icon"><Plus size={17} /></span>
        <span>{loading ? "Adicionando..." : "Adicionar à lista"}</span>
        <ArrowRight size={17} className="arrow" />
      </button>
    </form>
  );
}
