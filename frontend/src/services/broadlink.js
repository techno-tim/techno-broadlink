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

export const learnCommand = async (ipAddress, commandName) => {
  const url = `${BROADLINK_API_HOST}/learn`;
  const options = { headers };
  const body = { ipAddress, commandName };
  const response = await axios.post(`${url}`, body, options);
  return response.data;
};

export const sendCommand = async (ipAddress, commandId) => {
  const url = `${BROADLINK_API_HOST}/command`;
  const options = { headers };
  const body = { ipAddress, commandId };
  const response = await axios.post(`${url}`, body, options);
  return response.data;
};

export const deleteCommand = async (ipAddress, commandId) => {
  const url = `${BROADLINK_API_HOST}/delete`;
  const options = { headers };
  const body = { ipAddress, commandId };
  const response = await axios.post(`${url}`, body, options);
  return response.data;
};
