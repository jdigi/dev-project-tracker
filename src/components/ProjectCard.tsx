import React, { useState } from "react";
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
  today?: Date;
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

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  today = new Date(),
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const goLiveDate = new Date(project.goLiveDate);
  const daysUntilGoLive = Math.ceil(
    (goLiveDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  const isDueSoon =
    daysUntilGoLive <= 7 && daysUntilGoLive >= 0 && project.status !== "done";

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`${styles["project-card"]} ${
        isDueSoon ? styles["project-card--due-soon"] : ""
      }`}
      onClick={toggleExpand}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          toggleExpand();
        }
      }}
    >
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

        <div
          className={`${styles["project-card__expanded"]} ${
            isExpanded ? styles["project-card__expanded--visible"] : ""
          }`}
        >
          {project.description && (
            <div className={styles["project-card__section"]}>
              <h4 className={styles["project-card__section-title"]}>
                Description
              </h4>
              <p className={styles["project-card__section-content"]}>
                {project.description}
              </p>
            </div>
          )}

          {project.notes && (
            <div className={styles["project-card__section"]}>
              <h4 className={styles["project-card__section-title"]}>Notes</h4>
              <p className={styles["project-card__section-content"]}>
                {project.notes}
              </p>
            </div>
          )}
        </div>

        <div className={styles["project-card__expand-indicator"]}>
          {isExpanded ? "▼" : "▶"}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
