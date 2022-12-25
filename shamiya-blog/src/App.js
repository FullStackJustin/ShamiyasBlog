import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './pages/ProtectedRoute';
import BookReviews from './pages/BookReviews';
import Account from './pages/Account';
import AboutMe from './pages/AboutMe';


function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adminlogin" element={<AdminLogin/>} />
        <Route path="/bookreviews" element={<BookReviews/>} />
        <Route path="/about" element={<AboutMe/>} />
        <Route path="/account" element={<ProtectedRoute><Account/></ProtectedRoute>} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
