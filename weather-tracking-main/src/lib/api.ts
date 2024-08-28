import axios from "axios";
// Next we make an 'instance' of it
const instance = axios.create({
  // .. where we make our configurations
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
});

export default instance