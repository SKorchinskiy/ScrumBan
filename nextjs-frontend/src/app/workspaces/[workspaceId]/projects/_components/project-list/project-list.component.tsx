import { WorkspaceProject } from "@/app/types/types";
import ProjectCard from "../project-card/project-card.component";
import styles from "./project-list.module.css";

export default function ProjectList({
  projectRemovalHandler,
  projects,
}: {
  projectRemovalHandler: Function;
  projects: WorkspaceProject[];
}) {
  return (
    <div className={styles["projects-list"]}>
      {projects.map((project) => (
        <ProjectCard
          key={project.project_id}
          project={project}
          projectRemovalHandler={projectRemovalHandler}
        />
      ))}
    </div>
  );
}
