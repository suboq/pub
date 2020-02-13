import { BaseResource } from './base-resource';
import { Project } from '../api-types';
import { Client } from '../client';

export class ProjectResource extends BaseResource {
  public constructor(client: Client) {
    super(client);
  }

  public getAll() {
    return this.client.get<Project[]>('/projects');
  }

  public get(id: string) {
    return this.client.get<Project>(`/projects/${id}`);
  }

  public create(project: Project) {
    return this.client.post('/projects', {
      data: project,
    });
  }

  public delete(id: string) {
    return this.client.delete(`/projects/${id}`);
  }
}
