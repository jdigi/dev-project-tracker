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
  const relevantProjects = projects.filter(
    (project) => project.status !== "done"
  );

  // Calculate the date range based on project dates
  const allDates = relevantProjects.flatMap((project) => {
    const dates = [];
    if (project.startDate) {
      dates.push(new Date(project.startDate));
    }
    dates.push(new Date(project.goLiveDate));
    return dates;
  });

  // Sort dates to ensure we get the correct min/max
  allDates.sort((a, b) => a.getTime() - b.getTime());

  const earliestDate = allDates[0];
  const latestDate = allDates[allDates.length - 1];

  // Add padding to the date range
  const startDate = new Date(earliestDate);
  startDate.setDate(startDate.getDate() - paddingDays);

  const endDate = new Date(latestDate);
  endDate.setDate(endDate.getDate() + paddingDays);

  // Calculate total days in the range
  const totalDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Generate array of dates for the timeline
  const dates = [];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Helper function to check if a date is today
  const isToday = (date: Date) => {
    // Convert both dates to EST
    const todayEST = new Date(
      today.toLocaleString("en-US", { timeZone: "America/New_York" })
    );
    const dateEST = new Date(
      date.toLocaleString("en-US", { timeZone: "America/New_York" })
    );

    // Compare just the date parts
    return (
      todayEST.getFullYear() === dateEST.getFullYear() &&
      todayEST.getMonth() === dateEST.getMonth() &&
      todayEST.getDate() === dateEST.getDate()
    );
  };

  return (
    <div
      className={styles.timeline}
      style={{ "--number-of-dates": dates.length } as React.CSSProperties}
    >
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

          // Calculate days from start of timeline
          const startDaysFromStart = Math.floor(
            (projectStartDate.getTime() - startDate.getTime()) /
              (1000 * 60 * 60 * 24)
          );

          // Calculate project duration in days
          const durationDays = Math.ceil(
            (goLiveDate.getTime() - projectStartDate.getTime()) /
              (1000 * 60 * 60 * 24)
          );

          // Calculate percentages based on total days in range
          const leftPercentage = (startDaysFromStart / totalDays) * 100;
          const widthPercentage = (durationDays / totalDays) * 100;

          return (
            <div key={project.id} className={styles.timeline__row}>
              {/* Temporarily commenting out project info
              <div className={styles.timeline__projectInfo}>
                <span className={styles.timeline__projectName}>
                  {project.name}
                </span>
                <span className={styles.timeline__projectDate}>
                  {projectStartDate.toLocaleDateString()} →{" "}
                  {goLiveDate.toLocaleDateString()}
                </span>
              </div>
              */}
              <div className={styles.timeline__projectBar}>
                <div
                  className={`${styles.timeline__project} ${
                    styles[`timeline__project--${project.status}`]
                  }`}
                  style={{
                    left: `${leftPercentage}%`,
                    width: `${widthPercentage}%`,
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
