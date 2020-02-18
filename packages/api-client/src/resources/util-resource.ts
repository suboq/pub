import { BaseResource } from './base-resource';
import { UserValidation, ProjectType } from '../api-types';
import { Client } from '../client';

export class UtilResource extends BaseResource {
  public constructor(client: Client) {
    super(client);
  }

  public validateUsername(username: string) {
    return this.client.post<UserValidation>('/util', {
      data: {
        username,
      },
    });
  }

  public getProjectTypes() {
    return this.client.get<ProjectType[]>('util/projecttypes');
  }

  public sendFeedback(content: string) {
    return this.client.post('/util/send-feedback', {
      data: {
        content,
      },
    });
  }
}
