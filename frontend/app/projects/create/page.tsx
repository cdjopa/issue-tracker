import { CreateProjectForm } from '@/app/components/projects/create-project-form';
import { Title } from '@mantine/core';

export default function CreateProject() {
  // return <>Create Project</>;
  return (
    <main>
      <Title
        order={2}
        size="h1"
        style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)' }}
        fw={900}
        // ta="center"
      >
        Create Project
      </Title>
      <CreateProjectForm />
    </main>
  );
}
