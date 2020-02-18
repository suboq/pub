import fs from 'fs';
import path from 'path';

import { Project, ProjectType, ProjectUser, User } from './api-types';

type MockStoreOptions = {
  readonly filepath: string;
};

type MockData = {
  projects: Project[];
  projectTypes: ProjectType[];
  projectUsers: ProjectUser[];
  users: User[];
};

type MockDataKey = keyof MockData;

export class MockStore {
  private store: MockData;
  public static readonly DEFAULT_OPTIONS: MockStoreOptions = {
    filepath: path.join(process.cwd(), 'api-mock-data.json'),
  };

  public constructor(private options: Partial<MockStoreOptions> = {}) {
    this.options = { ...MockStore.DEFAULT_OPTIONS, ...options };
    this.store = this.createStore();
  }

  public get<T extends MockDataKey>(key: T) {
    return this.store[key];
  }

  private createStore(): MockData {
    if (!this.options.filepath) {
      throw new Error('api-client/mock store data filepath not set');
    }

    const file = fs.readFileSync(this.options.filepath, { encoding: 'utf-8' });
    const data = JSON.parse(file);

    return {
      projects: data.projects ?? [],
      projectTypes: data.projectTypes ?? [],
      projectUsers: data.projectUsers ?? [],
      users: data.users ?? [],
    };
  }
}

export function createMockStore(options: Partial<MockStoreOptions> = {}) {
  return new MockStore(options);
}
