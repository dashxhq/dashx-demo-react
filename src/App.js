import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Register from './pages/Register';
import LoginForm from './components/forms/LoginForm';

const App = () => {
  return (
    <div
      className="h-screen py-12 px-4 sm:px-6 lg:px-8 font-poppins"
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
