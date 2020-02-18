import { AxiosRequestConfig } from 'axios';

import { ApiClient } from './api-client';
import {
  JwtToken,
  Project,
  User,
  ProjectUser,
  UserValidation,
  ProjectType,
} from './api-types';

export type ClientError = {
  status: 400 | 401 | 403 | 404 | 500;
  message: string;
};

export type ClientResponseObject<T> =
  | { error?: never; data: T }
  | { error: ClientError; data?: never };

export type ClientResponse<T = undefined> = Promise<ClientResponseObject<T>>;

export type ClientOptions = {
  readonly baseUrl: string;
};

export type ClientFactoryOptions = Partial<ClientOptions> & {
  readonly useMock?: boolean;
};

export interface Client {
  get<T = undefined>(
    url: string,
    config?: AxiosRequestConfig,
  ): ClientResponse<T>;
  post<T = undefined>(
    url: string,
    config?: AxiosRequestConfig,
  ): ClientResponse<T>;
  put<T = undefined>(
    url: string,
    config?: AxiosRequestConfig,
  ): ClientResponse<T>;
  delete<T = undefined>(
    url: string,
    config?: AxiosRequestConfig,
  ): ClientResponse<T>;
  setToken(token: string): Client;
  auth: {
    login(email: string, password: string): ClientResponse<JwtToken>;
    register(user: User): ClientResponse<JwtToken>;
  };
  project: {
    getAll(): ClientResponse<Project[]>;
    get(id: string): ClientResponse<Project>;
    create(project: Project): ClientResponse;
  };
  projectUser: {
    create(projectUser: ProjectUser): ClientResponse<ProjectUser>;
    delete(id: string): ClientResponse;
  };
  user: {
    get(id: string): ClientResponse<User>;
    create(user: User): ClientResponse<User>;
  };
  util: {
    validateUsername(username: string): ClientResponse<UserValidation>;
    getProjectTypes(): ClientResponse<ProjectType[]>;
    sendFeedback(content: string): ClientResponse;
  };
}

export async function createClient(
  { useMock = false, ...options }: ClientFactoryOptions = { useMock: false },
): Promise<Client> {
  if (useMock || process.env.API_CLIENT_MOCK === 'true') {
    const { MockClient } = await import('./mock-client');

    return new MockClient();
  }

  return new ApiClient(options);
}
