import React from 'react';
import {BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import './App.css';
import Form from './features/Form/Form';
import UserCard from './features/UserCard/UserCard';
import ProfilePic from './features/ProfilePic/ProfilePic';

function App() {
  return (
    <>
      <Router>
        <header>
          <h1>Image Finder</h1>
        </header>

        <div className="container">
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="*" element={<Form />} />
            <Route path="UserCard" element={<UserCard />} />
            <Route path="ProfilePic" element={<ProfilePic />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
