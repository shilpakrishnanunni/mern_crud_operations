import "./layout.css";

export const LoginLayout = () => {
    console.log("LoginLayout")
    return (
        <div className="layout login-layout">
            <h1>LOGIN FORM</h1>
        </div>
    );
};

export const AuthenticatedLayout = () => {
    console.log("AuthenticatedLayout")
    return (
        <div className="layout auth-layout">
            <h1>YOU ARE LOGGED IN</h1>
        </div>
    );
};

export const AdminLayout = () => {
    console.log("AdminLayout")
    return (
        <div className="layout admin-layout">
            <h1>ADMIN PANEL</h1>
        </div>
    );
};
