import { BaseResource } from './base-resource';
import { User } from '../api-types';
import { Client } from '../client';

export class UserResource extends BaseResource {
  public constructor(client: Client) {
    super(client);
  }

  public get(id: string) {
    return this.client.get<User>(`/users/${id}`);
  }

  public create(user: User) {
    return this.client.put<User>('/users', {
      data: user,
    });
  }
}
