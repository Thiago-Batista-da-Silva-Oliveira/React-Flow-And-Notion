import { useRoutes } from 'react-router-dom';

import { protectedRoutes } from './protect'

export const AppRoutes = (): JSX.Element => {
  const isAuthenticated = true

  const routes = protectedRoutes

  const element = useRoutes([...routes]);

  return <>{element}</>;
};