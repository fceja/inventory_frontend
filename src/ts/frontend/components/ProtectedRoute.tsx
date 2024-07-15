import React from "react";
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { RootState } from '@store/ConfigureStore';
import { PAGE_PATHS } from "@common/Constants"

interface ProtectedRouteI {
    protectedComponent: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteI> = (props) => {
    const { protectedComponent } = props

    const isAuthd = useSelector((state: RootState) => state.authState.isAuthd);

    return (
        isAuthd ? protectedComponent : <Navigate to={PAGE_PATHS.LOGIN} />
    );
}

export default ProtectedRoute