import axios from 'axios';
import { authHeader } from '../helpers/authHeader';

let config = {
    
}

if (process.env.REACT_APP_DEPLOYMENT === 'production') {
    // config.API = createAxiosInstance(config.API_URL);

}
else if (process.env.REACT_APP_DEPLOYMENT === 'staging') {
    // config.API = createAxiosInstance(config.API_URL);

}
else {
    config.API = createAxiosInstance('http://localhost:5902');
}

//==== Helper Functions ====//
function createAxiosInstance(baseURL) {
    const header = authHeader();
    const instance = axios.create({
        baseURL: baseURL, 
        timeout: 1000, 
        ...header && { headers: header }
    });

    return instance;
}

export default config;