import { useRoutes } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

import { protectedRoutes } from './protect'
import { publicRoutes } from './public';

export const AppRoutes = (): JSX.Element => {
  const { isAuthenticated } = useAuth();

  const routes = isAuthenticated ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes]);

  return <>{element}</>;
};