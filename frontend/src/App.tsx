import Errand from "./components/errand/Errand";
import "./App.css";
import "./style.css";
import { ROUTES } from "./routes.ts";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AdminLayout, AuthenticatedLayout } from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import { useState } from "react";
import AdminPanel from "./components/admin/AdminPanel.tsx";
import Login from "./components/login/Login.tsx";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const roles = ["user", "admin"];
    const userRole = "user";

    return (
        <Router>
            <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route
                    element={
                        <AuthenticatedLayout>
                            <PrivateRoute isAuthenticated={isAuthenticated} roles={roles} userRole={userRole}/>
                        </AuthenticatedLayout>
                    }
                >
                    <Route path={ROUTES.DASHBOARD} element={<Errand />} />
                    {/* <Route path={ROUTES.USER_PROFILE} element={<Profile />} /> */}
                </Route>
                <Route
                    element={
                        <AdminLayout>
                            <PrivateRoute
                                isAuthenticated={isAuthenticated}
                                roles={roles}
                                userRole={userRole}
                            />
                        </AdminLayout>
                    }
                >
                    <Route path={ROUTES.ADMIN_PANEL} element={<AdminPanel />} />
                </Route>
                {/* <Route path={ROUTES.ERROR_403} element={<Forbidden />} /> */}
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </Router>
        // <div className='main'>

        //   <Errand />
        // </div>
    );
}

export default App;
