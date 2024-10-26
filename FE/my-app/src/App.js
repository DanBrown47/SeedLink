import Landing from './pages/Landing';
import React from 'react';
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import SearchResult from './pages/SearchResult';
import Donate from './pages/Donate';
import AdminLogin from './pages/AdminLogin';
import Login from './pages/Login';
import NewStartup from './pages/NewStartup';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route  path="/" element={<Landing />} />
        <Route  path="/search-result" element={<SearchResult />} />
        <Route  path="/admin/login" element={<AdminLogin />} />
        <Route  path="/login" element={<Login />} />
        <Route  path="/startup/:id" element={<Donate />} />
        <Route  path="/startup/create" element={<NewStartup />} />

        {/* <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} /> */}
      </Routes>
    </>
  );
}

export default App