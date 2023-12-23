'use client';
import { createProject } from '@/api/project/create-project-form';
import { TextInput, Textarea, SimpleGrid, Group, Title, Button } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useFormState } from 'react-dom';

export function CreateProjectForm() {
  const intialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createProject, intialState);
  return (
    <>
      <form
        action={dispatch}
        // onSubmit={(e) => {
        //   e.preventDefault();
        //   console.log('creatnig form data');
        //   createProject('form data');
        // }}
      >
        <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
          <TextInput
            label="Name"
            placeholder="Your projects name"
            name="name"
            variant="filled"
            error={state?.errors.name}
          />
          <TextInput
            label="Identifier"
            placeholder="Project Label"
            name="project_key"
            variant="filled"
            error={state?.errors.project_key}
          />
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
          <DateTimePicker
            name="start_date"
            label="Pick date and time"
            placeholder="Pick date and time"
            error={state?.errors.start_date}
          />
          <DateTimePicker
            name="target_end_date"
            label="Pick date and time"
            placeholder="Pick date and time"
            error={state?.errors.target_end_date}
          />
        </SimpleGrid>
        <Textarea
          mt="md"
          label="Summary"
          placeholder="Project summary"
          maxRows={10}
          minRows={5}
          autosize
          name="summary"
          variant="filled"
          error={state?.errors.summary}
        />
        <Group justify="center" mt="xl">
          <Button type="submit" size="md">
            Create Project
          </Button>
        </Group>
      </form>
    </>
  );
}
