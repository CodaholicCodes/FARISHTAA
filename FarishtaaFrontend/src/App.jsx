import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./nav/NavBar";
import HomePage from "./components/HomePage";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import AISymptomsChecker from "./components/patient/AISymptomsChecker";
import Categories from "./components/doctor/categories";
import DoctorByCategory from "./components/doctor/DoctorByCategory";
import DoctorProfile from "./components/doctor/DoctorProfile";
import { useEffect } from "react";

function App() {

      
  return (
    <BrowserRouter>
      <div>
   
       <NavBar />

        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/symptoms/:userId" element={<AISymptomsChecker />} />
            <Route path="/categories" element={<Categories />}/>
            <Route path="/nearby-search/:category" element={<DoctorByCategory />}/>
            <Route path="/doctor/:doctorId" element={<DoctorProfile />}/>
            
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
