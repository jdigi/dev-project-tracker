declare module "*/projects.json" {
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

  const projects: Project[];
  export default projects;
}
