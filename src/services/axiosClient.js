import axios from 'axios';
//import { getSession, signOut } from 'next-auth/react';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const ApiClient = () => {
  const defaultOptions = {
    baseURL,
    validateStatus: function (status) {
      return status < 500;
    },
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async (request) => {
    // const session = await getSession();
    // if (session) {
    //   request.headers.Authorization = `Bearer ${session.accessToken}`;
    // }

    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      if (response?.status === 401) {
        //signOut();
      }
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        //signOut();
      } else if (error.request) {
        //signOut();
      }
    }
  );

  return instance;
};

const axiosClient = ApiClient();

export function getRequest(URL) {
  return axiosClient.get(`${URL}`).then((response) => response);
}

export function postRequest(URL, payload) {
  return axiosClient.post(`${URL}`, payload).then((response) => response);
}

export function patchRequest(URL, payload) {
  return axiosClient.patch(`${URL}`, payload).then((response) => response);
}

export function deleteRequest(URL) {
  return axiosClient.delete(`${URL}`).then((response) => response);
}

export function putRequest(URL, payload) {
  return axiosClient.put(`${URL}`, payload).then((response) => response);
}
