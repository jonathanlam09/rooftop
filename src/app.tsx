import React from "react";
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as functions from './helper';
import { library } from '@fortawesome/fontawesome-svg-core'
import Session from './pages/session';
import Home from "./pages/home";

library.add(fab, fas, far)
window.helper = functions;

function App() {
	return ( 
        <BrowserRouter>
            <Routes>
                <Route element={<Session />}>
                    <Route path='' element={<Home />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
  	);
}
export default App;
