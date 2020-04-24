import axios from 'axios';

let config = {
    
}

if (process.env.REACT_APP_DEPLOYMENT === 'production') {
    config.API = createAxiosInstance('http://api.thesophon.com');
    config.INSTANCE_SERVER_URL = 'http://students.thesophon.com'

}
else if (process.env.REACT_APP_DEPLOYMENT === 'staging') {
    config.API = createAxiosInstance('http://api.thesophon.com');
    config.INSTANCE_SERVER_URL = 'http://staging.students.thesophon.com'

}
else {
    config.API = createAxiosInstance('http://localhost:5902');
    config.INSTANCE_SERVER_URL = 'http://localhost:3001'
}

//==== Helper Functions ====//
function createAxiosInstance(baseURL) {
    const instance = axios.create({
        baseURL: baseURL
    });

    return instance;
}

export default config;