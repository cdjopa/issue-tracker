'use server';
import axios, { AxiosError } from 'axios';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { resolveErrors } from '../api';

const CreateProjectSchema = z.object({
  name: z.string().min(3, { message: 'Project name must contain at least (3)characters' }),
  project_key: z
    .string()
    .min(2, { message: 'Project key must contain at least (2)characters' })
    .max(4, 'Project key must contain at most (4)characters'),
  summary: z.string().optional(),
  start_date: z.string().datetime().optional(),
  target_end_date: z.string().datetime().optional(),
});

type State = {
  errors?: {
    name?: string[] | undefined;
    project_key?: string[] | undefined;
    summary?: string[] | undefined;
    start_date?: string[] | undefined;
    target_end_date?: string[] | undefined;
  };
  message?: string | null;
};

export async function createProject(state: State, formData: FormData) {
  // Validate the form data
  const validateFields = await CreateProjectSchema.safeParseAsync({
    name: formData.get('name'),
    project_key: formData.get('project_key'),
    summary: formData.get('summary'),
    start_date: formData.get('start_date') ?? undefined,
    target_end_date: formData.get('target_end_date'),
  });

  // return error messages for components if invalid
  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: `There's a problem with some of your entries.`,
    };
  }

  const data = { ...validateFields.data, created_by: '73debf16-55cd-42f0-84e1-7df4ac71e076' };
  // make the request with validated data
  try {
    const endpoint = process.env.API_URL + '/projects';
    const res = await axios.post(endpoint, data).catch((error: AxiosError) => resolveErrors(error));
    if (!res) throw new Error('Server error');
    console.log(res.data);
  } catch (error) {
    console.error(error);
    throw new Error('Create Project Error');
  }
  redirect('/');
}
