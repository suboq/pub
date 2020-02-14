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
import React, { FC, useEffect, useState } from 'react';
import { Client, Project } from '@pub/api-client';

export const App: FC = () => {
  const client = new Client();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    client.project
      .getAll()
      .then(({ data }) => setProjects(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>All Projects</h2>

      <ul>
        {projects.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  );
};
```
