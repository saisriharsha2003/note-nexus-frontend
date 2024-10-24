
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Main';
import Register from './Register';
import ProtectedLayout from './ProtectedLayout';
import Login from './Login';
import Home from './Home';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
