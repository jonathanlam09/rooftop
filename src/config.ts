import axios from 'axios';
import * as helper from './helper';

const apiHeader = { 'Content-Type': 'multipart/form-data' };

axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = apiHeader['Content-Type'];

export const config = {
    properties: {
        baseURL: window.location.origin + '/',
        assetPath: 'http://localhost:3000/',
        apiHeader: apiHeader,
    },
    methods: helper,
};

export default config;