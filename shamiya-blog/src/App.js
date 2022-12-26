import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './pages/ProtectedRoute';
import BookReviews from './pages/BookReviews';
import Account from './pages/Account';
import AboutMe from './pages/AboutMe';
import AdminHome from './pages/AdminHome';
import FilmReviews from './pages/FilmReviews';


function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adminlogin" element={<AdminLogin/>} />
        <Route path="/bookreviews" element={<BookReviews/>} />
        <Route path="/filmreviews" element={<FilmReviews/>} />
        <Route path="/about" element={<AboutMe/>} />
        <Route path="/account" element={<ProtectedRoute><Account/></ProtectedRoute>} />
        <Route path="/adminhome" element={<ProtectedRoute><AdminHome/></ProtectedRoute>} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
