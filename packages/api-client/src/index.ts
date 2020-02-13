import client, { Client } from './client';
import mockClient from './mock-client';

const exportedClient: Client =
  process.env.MOCK_API_CLIENT === 'true' ? mockClient : client;

export default exportedClient;
