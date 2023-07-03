import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import HomeScreen from './screens/HomeScreen';
// import RegisterScreen from './screens/RegisterScreen';
// import LoginScreen from './screens/LoginScreen';
// import BookingScreen from './screens/BookingScreen'
// import ProfileScreen from './screens/ProfileScreen';
// import AdminScreen from './screens/AdminScreen';

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TruckList from './components/TruckList';
import AddTruckForm from './components/AddTruckForm';
import EditTruckModal from './components/EditTruckModal';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import HomeScreen from './screens/HomeScreen';
import TruckScreen from './screens/TruckScreen';
import { login, logout, register } from './services/auth';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    // Example: You can use local storage or session storage to persist the login state
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const user = await login(email, password);
      setUser(user);
      // Persist the login state
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      // Clear the persisted login state
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleRegister = async (email, password) => {
    try {
      const user = await register(email, password);
      setUser(user);
      // Persist the login state
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Register error:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar user={user} onLogout={handleLogout} />
        <div className="container">
          <Routes>
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/trucks" component={TruckScreen} />
          </Routes>
          {user ? (
            <>
              <AddTruckForm />
              <TruckList />
              <EditTruckModal />
            </>
          ) : (
            <>
              <LoginForm onLogin={handleLogin} />
              <RegisterForm onRegister={handleRegister} />
            </>
          )}
        </div>
      </div>
    </Router>
  );
};

export default App;



// function App() {
//   return (
//     <div className="App">
//       {/* <Navbar /> */}
//       <>
//         <Router>
//           <Routes>
//             {/* <Route path='/admin' element={<AdminScreen />} />
//             <Route path='/' element={<HomeScreen />} />
//             <Route path='/book/:roomId/:fromDate/:toDate/' element={<BookingScreen />} />
//             <Route path='/register' element={<RegisterScreen />} />
//             <Route path='/login' element={<LoginScreen />} />
//             <Route path='/profile' element={<ProfileScreen />} /> */}
//           </Routes>
//         </Router>
//       </>
//     </div>
//   );
// }

// export default App;
