import { lazy } from "react";
import Loadable from "../../components/Loading/Loadable";

const MainLayout = Loadable(lazy(() => import('../../components/Layout/MainLayout')));

// Auths
const SignInPage = Loadable(lazy(() => import('../../screens/SignIn')));
const HomePage = Loadable(lazy(() => import('../../screens/Home')));
const ProfilePage = Loadable(lazy(() => import('../../screens/Profile')));
const StaffPage = Loadable(lazy(() => import('../../screens/Staff')));


const appRoutes = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'accounts', element: <ProfilePage /> },
            { path: 'staffs', element: <StaffPage /> },
        ],
    },
    {
        path: 'auths',
        children: [
            { path: 'sign-in', element: <SignInPage /> },
        ],
    }
];

export default appRoutes;