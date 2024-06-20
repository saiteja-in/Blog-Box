import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path='/sign-in' element={<Signin/>}></Route>
      <Route path='/sign-up' element={<SignUp/>}></Route>
      <Route path='/About' element={<About/>}></Route>
      <Route path='/Dashboard' element={<Dashboard/>}></Route>
      <Route path='/Projects' element={<Projects/>}></Route>
    </Routes>
    </BrowserRouter>
  )
};

export default App;
