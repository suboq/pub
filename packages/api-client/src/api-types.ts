export type Feedback = {
  content: string;
};

export type JwtToken = {
  token?: string;
};

export type Project = {
  communicationPlatform: string;
  communicationPlatformUrl: string;
  description: string;
  launchDate: Date;
  lookingForMembers: boolean;
  name: string;
  projectTechnologies: ProjectTechnology[];
  projectType: string;
  projectUsers: ProjectUser[];
  repositoryUrl: string;
  id?: string;
};

export type ProjectTechnology = {
  name: string;
  projectId: string;
};

export type ProjectType = {
  id: string;
  type: string;
};

export type ProjectUser = {
  isOwner: boolean;
  userId: string;
  id?: string;
  projectId?: string;
  username?: string;
};

export type SignIn = {
  email: string;
  password: string;
};

export type SignUp = {
  email: string;
  locale: string;
  password: string;
  passwordConfirmation: string;
  timezone: string;
  username: string;
};

export type User = {
  bio: string;
  profilePictureUrl: string;
  projects: Project[];
  technologies: string[];
  username: string;
  id?: string;
};

export type Username = {
  username: string;
};
