import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Fallback, Home } from '../components';
import { FlowRoute } from '../features';
import { NotionRoute } from '../features/Notion/routes';

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
      { path: '/home', element: <Home /> },
      { path: '/flow/*', element: <FlowRoute /> },
      { path: '/notion/*', element: <NotionRoute /> },
      { path: '/', element: <Navigate to="./home" /> },
      { path: '*', element: <Navigate to="./home" /> },
    ],
  },
];