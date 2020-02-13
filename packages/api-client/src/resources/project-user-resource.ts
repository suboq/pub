import { BaseResource } from './base-resource';
import { ProjectUser } from '../api-types';
import { Client } from '../client';

export class ProjectUserResource extends BaseResource {
  public constructor(client: Client) {
    super(client);
  }

  public create(projectUser: ProjectUser) {
    return this.client.post<ProjectUser>('/projectsusers', {
      data: projectUser,
    });
  }

  public delete(id: string) {
    return this.client.delete(`/projectusers/${id}`);
  }
}
