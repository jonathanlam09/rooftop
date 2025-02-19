import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { config } from './config';

global.config = config;

const rootDOM = document.getElementById('root');
if(rootDOM) {
    const root = ReactDOM.createRoot(rootDOM);
    root.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    );
}
