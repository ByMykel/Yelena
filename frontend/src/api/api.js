import axios from "axios";

let instance = axios.create();

instance.interceptors.request.use((request) => {
    request.headers.common["Accept"] = "application/json";
    request.headers.common["Content-Type"] = "application/json";
    return request;
});

export default instance;
