import React from "react";
import styles from "../styles/components/summary-bar.module.scss";

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

interface SummaryBarProps {
  projects: Project[];
}

export const SummaryBar: React.FC<SummaryBarProps> = ({ projects }) => {
  const stats = {
    total: projects.length,
    inProgress: projects.filter((p) => p.status === "in-progress").length,
    upcoming: projects.filter((p) => p.status === "upcoming").length,
    blocked: projects.filter((p) => p.status === "blocked").length,
    done: projects.filter((p) => p.status === "done").length,
  };

  const nextGoLive = projects
    .filter((p) => p.status === "upcoming" || p.status === "in-progress")
    .sort(
      (a, b) =>
        new Date(a.goLiveDate).getTime() - new Date(b.goLiveDate).getTime()
    )[0];

  return (
    <div className={styles.summary}>
      <div className={styles.summary__stats}>
        <div className={styles.summary__stat}>
          <span className={styles.summary__label}>Total Projects</span>
          <span className={styles.summary__value}>{stats.total}</span>
        </div>
        <div className={styles.summary__stat}>
          <span className={styles.summary__label}>In Progress</span>
          <span
            className={`${styles.summary__value} ${styles["summary__value--in-progress"]}`}
          >
            {stats.inProgress}
          </span>
        </div>
        <div className={styles.summary__stat}>
          <span className={styles.summary__label}>Upcoming</span>
          <span
            className={`${styles.summary__value} ${styles["summary__value--upcoming"]}`}
          >
            {stats.upcoming}
          </span>
        </div>
        <div className={styles.summary__stat}>
          <span className={styles.summary__label}>Blocked</span>
          <span
            className={`${styles.summary__value} ${styles["summary__value--blocked"]}`}
          >
            {stats.blocked}
          </span>
        </div>
        <div className={styles.summary__stat}>
          <span className={styles.summary__label}>Completed</span>
          <span
            className={`${styles.summary__value} ${styles["summary__value--done"]}`}
          >
            {stats.done}
          </span>
        </div>
      </div>

      {nextGoLive && (
        <div className={styles.summary__next}>
          <span className={styles.summary__label}>Next Go-Live</span>
          <div className={styles.summary__nextDetails}>
            <span className={styles.summary__projectName}>
              {nextGoLive.name}
            </span>
            <span className={styles.summary__date}>
              {new Date(nextGoLive.goLiveDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryBar;
