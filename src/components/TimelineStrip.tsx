import React from "react";
import styles from "../styles/components/timeline-strip.module.scss";

interface Project {
  id: string;
  name: string;
  status: "in-progress" | "done" | "blocked" | "upcoming";
  startDate?: string;
  goLiveDate: string;
  description: string;
  scope: string;
  complexity: "Low" | "Medium" | "High";
  progress: number;
  notes?: string;
}

interface TimelineStripProps {
  projects: Project[];
  paddingDays?: number; // Optional padding in days before and after projects
  today?: Date; // Optional today's date for testing
}

export const TimelineStrip: React.FC<TimelineStripProps> = ({
  projects,
  paddingDays = 14, // Default to 2 weeks padding
  today = new Date(), // Default to actual today
}) => {
  // Filter out upcoming projects
  // TODO: consider add ALL projects with WF timelines
  const relevantProjects = projects.filter(
    (project) => project.status !== "upcoming"
  );

  // Calculate the date range based on project dates
  const allDates = relevantProjects.flatMap((project) => [
    project.startDate
      ? new Date(project.startDate)
      : new Date(project.goLiveDate),
    new Date(project.goLiveDate),
  ]);

  const earliestDate = new Date(
    Math.min(...allDates.map((date) => date.getTime()))
  );
  const latestDate = new Date(
    Math.max(...allDates.map((date) => date.getTime()))
  );

  // Add padding to the date range
  const startDate = new Date(earliestDate);
  startDate.setDate(startDate.getDate() - paddingDays);

  const endDate = new Date(latestDate);
  endDate.setDate(endDate.getDate() + paddingDays);

  // Generate array of dates for the timeline
  const dates = [];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Helper function to check if a date is today
  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className={styles.timeline}>
      <div className={styles.timeline__header}>
        {dates.map((date, index) => (
          <div
            key={index}
            className={`${styles.timeline__date} ${
              isToday(date) ? styles["timeline__date--today"] : ""
            }`}
          >
            {date.getDate()}
            {index === 0 && (
              <div className={styles.timeline__month}>
                {date.toLocaleString("default", { month: "short" })}
              </div>
            )}
            {date.getDate() === 1 && index !== 0 && (
              <div className={styles.timeline__month}>
                {date.toLocaleString("default", { month: "short" })}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={styles.timeline__rows}>
        {relevantProjects.map((project) => {
          const projectStartDate = project.startDate
            ? new Date(project.startDate)
            : new Date(project.goLiveDate);
          const goLiveDate = new Date(project.goLiveDate);

          const startDaysFromStart = Math.floor(
            (projectStartDate.getTime() - startDate.getTime()) /
              (1000 * 60 * 60 * 24)
          );

          const durationDays = Math.ceil(
            (goLiveDate.getTime() - projectStartDate.getTime()) /
              (1000 * 60 * 60 * 24)
          );

          return (
            <div key={project.id} className={styles.timeline__row}>
              <div className={styles.timeline__projectInfo}>
                <span className={styles.timeline__projectName}>
                  {project.name}
                </span>
                <span className={styles.timeline__projectDate}>
                  {projectStartDate.toLocaleDateString()} →{" "}
                  {goLiveDate.toLocaleDateString()}
                </span>
              </div>
              <div className={styles.timeline__projectBar}>
                <div
                  className={`${styles.timeline__project} ${
                    styles[`timeline__project--${project.status}`]
                  }`}
                  style={{
                    left: `${(startDaysFromStart / dates.length) * 100}%`,
                    width: `${(durationDays / dates.length) * 100}%`,
                  }}
                  title={`${
                    project.name
                  } - ${projectStartDate.toLocaleDateString()} to ${goLiveDate.toLocaleDateString()}`}
                >
                  {project.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineStrip;
