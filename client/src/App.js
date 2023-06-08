import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import BookingScreen from './screens/BookingScreen'
import ProfileScreen from './screens/ProfileScreen';



function App() {
  return (
    <div className="App">
      <Navbar />
      <>
        <Router>
          <Routes>
            <Route path='/' element={<HomeScreen/>} />
            <Route path='/book/:roomId/:fromDate/:toDate/' element={<BookingScreen/>} />
            <Route path='/register' element={<RegisterScreen/>} />
            <Route path='/login' element={<LoginScreen/>} />
            <Route path='/profile' element={<ProfileScreen/>} />
          </Routes>
        </Router>
      </>
    </div>
  );
}

export default App;
