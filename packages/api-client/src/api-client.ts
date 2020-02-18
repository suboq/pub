import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import { Client, ClientError, ClientOptions, ClientResponse } from './client';
import {
  ProjectResource,
  AuthResource,
  ProjectUserResource,
  UserResource,
  UtilResource,
} from './resources';

type ServerResponse<T> = {
  ok: boolean;
  data: T;
};

export class ApiClient implements Client {
  public static readonly DEFAULT_OPTIONS: ClientOptions = {
    baseUrl:
      process.env.API_CLIENT_BASE_URL ||
      'https://pub-api.azurewebsites.net/api',
  };

  private token?: string;
  public http: AxiosInstance;

  public auth: AuthResource;
  public project: ProjectResource;
  public projectUser: ProjectUserResource;
  public user: UserResource;
  public util: UtilResource;

  public constructor(private options: Partial<ClientOptions> = {}) {
    this.options = { ...ApiClient.DEFAULT_OPTIONS, ...options };
    this.http = this.createHttpClient();

    this.auth = new AuthResource(this);
    this.project = new ProjectResource(this);
    this.projectUser = new ProjectUserResource(this);
    this.user = new UserResource(this);
    this.util = new UtilResource(this);
  }

  public setToken(token: string): Client {
    this.token = token;
    this.http.defaults.headers.common.Authorization = `Bearer ${this.token}`;

    return this;
  }

  public get<T = undefined>(
    url: string,
    config?: AxiosRequestConfig,
  ): ClientResponse<T> {
    return this.makeRequest({ ...config, method: 'GET', url });
  }

  public post<T = undefined>(
    url: string,
    config?: AxiosRequestConfig,
  ): ClientResponse<T> {
    return this.makeRequest({ ...config, method: 'POST', url });
  }

  public put<T = undefined>(
    url: string,
    config?: AxiosRequestConfig,
  ): ClientResponse<T> {
    return this.makeRequest({ ...config, method: 'PUT', url });
  }

  public delete<T = undefined>(
    url: string,
    config?: AxiosRequestConfig,
  ): ClientResponse<T> {
    return this.makeRequest({ ...config, method: 'DELETE', url });
  }

  private createHttpClient() {
    const axiosInstance = Axios.create({
      baseURL: this.options.baseUrl,
    });

    return axiosInstance;
  }

  private async makeRequest<T>(config: AxiosRequestConfig): ClientResponse<T> {
    let response: AxiosResponse<ServerResponse<T>>;

    try {
      response = await this.http.request(config);

      if (!response.data.ok) {
        throw new Error('client/response-valid-but-ok-field-is-falsey');
      }
    } catch (error) {
      const { response } = error as AxiosError<ClientError>;

      if (response) {
        return { error: response.data };
      }

      throw error;
    }

    return { data: response.data.data };
  }
}
