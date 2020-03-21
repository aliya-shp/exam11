import axios from 'axios';
import {serverURL} from "./constants";

const axiosApi = axios.create({
    baseURL: serverURL
});

export default axiosApi;