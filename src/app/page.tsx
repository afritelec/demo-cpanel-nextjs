import { listTasks } from "@/lib/db";
import { addTask, deleteTask, toggleTask } from "./actions";

export const dynamic = "force-dynamic";

export default async function Home() {
  const tasks = await listTasks();

  return (
    <main>
      <h1>Mes tâches</h1>
      <p className="sub">Next.js et MySQL, déployés sur cPanel</p>

      <form action={addTask} className="add">
        <input name="title" placeholder="Nouvelle tâche" maxLength={200} required />
        <button type="submit">Ajouter</button>
      </form>

      {tasks.length === 0 && <p className="empty">Aucune tâche pour le moment.</p>}

      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.done ? "done" : ""}>
            <form action={toggleTask.bind(null, task.id)}>
              <button type="submit" className="check" aria-label="Changer l’état">
                {task.done ? "✓" : ""}
              </button>
            </form>
            <span>{task.title}</span>
            <form action={deleteTask.bind(null, task.id)}>
              <button type="submit" className="del">Supprimer</button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  );
}
