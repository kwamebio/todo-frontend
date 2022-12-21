import logo from './logo.svg';
import './App.css';
import Login from "./pages/auth/Login";
import { HashRouter, Route, Navigate, Routes } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Todos from "./pages/todos/Todos";
import Guest from "./components/Guest";
import Protected from "./components/Protected";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/auth" element={<Guest />}>
          <Route index element={<Navigate to="/auth/sign-in" />} />
          <Route path="sign-in" element={<Login />} />
          <Route path="sign-up" element={<Signup />} />
        </Route>
        <Route element={<Protected />}>
          <Route path="/todos" element={<Todos />} />
        </Route>
        <Route path="/" element={<Navigate to="/auth/sign-in" />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
