# @pub/api-client

API client for Project Unicorn web application

## Instructions

Declare this package as a dependency of package by running `lerna add` :

```bash
pwd # must be in the <rootDir>
npm i -g lerna
lerna add @pub/api-client --scope=@pub/my-other-web-app
```

To use in another package:

```tsx
// filepath: <rootDir>/packages/my-other-web-app/src/app.tsx
import PubApi, { Project } from '@pub/api-client';

async function getProjects(): Promise<Project[]> {
  return PubApi.projects();
}
```
