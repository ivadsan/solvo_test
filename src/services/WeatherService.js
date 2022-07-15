import { postRequest} from './axiosClient';

export const searchLocations = async (keyword) => {
  try {
    return await postRequest(
      `/v1/search.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${keyword}`
    );
  } catch (error) {
    console.error(error);
  }
};

export const getCurrentWeather = async (keyword) => {
  try {
    return await postRequest(
      `/v1/forecast.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${keyword}&aqi=no&alerts=yes`
    );
  } catch (error) {
    console.error(error);
  }
};

