import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { LoginForm } from '../components/LoginForm';

export const Login = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Layout>
      <LoginForm
        onSuccess={() => {
          setTimeout(() => {
            navigate('/home');
          }, 100);
        }}
      />
    </Layout>
  );
};
