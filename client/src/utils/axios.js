import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_URL ,
    // timeout: 10000,
    withCredentials: true,
    headers: { "X-Custom-Header": "foobar" },
});

export default instance;