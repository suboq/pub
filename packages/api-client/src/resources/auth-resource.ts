import { BaseResource } from './base-resource';
import { JwtToken, User } from '../api-types';
import { Client } from '../client';

export class AuthResource extends BaseResource {
  public constructor(client: Client) {
    super(client);
  }

  public login(email: string, password: string) {
    return this.client.post<JwtToken>('/auth/login', {
      data: {
        email,
        password,
      },
    });
  }

  public register(user: User) {
    return this.client.post<JwtToken>('/auth/register', {
      data: user,
    });
  }
}
