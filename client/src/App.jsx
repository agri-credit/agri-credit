import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import ScrollToTop from "./components/ScrollToTop";
import About from "./pages/About";
import AgriHelp from "./pages/AgriHelp";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import TandC from "./pages/TandC";

export default function App() {
  const user = useSelector((state) => state.user.currentUser);
  //console.log(user)
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/sign-in"
          element={user ? <Navigate to="/dashboard" /> : <SignIn />}
        />
        <Route
          path="/sign-up"
          element={user ? <Navigate to="/dashboard" /> : <SignUp />}
        />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/agrihelp" element={<AgriHelp />} />
        </Route>
        {/* <Route path="/croplist" element={<CropList />} />
        <Route path="/fertilist" element={<FertiList />} />
        <Route path="/diseases" element={<Disease />} />
        <Route path="/pesticides" element={<Pesticides />} /> */}

        {/* <Route path="/croprecommender" element={<CropRecommender />} />
        <Route path="/cropprice" element={<CropPrice/>}/> */}

        <Route path="/t&c" element={<TandC />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
