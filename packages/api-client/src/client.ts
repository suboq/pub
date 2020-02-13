import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { ProjectResource } from './resources/project-resource';
import { AuthResource } from './resources/auth-resource';
import { ProjectUserResource } from './resources/project-user-resource';
import { UserResource } from './resources/user-resource';
import { UtilResource } from './resources/util-resource';

export type ServerResponse<T> = {
  ok: boolean;
  data: T;
};

export type ServerError = {
  status: 400 | 401 | 403 | 404 | 500;
  message: string;
};

export type ClientResponse<T> =
  | { error?: never; data: T }
  | { error: ServerError; data?: never };

export type ClientOptions = {
  baseUrl: string;
  useMock: boolean;
};

export class Client {
  public static DEFAULT_OPTIONS: ClientOptions = {
    baseUrl:
      process.env.API_BASE_URL || 'https://pub-api.azurewebsites.net/api',
    useMock: Boolean(process.env.MOCK_API_CLIENT),
  };

  private _token?: string;
  public http: AxiosInstance;

  public auth: AuthResource;
  public project: ProjectResource;
  public projectUser: ProjectUserResource;
  public user: UserResource;
  public util: UtilResource;

  public constructor(private options: Partial<ClientOptions> = {}) {
    this.options = { ...Client.DEFAULT_OPTIONS, ...options };
    this.http = this.createHttpClient();

    this.auth = new AuthResource(this);
    this.project = new ProjectResource(this);
    this.projectUser = new ProjectUserResource(this);
    this.user = new UserResource(this);
    this.util = new UtilResource(this);
  }

  public setToken(token: string): Client {
    this._token = token;
    this.http.defaults.headers.Authorization = `Bearer ${this._token}`;

    return this;
  }

  public get<T = {}>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ClientResponse<T>> {
    return this.makeRequest({
      ...config,
      method: 'GET',
      url,
    });
  }

  public post<T = {}>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ClientResponse<T>> {
    return this.makeRequest({
      ...config,
      method: 'POST',
      url,
    });
  }

  public put<T = {}>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ClientResponse<T>> {
    return this.makeRequest({
      ...config,
      method: 'PUT',
      url,
    });
  }

  public delete<T = {}>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ClientResponse<T>> {
    return this.makeRequest({
      ...config,
      method: 'DELETE',
      url,
    });
  }

  private createHttpClient() {
    const axiosInstance = Axios.create({
      baseURL: this.options.baseUrl,
    });

    return axiosInstance;
  }

  private async makeRequest<T>(
    config: AxiosRequestConfig,
  ): Promise<ClientResponse<T>> {
    let response: AxiosResponse<ServerResponse<T>>;

    try {
      response = await this.http.request({ ...config });

      if (!response.data.ok) {
        throw new Error('client/response-valid-but-ok-field-is-falsey');
      }
    } catch (error) {
      const { response } = error as AxiosError<ServerError>;

      if (response) {
        return { error: response.data };
      }

      throw error;
    }

    return { data: response.data.data };
  }
}
