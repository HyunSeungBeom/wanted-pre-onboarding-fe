import React from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import SingUp from "./pages/Signup";
import Todo from "./pages/Todo";

const localToken = localStorage.getItem("token");
function ProtectedRoute({ redirectPath = "/", todoPath = "/todo" }) {
  if (!localToken) {
    return <Navigate to={redirectPath} replace />;
  }
  // if (localToken) {
  //   return <Navigate to={todoPath} replace />;
  // }

  return <Outlet />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<SingUp />} />
          <Route path="/todo" element={<Todo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
