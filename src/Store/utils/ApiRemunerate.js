import axios from 'axios';

const ApiRemunerate = axios.create({
    baseURL: 'http://localhost:4000/api/',
    headers: {
        'Content-type': 'application/json'
    }
})

const ApiRemunerateWithImage = axios.create({
    baseURL: 'http://localhost:4000/api/',
    headers: {
        'Content-type': 'multipart/form-data',
        'accept': 'application/json'
    }
});

// INTERCEPTORS
ApiRemunerate.interceptors.request.use(
    async(config) => {
        const data = await localStorage.getItem(('my_profile'));
        if (data) {
            const user = JSON.parse(data);
            config.headers['Authorization'] = `${user?.session_token}`;
        }
        return config;
    },
    async(error) => {
        console.log(error)
    }
);

ApiRemunerateWithImage.interceptors.request.use(
    async(config) => {
        const data = await localStorage.getItem(('my_profile'));
        if (data) {
            const user = JSON.parse(data);
            config.headers['Authorization'] = `${user?.session_token}`;
        }
        return config;
    },
    async(error) => {
        console.log(error)
    }
);

export { ApiRemunerate, ApiRemunerateWithImage }