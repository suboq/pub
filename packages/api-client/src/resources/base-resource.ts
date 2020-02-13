import { Client } from '../client';

export class BaseResource {
  protected client: Client;

  public constructor(client: Client) {
    this.client = client;
  }
}
