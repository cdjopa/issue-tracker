import { Suspense } from 'react';
import ProjectsWrapper from '../components/projects/projects';

export default async function ProjectsPage() {
  return (
    <main>
      <Suspense fallback={<>LOADING PROJECTS</>}>
        <ProjectsWrapper />
      </Suspense>
    </main>
  );
}
