import React from "react";
import StatusBadge from "./StatusBadge";
import styles from "../styles/components/project-card.module.scss";

interface Project {
  id: string;
  name: string;
  status: "in-progress" | "done" | "blocked" | "upcoming";
  goLiveDate: string;
  description: string;
  scope: string;
  complexity: "Low" | "Medium" | "High";
  progress: number;
  notes?: string;
}

interface ProjectCardProps {
  project: Project;
}

const getComplexityEmoji = (complexity: string): string => {
  switch (complexity) {
    case "Low":
      return "🟢";
    case "Medium":
      return "🟡";
    case "High":
      return "🔴";
    default:
      return "⚪";
  }
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className={styles["project-card"]}>
      <div className={styles["project-card__header"]}>
        <h3 className={styles["project-card__title"]}>{project.name}</h3>
        <StatusBadge status={project.status} />
      </div>

      <div className={styles["project-card__content"]}>
        <div className={styles["project-card__info-row"]}>
          <span>Scope:</span>
          <span>{project.scope}</span>
        </div>

        <div className={styles["project-card__info-row"]}>
          <span>Complexity:</span>
          <span>
            {getComplexityEmoji(project.complexity)} {project.complexity}
          </span>
        </div>

        <div className={styles["project-card__info-row"]}>
          <span>Go Live:</span>
          <span>{new Date(project.goLiveDate).toLocaleDateString()}</span>
        </div>

        <div className={styles["project-card__progress"]}>
          <div className={styles["project-card__info-row"]}>
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <div className={styles["project-card__progress-bar"]}>
            <div
              className={styles["project-card__progress-bar-fill"]}
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {project.notes && (
          <div className={styles["project-card__notes"]}>
            <p>{project.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
