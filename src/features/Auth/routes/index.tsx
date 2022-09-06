import { Route, Routes } from 'react-router-dom';

import { Login } from './Login';

export const AuthRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
};
