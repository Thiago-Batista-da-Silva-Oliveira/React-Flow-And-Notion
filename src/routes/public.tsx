import { Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Fallback } from '../components';
import { AuthRoutes } from '../features/Auth/routes';



const App = () => {
  return (
    <>
      <Suspense fallback={<Fallback />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export const publicRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <AuthRoutes /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
