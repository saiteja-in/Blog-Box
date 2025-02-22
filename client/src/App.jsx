import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Header from "./components/Header";
// import Footer from "./components/Footer";
import Footer from "./components/Footer"
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import { Hexagon, Github, Twitter,Mail,LinkedinIcon } from "lucide-react"
import ScrollToTop from "./components/ScrollToTop";
import SearchPage from "./components/SearchPage";

const App = () => {
  return (
    <>
    <BrowserRouter>
    <ScrollToTop/>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/sign-in' element={<Signin/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='*' element={<Home/>}/>

      <Route element={<PrivateRoute/>}>
      <Route path='/dashboard' element={<Dashboard/>}/>
      </Route>
      
      <Route element={<OnlyAdminPrivateRoute/>}>
      <Route path='/create-post' element={<CreatePost/>}/>
      </Route>

      <Route element={<OnlyAdminPrivateRoute/>}>
      <Route path='/update-post/:postId' element={<UpdatePost/>}/>
      </Route>

      <Route path='/projects' element={<Projects/>}/>    
      <Route path='/post/:postSlug' element={<PostPage/>}/>    
      <Route path='/search' element={<SearchPage/>}/>    
    </Routes>
    <Footer
        logo={<Hexagon className="h-10 w-10" />}
        brandName="Sai Teja"
        socialLinks={[
          {
            icon: <Twitter className="h-5 w-5" />,
            href: "https://x.com",
            label: "Twitter",
          },
          {
            icon: <Github className="h-5 w-5" />,
            href: "https://github.com/saiteja-in",
            label: "GitHub",
          },
          {
            icon: <Mail className="h-5 w-5" />,
            href: "mailto:vurukondasaiteja13@gmail.com",
            label: "Mail",
          },
          {
            icon: <LinkedinIcon className="h-5 w-5" />,
            href: "https://linkedin.com/in/vurukonda-sai-teja-279131201",
            label: "LinkedIn",
          },
        ]}
        mainLinks={[
          { href: "/products", label: "Products" },
          { href: "/about", label: "About" },
          { href: "/blog", label: "Blog" },
          { href: "/contact", label: "Contact" },
        ]}
        legalLinks={[
          { href: "/privacy", label: "Privacy" },
          { href: "/terms", label: "Terms" },
        ]}
        copyright={{
          text: "© 2024 Awesome Corp",
          license: "All rights reserved",
        }}
      />
    </BrowserRouter>
    </>
  )
};

export default App;
