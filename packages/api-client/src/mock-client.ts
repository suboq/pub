import { Project } from './api-types';
import { ClientResponse } from './client';

export async function projects(): Promise<ClientResponse<Project[]>> {
  return {
    data: [],
  };
}

export default {
  projects,
};
