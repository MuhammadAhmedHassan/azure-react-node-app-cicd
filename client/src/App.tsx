import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Register, Home } from "./pages";
import { Navbar } from "./components";

function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<div>Loading</div>}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
