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

export class MockClient implements Client {
  public auth = {
    login(email: string, password: string): ClientResponse<JwtToken> {
      throw new Error('Method not implemented.');
    },
    register(user: User): ClientResponse<JwtToken> {
      throw new Error('Method not implemented.');
    },
  };

  public project = {
    getAll(): ClientResponse<Project[]> {
      throw new Error('Method not implemented.');
    },
    get(id: string): ClientResponse<Project> {
      throw new Error('Method not implemented.');
    },
    create(project: Project): ClientResponse<undefined> {
      throw new Error('Method not implemented.');
    },
  };
  public projectUser = {
    create(projectUser: ProjectUser): ClientResponse<ProjectUser> {
      throw new Error('Method not implemented.');
    },
    delete(id: string): ClientResponse<undefined> {
      throw new Error('Method not implemented.');
    },
  };
  public user = {
    get(id: string): ClientResponse<User> {
      throw new Error('Method not implemented.');
    },
    create(user: User): ClientResponse<User> {
      throw new Error('Method not implemented.');
    },
  };
  public util = {
    validateUsername(username: string): ClientResponse<UserValidation> {
      throw new Error('Method not implemented.');
    },
    getProjectType(): ClientResponse<ProjectType> {
      throw new Error('Method not implemented.');
    },
    sendFeedback(content: string): ClientResponse<undefined> {
      throw new Error('Method not implemented.');
    },
  };

  get<T>(url: string, config?: AxiosRequestConfig): ClientResponse<T> {
    throw new Error('Method not implemented.');
  }

  post<T>(url: string, config?: AxiosRequestConfig): ClientResponse<T> {
    throw new Error('Method not implemented.');
  }

  put<T>(url: string, config?: AxiosRequestConfig): ClientResponse<T> {
    throw new Error('Method not implemented.');
  }
  delete<T>(url: string, config?: AxiosRequestConfig): ClientResponse<T> {
    throw new Error('Method not implemented.');
  }
}
