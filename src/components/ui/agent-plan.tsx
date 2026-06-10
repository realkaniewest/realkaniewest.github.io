import type { PlanTask } from "@/i18n";

const statusLabel = {
  done: "done",
  active: "active",
  next: "next",
};

export function AgentPlan({ tasks }: { tasks: readonly PlanTask[] }) {
  return (
    <div className="agent-plan">
      {tasks.map((task, index) => (
        <article className={`agent-step is-${task.status}`} key={task.title}>
          <div className="agent-step__rail">
            <span>{index + 1}</span>
          </div>
          <div>
            <div className="agent-step__head">
              <h3>{task.title}</h3>
              <small>{statusLabel[task.status]}</small>
            </div>
            <p>{task.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
