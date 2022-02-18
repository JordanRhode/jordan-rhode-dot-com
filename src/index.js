import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import ReactGa from 'react-ga';

import Home from './Home';
import LabelScanner from './LabelScanner';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactGa.initialize('UA-25662674-2');
ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/label-scanner" element={<LabelScanner/>} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
