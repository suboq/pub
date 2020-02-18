import { AxiosRequestConfig } from 'axios';

import {
  JwtToken,
  User,
  Project,
  ProjectUser,
  UserValidation,
  ProjectType,
} from './api-types';
import { Client, ClientResponse } from './client';
import { MockStore, createMockStore } from './mock-store';

export class MockClient implements Client {
  private token?: string;
  private store: MockStore;

  public constructor() {
    this.store = createMockStore();
  }

  public setToken(token: string): Client {
    this.token = token;

    return this;
  }

  public auth = {
    login: async (
      email: string,
      password: string,
    ): ClientResponse<JwtToken> => {
      if (email.trim() && password.trim()) {
        return { data: { token: '' } };
      }

      return { error: { message: 'Bad Request', status: 400 } };
    },
    register: async (user: User): ClientResponse<JwtToken> => {
      if (user.username.trim()) {
        return { data: { token: '' } };
      }

      return { error: { message: 'Bad Request', status: 400 } };
    },
  };

  public project = {
    getAll: async (): ClientResponse<Project[]> => ({
      data: this.store.get('projects'),
    }),
    get: async (id: string): ClientResponse<Project> => {
      const projects = this.store.get('projects');
      const project = projects.find((v) => v.id === id);

      if (project) {
        return { data: project };
      }

      return { error: { message: 'Not Found', status: 404 } };
    },
    create: async (project: Project): ClientResponse => {
      if (!this.hasToken()) {
        return { error: { message: 'Unauthorized', status: 401 } };
      }

      if (
        this.store
          .get('projects')
          .find(({ id }) => id && project.id && id === project.id)
      ) {
        return { error: { message: 'Bad Request', status: 400 } };
      }

      // this.store.add('projects', project);

      return { data: undefined };
    },
  };

  public projectUser = {
    create: async (projectUser: ProjectUser): ClientResponse<ProjectUser> => {
      if (
        this.store
          .get('projectUsers')
          .find(({ id }) => id && projectUser.id && id === projectUser.id)
      ) {
        return { error: { message: 'Bad Request', status: 400 } };
      }

      return { data: projectUser };
    },
    delete: async (id: string): ClientResponse => {
      if (!this.hasToken()) {
        return { error: { message: 'Unauthorized', status: 401 } };
      }

      if (!this.store.get('projects').find((v) => v.id === id)) {
        return { error: { message: 'Not Found', status: 404 } };
      }

      // this.store.delete('projects', id);

      return { data: undefined };
    },
  };

  public user = {
    get: async (id: string): ClientResponse<User> => {
      const user = this.store.get('users').find((v) => v.id === id);

      if (!user) {
        return { error: { message: 'Not Found', status: 404 } };
      }

      return { data: user };
    },
    create: async (user: User): ClientResponse<User> => {
      if (!this.hasToken()) {
        return { error: { message: 'Unauthorized', status: 401 } };
      }

      if (
        this.store
          .get('users')
          .find(({ id }) => id && user.id && id === user.id)
      ) {
        return { error: { message: 'Bad Request', status: 400 } };
      }

      // this.store.add('users', user);

      return { data: user };
    },
  };

  public util = {
    validateUsername: async (
      username: string,
    ): ClientResponse<UserValidation> => {
      const user = this.store.get('users').find((v) => v.username === username);

      if (user) {
        return { error: { message: 'Bad Request', status: 400 } };
      }

      return { data: { valid: true, reason: 'Username is available' } };
    },
    getProjectTypes: async (): ClientResponse<ProjectType[]> => {
      return { data: this.store.get('projectTypes') };
    },
    sendFeedback: async (content: string): ClientResponse => {
      return { data: undefined };
    },
  };

  public get<T>(url: string, config?: AxiosRequestConfig): ClientResponse<T> {
    throw new Error('Method not implemented.');
  }

  public post<T>(url: string, config?: AxiosRequestConfig): ClientResponse<T> {
    throw new Error('Method not implemented.');
  }

  public put<T>(url: string, config?: AxiosRequestConfig): ClientResponse<T> {
    throw new Error('Method not implemented.');
  }

  public delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): ClientResponse<T> {
    throw new Error('Method not implemented.');
  }

  private hasToken() {
    return Boolean(this.token);
  }
}
