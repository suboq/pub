const { Client } = require('@pub/api-client');

// TODO: Create project schema, pages, paginated projects list, etc.
exports.sourceNodes = async () => {
  const client = new Client();

  async function fetch() {
    const projects = await client.project.getAll();

    if (projects.error) {
      return projects.error.message;
    }

    return projects.data;
  }

  fetch()
    .then(console.log)
    .catch(console.error);
};
