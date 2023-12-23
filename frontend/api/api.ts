import axios, { Axios, AxiosError } from 'axios';

// export async function apiFetch<T>(handler: typeof axios., route: string, data: T) {

//   try {
//   } catch (error) {
//     console.error(`Fetch error on route: ${route}`);
//     throw new Error('Api error');
//   }
// }

export function resolveErrors(error: AxiosError) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    // console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser
    // and an instance of http.ClientRequest in node.js
    console.error('Failed to get server response');
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Requet Setup Error:', error);
  }
}
