import { Project, fetchUserProjects } from '@/api/project/fetch-projects';
import { ProjectCard } from './project-card';

export default async function ProjectsWrapper() {
  const projects = await fetchUserProjects();
  console.log(projects);
  return (
    <>
      {projects.length
        ? projects.map((project: Project) => <ProjectCard project={project} key={project.id} />)
        : 'No Projects...'}
    </>
  );
}
