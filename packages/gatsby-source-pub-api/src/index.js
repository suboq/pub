const { Client } = require('@pub/api-client');

const client = new Client();

async function fetch() {
  const projects = await client.project.getAll();

  if (projects.error) {
    return projects.error.message;
  }

  return projects.data;
}

fetch().then(console.log);
