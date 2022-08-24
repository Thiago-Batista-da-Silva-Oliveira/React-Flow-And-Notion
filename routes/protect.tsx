import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Fallback } from '../components/Fallback';
import { FlowRoute } from '../features';

const App = () => {
  return (
    <>
      <Suspense fallback={<Fallback />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/flow/*', element: <FlowRoute /> },
      { path: '/', element: <Navigate to="./flow" /> },
      { path: '*', element: <Navigate to="./flow" /> },
    ],
  },
];