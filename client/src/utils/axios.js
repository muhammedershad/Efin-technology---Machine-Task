import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5000/api/v1/admin/book',
    // timeout: 10000,
    withCredentials: true,
    headers: { "X-Custom-Header": "foobar" },
});

export default instance;