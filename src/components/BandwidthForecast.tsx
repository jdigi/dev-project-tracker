import React from "react";
import styles from "../styles/components/bandwidth-forecast.module.scss";

interface Project {
  id: string;
  name: string;
  status: "in-progress" | "done" | "blocked" | "upcoming";
  complexity: "Low" | "Medium" | "High";
  // ... other project properties
}

interface BandwidthForecastProps {
  projects: Project[];
}

export const BandwidthForecast: React.FC<BandwidthForecastProps> = ({
  projects,
}) => {
  // Calculate complexity scores
  const complexityScores = {
    Low: 1,
    Medium: 2,
    High: 3,
  };

  // Calculate current load
  const calculateLoad = () => {
    // Only consider in-progress projects
    const activeProjects = projects.filter(
      (project) => project.status === "in-progress"
    );

    // Calculate complexity score
    const complexityScore = activeProjects.reduce((sum, project) => {
      return sum + complexityScores[project.complexity];
    }, 0);

    // Calculate project count impact
    // Each additional project adds diminishing returns to prevent score inflation
    const projectCountImpact = Math.log2(activeProjects.length + 1);

    // Combine scores (complexity score weighted 60%, project count weighted 40%)
    // Using log2 for project count to create diminishing returns
    const combinedScore = Math.ceil(
      (complexityScore * 0.6 + projectCountImpact * 0.4) * 2.5
    );

    // Calculate final load level (1-10 scale)
    const loadScore = Math.min(combinedScore, 10);

    // Determine load description
    let loadDescription = "Low";
    if (loadScore >= 8) {
      loadDescription = "High";
    } else if (loadScore >= 5) {
      loadDescription = "Moderate";
    }

    return {
      score: loadScore,
      description: loadDescription,
      activeCount: activeProjects.length,
      complexityBreakdown: {
        high: activeProjects.filter((p) => p.complexity === "High").length,
        medium: activeProjects.filter((p) => p.complexity === "Medium").length,
        low: activeProjects.filter((p) => p.complexity === "Low").length,
      },
    };
  };

  const { score, description, activeCount, complexityBreakdown } =
    calculateLoad();

  return (
    <div className={styles.bandwidth}>
      <div className={styles.bandwidth__header}>
        <span className={styles.bandwidth__icon}>🧠</span>
        <span className={styles.bandwidth__title}>Current Load</span>
      </div>
      <div className={styles.bandwidth__content}>
        <div className={styles.bandwidth__score}>{score}/10</div>
        <div className={styles.bandwidth__description}>
          {description} ({activeCount} active: {complexityBreakdown.high}H,{" "}
          {complexityBreakdown.medium}M, {complexityBreakdown.low}L)
        </div>
      </div>
    </div>
  );
};
