import Axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

import {
  Project,
  User,
  JwtToken,
  SignUp,
  ProjectUser,
  Username,
  ProjectType,
} from './api-types';

/**
 * ServerError defines the object returned by the server when an error happens.
 */
export type ServerError = {
  status: 400 | 401 | 403 | 404 | 500;
  message: string;
};

/**
 * ClientResponse contains a field called `ok` with the value of `true` if the
 * request was successful. Otherwise, `ok` is `false`, and a `ServerError`
 * object is available in an `error` field.
 */
export type ClientResponse<T> =
  | { error?: never; data: T }
  | { error: ServerError; data?: never };

export type Client = {
  /** projects return a list of `Project` objects. */
  projects: () => Promise<ClientResponse<Project[]>>;
};

Axios.defaults.baseURL = process.env.API_CLIENT_ENDPOINT;

/**
 * makeRequest wraps an fetch call and returns an appropirate response object.
 */
async function makeRequest<T>(
  config: AxiosRequestConfig,
): Promise<ClientResponse<T>> {
  let response: AxiosResponse<T>;

  try {
    response = await Axios.request({ ...config });
  } catch (error) {
    const { response } = error as AxiosError<ServerError>;

    if (response) {
      return { error: response.data };
    }

    throw error;
  }

  return { data: response.data };
}

export async function login(email: string, password: string) {
  return makeRequest<JwtToken>({
    url: '/auth/login',
    method: 'POST',
    data: {
      email,
      password,
    },
  });
}

export async function register(signUpData: SignUp) {
  return makeRequest<JwtToken>({
    url: '/auth/register',
    method: 'POST',
    data: signUpData,
  });
}

export async function projects() {
  return makeRequest<Project[]>({
    url: '/projects',
  });
}

export async function createProject(projectData: Project) {
  return makeRequest<Project>({
    url: '/projects',
    method: 'POST',
    data: projectData,
  });
}

export async function project(id: string) {
  return makeRequest<Project>({
    url: `/projects/${id}`,
  });
}

export async function deleteProject(id: string) {
  return makeRequest({
    url: `/projects/${id}`,
    method: 'DELETE',
  });
}

export async function createProjectUser(projectUserData: ProjectUser) {
  return makeRequest<ProjectUser>({
    url: '/projectusers',
    method: 'POST',
    data: projectUserData,
  });
}

export async function deleteProjectUser(id: string) {
  return makeRequest({
    url: `/projectusers/${id}`,
    method: 'DELETE',
  });
}

export async function putUser(userData: User) {
  return makeRequest<User>({
    url: '/users',
    method: 'PUT',
    data: userData,
  });
}

export async function user(id: string) {
  return makeRequest<User>({
    url: `/user/${id}`,
  });
}

export async function validateUsername(username: Username) {
  return makeRequest({
    url: '/util',
    method: 'POST',
    data: username,
  });
}

export async function projectTypes() {
  return makeRequest<ProjectType>({
    url: '/util/projecttypes',
    method: 'GET',
  });
}

export async function sendFeedback(content: string) {
  return makeRequest({
    url: '/util/send-feedback',
    method: 'POST',
    data: content,
  });
}

export default {
  projects,
};
