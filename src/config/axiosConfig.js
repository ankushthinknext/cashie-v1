import axios from "axios";

let http = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
});

export default http;
