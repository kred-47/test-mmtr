import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Routes} from 'react-router'
import PageOfDashboards from "./pages/PageOfDashboards";
import PageOfCards from "./pages/PageOfCards";
import React from "react";
import {APP_LINK} from "./constants/general";


function App() {

    return (
      <Router>
        <Routes>
            <Route path={'/'}  element={<PageOfDashboards />}>
            </Route>
            <Route path={`${APP_LINK.CARD}/:id`} element={<PageOfCards />}>
            </Route>
        </Routes>
      </Router>
  );
}

export default App;
