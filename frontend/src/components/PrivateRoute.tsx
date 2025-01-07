import { ROUTES } from "../routes.js";
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
    isAuthenticated: boolean,
    roles: Array<string>,
    userRole: string
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated, roles, userRole }) => {
    if (!isAuthenticated) {
        console.log("-------NOT AUTHENTICATED---------")
        return <Navigate to={ROUTES.LOGIN} replace />
    }
    if (roles && !roles.includes(userRole)) {
        return <Navigate to={ROUTES.ERROR_403} replace />;
    }

    return <Outlet/>;
}

export default PrivateRoute


