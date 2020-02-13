const pubClient = require('@pub/api-client');

exports.sourceNodes = async () => {
  const projects = await pubClient.default.projects();

  if (projects.error) {
    return projects.error;
  }

  return projects.data;
};
