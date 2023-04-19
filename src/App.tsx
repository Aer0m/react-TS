import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Employees from './Employees';
import UserCard from './Card';
import User from './User';

function App(){
  return (
      <>
        <header style={{ textAlign: 'center' }}>
          <Link to="/about">Список работников</Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/user/0">Профиль</Link>
        </header>
        <Routes>
          <Route path="/about" element={<Employees />} />
          <Route path="/user/:userId" element={<User />} />
        </Routes>
      </>
  );
}

export default App;
