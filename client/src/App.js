import "./App.css";
import LoginPage from "./views/LoginPage";
import { Routes, Route } from "react-router-dom";
import WelcomePage from "./views/WelcomePage";

import NewClientPage from "./views/NewClientPage";
import NewOrganizationPage from "./views/NewOrganizationPage";
import MsgPopup from "./components/MsgPopup";
import EmployeeCreateAndEdit from "./views/EmployeeCreateAndEdit";
import CategoryPage from "./views/CategoryPage";
import OrganizationEditPage from "./views/OrganizationEditPage";
import EmailReactionPage from "./views/EmailReactionPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Header from "./components/Header";
import { useContext } from "react";
import { UserContext } from "./contexts/user";
import HomePage from "./views/HomePage";
import ClientResultPage from "./views/ClientResultPage";
import ClientEditPage from "./views/ClientEditPage";
import ReportPage from "./views/ReportPage";
import PasswordChangePage from "./views/PasswordChangePage";

function App() {
  const { user } = useContext(UserContext);
  return (
    <div className="App">
      {user && <Header />}
      <MsgPopup />

      <div className="container">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />

          <Route element={<ProtectedRoutes role="admin" />}>
            <Route path="/new-organization" element={<NewOrganizationPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/report-page" element={<ReportPage />} />
          </Route>

          {/* <Route element={<ProtectedRoutes role="intaker" />}> */}
          <Route path="/new-client" element={<NewClientPage />} />
          <Route
            path="/client-result-page/:clientNumber"
            element={<ClientResultPage />}
          />
          <Route
            path="/client-edit-page/:clientNumber"
            element={<ClientEditPage />}
          />
          {/* </Route> */}

          <Route element={<ProtectedRoutes role="coordinator" />}>
            <Route
              path="/client-result-page/:clientNumber"
              element={<ClientResultPage />}
            />
            <Route path="/new-client" element={<NewClientPage />} />
            <Route path="/new-employee" element={<EmployeeCreateAndEdit />} />
            <Route
              path="/organization-edit"
              element={<OrganizationEditPage />}
            />
          </Route>

          <Route
            path="/email-reply/coordinator/:coordinatorId/client/:clientId/:accept"
            element={<EmailReactionPage />}
          />
          <Route path="/password-change" element={<PasswordChangePage />} />
          {/* <Route path="/login" element={< />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
