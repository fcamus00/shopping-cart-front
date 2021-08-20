import axios from 'axios';
import config from './config';

const client = () => {
  return axios.create({
    baseURL: config().scUrl,
    timeout: 60000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': config().domain,
    },
  });
};

export default client;
