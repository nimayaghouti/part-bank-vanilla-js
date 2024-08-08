// real base url
const BASE_URL = 'https://college.apipart.ir';

// base url for test with json server mock data
// const BASE_URL = 'http://localhost:3000';

let authToken = '';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

instance.interceptors.request.use(
  (config) => {
    config.headers = {
      'gateway-system': 'turboFront',
      'gateway-token': authToken,
    };
    config.maxBodyLength = Infinity;
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export const setToken = (token) => {
  authToken = token;
};

export default instance;
