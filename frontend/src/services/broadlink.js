import axios from 'axios';
import { BROADLINK_API_HOST } from '../constants/constants';

const headers = {
  Accept: 'application/json',
};

export const discoverDevices = async () => {
  const url = `${BROADLINK_API_HOST}/discover`;
  const options = { headers };
  const body = {};
  const response = await axios.post(`${url}`, body, options);
  return response.data;
};
