import React from "react";
import { Layout } from "../components/Layout";
import { ProjectCard } from "../components/ProjectCard";
import { SummaryBar } from "../components/SummaryBar";
import { TimelineStrip } from "../components/TimelineStrip";
import { BandwidthForecast } from "../components/BandwidthForecast";
import projects from "../data/projects.json";
import styles from "../styles/pages/index.module.scss";

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

export default function Home() {
  const sortedProjects = (projects as Project[]).sort(
    (a: Project, b: Project) => {
      const dateA = new Date(a.goLiveDate);
      const dateB = new Date(b.goLiveDate);
      return dateA.getTime() - dateB.getTime();
    }
  );

  // Set today's date for testing, explicitly in EST
  const today = new Date("2025-05-22T12:02:00-04:00");

  return (
    <Layout>
      <div className={styles.container}>
        <BandwidthForecast projects={sortedProjects} />
        <SummaryBar projects={sortedProjects} />
        <TimelineStrip
          projects={sortedProjects}
          paddingDays={14} // 2 weeks padding
          today={today}
        />
        <div className={styles.grid}>
          {sortedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} today={today} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
