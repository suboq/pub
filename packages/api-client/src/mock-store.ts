import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import fs from 'fs';
import path from 'path';

import { Project, ProjectType, ProjectUser, User } from './api-types';

type MockStoreOptions = {
  readonly filepath: string;
};

export type RootState = {
  projects: Project[];
  projectTypes: ProjectType[];
  projectUsers: ProjectUser[];
  token?: string;
  users: User[];
};

const defaultOptions: MockStoreOptions = {
  filepath: path.join(process.cwd(), 'api-mock-data.json'),
};

export function createMockStore(
  options: Partial<MockStoreOptions> = { ...defaultOptions },
) {
  if (!options.filepath) {
    throw new Error('api-client/mock store data filepath not set');
  }

  const file = fs.readFileSync(options.filepath, { encoding: 'utf-8' });
  const data = JSON.parse(file);
  const initialState: RootState = {
    projects: data.projects ?? [],
    projectTypes: data.projectTypes ?? [],
    projectUsers: data.projectUsers ?? [],
    token: data.token,
    users: data.users ?? [],
  };

  const { reducer, actions } = createSlice({
    name: 'root',
    initialState,
    reducers: {
      setProjects(state, action: PayloadAction<Project[]>) {
        state.projects = action.payload;
      },
      addProject(state, action: PayloadAction<Project>) {
        state.projects = [...state.projects, action.payload];
      },
      removeProject(state, action: PayloadAction<string>) {
        state.projects = state.projects.filter((v) => v.id === action.payload);
      },

      setProjectTypes(state, action: PayloadAction<ProjectType[]>) {
        state.projectTypes = action.payload;
      },
      addProjectType(state, action: PayloadAction<ProjectType>) {
        state.projectTypes = [...state.projectTypes, action.payload];
      },
      removeProjectType(state, action: PayloadAction<string>) {
        state.projectTypes = state.projectTypes.filter(
          (v) => v.id === action.payload,
        );
      },

      setProjectUsers(state, action: PayloadAction<ProjectUser[]>) {
        state.projectUsers = action.payload;
      },
      addProjectUser(state, action: PayloadAction<ProjectUser>) {
        state.projectUsers = [...state.projectUsers, action.payload];
      },
      removeProjectUser(state, action: PayloadAction<string>) {
        state.projectUsers = state.projectUsers.filter(
          (v) => v.id === action.payload,
        );
      },

      setToken(state, action: PayloadAction<string>) {
        state.token = action.payload;
      },
      clearToken(state) {
        state.token = undefined;
      },

      setUsers(state, action: PayloadAction<User[]>) {
        state.users = action.payload;
      },
      addUser(state, action: PayloadAction<User>) {
        state.users = [...state.users, action.payload];
      },
      removeUser(state, action: PayloadAction<string>) {
        state.users = state.users.filter((v) => v.id === action.payload);
      },
    },
  });

  const store = configureStore({ reducer });

  return {
    getProjects() {
      return store.getState().projects;
    },
    addProject(project: Project) {
      store.dispatch(actions.addProject(project));
    },
    getProjectById(id: string) {
      return store.getState().projects.find((v) => v.id === id);
    },

    getProjectTypes() {
      return store.getState().projectTypes;
    },

    deleteProjectUserById(id: string) {
      store.dispatch(actions.removeProjectUser(id));
    },
    getProjectUsers() {
      return store.getState().projectUsers;
    },
    getProjectUserById(id: string) {
      return store.getState().projectUsers.find((v) => v.id === id);
    },

    getToken() {
      return store.getState().token;
    },
    setToken(token: string) {
      store.dispatch(actions.setToken(token));
    },

    addUser(user: User) {
      store.dispatch(actions.addUser(user));
    },
    getUserById(id: string) {
      return store.getState().users.find((v) => v.id === id);
    },
    getUserByUsername(username: string) {
      return store.getState().users.find((v) => v.username === username);
    },
  };
}
