import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from "./pages/TodoList";
import TodoCard from "./pages/TodoCard";
import React from "react";
import {APP_LINK} from "./constants/general";


function App() {

    return (
      <Router>
        <Routes>
            <Route path={'/'}  element={<TodoList />}>
            </Route>
            <Route path={`${APP_LINK.CARD}/:id`} element={<TodoCard />}>
            </Route>
        </Routes>
      </Router>
  );
}

export default App;
