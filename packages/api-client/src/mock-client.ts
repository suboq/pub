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
import { createMockStore } from './mock-store';

export class MockClient implements Client {
  private store = createMockStore();

  public setToken(token: string): Client {
    this.store.setToken(token);

    return this;
  }

  public auth = {
    login: async (
      email: string,
      password: string,
    ): ClientResponse<JwtToken> => {
      if (email.trim() && password.trim()) {
        return { data: { token: this.store.getToken() } };
      }

      return { error: { message: 'Bad Request', status: 400 } };
    },
    register: async (user: User): ClientResponse<JwtToken> => {
      if (user.username.trim()) {
        return { data: { token: this.store.getToken() } };
      }

      return { error: { message: 'Bad Request', status: 400 } };
    },
  };

  public project = {
    getAll: async (): ClientResponse<Project[]> => ({
      data: this.store.getProjects(),
    }),
    get: async (id: string): ClientResponse<Project> => {
      const project = this.store.getProjectById(id);

      if (project) {
        return { data: project };
      }

      return { error: { message: 'Not Found', status: 404 } };
    },
    create: async (project: Project): ClientResponse => {
      if (!this.hasToken()) {
        return { error: { message: 'Unauthorized', status: 401 } };
      }

      if (project.id && this.store.getProjectById(project.id)) {
        return { error: { message: 'Bad Request', status: 400 } };
      }

      this.store.addProject(project);

      return { data: undefined };
    },
  };

  public projectUser = {
    create: async (projectUser: ProjectUser): ClientResponse<ProjectUser> => {
      if (projectUser.id && this.store.getProjectUserById(projectUser.id)) {
        return { error: { message: 'Bad Request', status: 400 } };
      }

      return { data: projectUser };
    },
    delete: async (id: string): ClientResponse => {
      if (!this.hasToken()) {
        return { error: { message: 'Unauthorized', status: 401 } };
      }

      if (!this.store.getProjectUserById(id)) {
        return { error: { message: 'Not Found', status: 404 } };
      }

      this.store.deleteProjectUserById(id);

      return { data: undefined };
    },
  };

  public user = {
    get: async (id: string): ClientResponse<User> => {
      const user = this.store.getUserById(id);

      if (!user) {
        return { error: { message: 'Not Found', status: 404 } };
      }

      return { data: user };
    },
    create: async (user: User): ClientResponse<User> => {
      if (!this.hasToken()) {
        return { error: { message: 'Unauthorized', status: 401 } };
      }

      if (user.id && this.store.getUserById(user.id)) {
        return { error: { message: 'Bad Request', status: 400 } };
      }

      this.store.addUser(user);

      return { data: user };
    },
  };

  public util = {
    validateUsername: async (
      username: string,
    ): ClientResponse<UserValidation> => {
      const user = this.store.getUserByUsername(username);

      if (user) {
        return { error: { message: 'Bad Request', status: 400 } };
      }

      return { data: { valid: true, reason: 'Username is available' } };
    },
    getProjectTypes: async (): ClientResponse<ProjectType[]> => {
      return { data: this.store.getProjectTypes() };
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
    return Boolean(this.store.getToken());
  }
}
