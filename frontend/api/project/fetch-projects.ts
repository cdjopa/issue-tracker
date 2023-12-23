'use server';
import axios, { AxiosError } from 'axios';
import { resolveErrors } from '../api';

export type Project = {
  name: string;
  id: string;
  project_key: string;
  summary: string;
  start_date: string;
  target_end_date: string;
  actual_end_date: string;
  created_on: string;
  created_by: string;
};

export async function fetchUserProjects(): Promise<Project[]> {
  const user_id = '73debf16-55cd-42f0-84e1-7df4ac71e076';

  try {
    const endpoint = encodeURI(process.env.API_URL + `/users/${user_id}/projects`);
    const res = await axios.get(endpoint).catch((error: AxiosError) => resolveErrors(error));
    if (!res) throw new Error('Server error');
    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error('Create Project Error');
  }
}
