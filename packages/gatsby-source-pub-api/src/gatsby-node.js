const { Client } = require('@pub/api-client');

exports.sourceNodes = async () => {
  const client = new Client();

  console.log(client.project.getAll());
};
