import React from "react";
import { Layout } from "../components/Layout";
import { ProjectCard } from "../components/ProjectCard";
import { SummaryBar } from "../components/SummaryBar";
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

  return (
    <Layout>
      <div className={styles.container}>
        <SummaryBar projects={sortedProjects} />
        <div className={styles.grid}>
          {sortedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
