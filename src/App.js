import { Route, Routes, Navigate } from "react-router-dom";
import EditUserPage from "./Pages/EditUserPage/EditUserPage";
import UsersPage from "./Pages/UsersPage/UsersPage";

function App() {
  return (
    <Routes className="rout-section">
      <Route path="/" element={<Navigate to="/users" />} />
      <Route path="users/:id/edit" element={<EditUserPage />} />
      <Route path="users" element={<UsersPage />} />
    </Routes>
  );
}

export default App;
