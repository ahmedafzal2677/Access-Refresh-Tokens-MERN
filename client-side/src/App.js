import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import LoginPage  from './pages/LoginPage'
import DashboardPage  from './pages/DashboardPage'
import SignUpPage from './pages/SignUpPage';
import { Provider } from 'react-redux';
import store from './redux/store';
import RequireAuth from './components/auth/RequireAuth';

function App() {
  return (
      <Routes>
        <Route path='/'>
          <Route index element={
            <RequireAuth>
              <LoginPage/>
            </RequireAuth>
          } />
 

            <Route path='signup' element={<>
              <SignUpPage/>
              </>
            } />

            <Route path='login' element={<>
              <LoginPage/>
              </>
            } />
        <Route path='dashboard' element={
              // <RequireAuth>
                <DashboardPage/>
              // </RequireAuth>
            } />
        </Route>
      </Routes>
  );
}

export default App;
