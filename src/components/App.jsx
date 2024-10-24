
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Main';
import Register from './Register';
import ProtectedLayout from './ProtectedLayout';
import Login from './Login';
import Home from './Home';
import AddNote from './AddNote';
import ViewNotes from './ViewNotes';
import ViewNote from './ViewNote';
import EditNote from './EditNote';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/add-note" element={<AddNote/>}/>
          <Route path="/view-notes" element={<ViewNotes/>}/>
          <Route path="/view-note/:id" element={<ViewNote />} />
          <Route path="/edit-note/:id" element={<EditNote />} />


        </Route>
      </Routes>
    </div>
  );
}

export default App;
