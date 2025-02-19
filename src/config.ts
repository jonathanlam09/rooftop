import axios from 'axios';
import * as helper from './helper';

const apiHeader = { 'Content-Type': 'multipart/form-data' };

axios.defaults.baseURL = 'https://rooftop-energy-api.netlify.app/api';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = apiHeader['Content-Type'];

export const config = {
    properties: {
        baseURL: window.location.origin + '/',
        assetPath: 'https://rooftop-energy-api.netlify.app/',
        apiHeader: apiHeader,
    },
    methods: helper,
};

export default config;